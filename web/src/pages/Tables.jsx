import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import "../style/css/base.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Datagrid from "../components/Datagrid/Datagrid";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const LoadingIndicator = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  console.log(promiseInProgress);
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
class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      datasetsList: [],
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
    trackPromise(
      axios
        .get("http://localhost:8000/api/datasets/")
        .then((res) =>
          this.setState({
            datasetsList: res.data,
          })
        )
        .catch((err) => console.log(err))
    );
  };

  componentDidMount() {
    // this function is called when the dataset page is loaded
    this.refreshList();
  }

  chooseDataset = () => {
    // map the list of datasets in the form
    const newItems = this.state.datasetsList;
    return newItems.map((item) => {
      return <option value={item.index}>{item.label}</option>;
    });
  };

  plotDatagrid = () => {
    if (this.state.activeItem !== "") {
      return <Datagrid activeItem={this.state.activeItem} />;
    }
  };

  render() {
    return (
      <>
        <Container fluid className="p-0">
          <Row>
            <Col xs={2} id="sidebar-wrapper">
              <Sidebar />
            </Col>
            <Col xs={10} id="page-content-wrapper">
              <h2 className="page-title">Dataset Explorer</h2>
              <Form>
                <FormGroup>
                  <Label for="dataset">Select a dataset</Label>
                  <Input
                    type="select"
                    name="source_type"
                    value={this.state.activeItem}
                    onChange={this.handleChange}
                    placeholder="Enter dataset source type"
                  >
                    <option></option>
                    {this.chooseDataset()}
                  </Input>
                </FormGroup>
              </Form>
              {this.plotDatagrid()}
            </Col>
          </Row>
        </Container>
        <LoadingIndicator />
      </>
    );
  }
}

export default Tables;
