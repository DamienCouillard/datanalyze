import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, FormGroup } from "reactstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import Select from "react-select";
import "../style/css/base.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Engine from "../components/MLEngine/Engine";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress && (
      <div className="loader-div">
        <div className="loader">
          <Loader type="ThreeDots" color="#264653" height="100" width="100" />
        </div>
      </div>
    )
  );
};

const groupedOptions = [
  {
    label: "Classification",
    options: [{ value: "classification_nn", label: "Neural Network" }],
  },
];

class MLEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: undefined,
      datasetsList: [],
      modelsList: [],
      activeModel: undefined,
      mapping: [],
    };
  }

  handleChange = (e) => {
    // link the form value to the dataset value to cplot in the datagrid
    let { value } = e.target;
    this.setState({
      activeItem: value,
    });
  };

  refreshList = () => {
    // refresh the list of all existing datasets by calling the GET dataset endpoint (may be redundant)
    axios
      .get("http://localhost:8000/api/datasets/")
      .then((res) => this.chooseDataset(res))
      .catch((err) => console.log(err));
  };

  getMapping = () => {
    axios
      .get(`http://localhost:8000/api/analyze?index=${this.state.activeItem}`)
      .then((res) => {
        this.setState({
          mapping: res.data["mapping"],
        });
      })
      .catch((err) => console.log(err));
  };

  setDataset = (e) => {
    // link the form value to the dataset value to cplot in the datagrid
    let value = e.value;
    this.setState({ activeItem: value }, () => {
      this.getMapping();
    });
  };

  setModel = (e) => {
    // link the form value to the dataset value to cplot in the datagrid
    let value = e.value;
    this.setState({ activeModel: value });
  };

  componentDidMount() {
    // this function is called when the dataset page is loaded
    this.refreshList();
  }

  callEngine = () => {
    if (this.state.activeItem && this.state.activeModel) {
      return (
        <Engine
          activeItem={this.state.activeItem}
          activeModel={this.state.activeModel}
          mapping={this.state.mapping}
        />
      );
    }
  };

  chooseDataset = (res) => {
    var dataList = [];
    for (const item of res.data) {
      dataList.push({ value: item.index, label: item.label });
    }
    this.setState({ datasetsList: dataList });
  };

  setActiveModel = () => {};

  render() {
    return (
      <>
        <Container fluid className="p-0">
          <Row>
            <Col xs={2} id="sidebar-wrapper">
              <Sidebar />
            </Col>
            <Col xs={10} id="page-content-wrapper">
              <h2 className="page-title">Machine Learning Engine</h2>
              <Form>
                <FormGroup>
                  <Select
                    label="Select a dataset"
                    options={this.state.datasetsList}
                    onChange={this.setDataset}
                  />
                </FormGroup>
                <FormGroup>
                  <Select
                    label="Select a model"
                    options={groupedOptions}
                    onChange={this.setModel}
                  />
                </FormGroup>
              </Form>
              {this.callEngine()}
            </Col>
          </Row>
        </Container>
        <LoadingIndicator />
      </>
    );
  }
}

export default MLEngine;
