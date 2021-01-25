import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import "../style/css/base.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Plot from "../components/Plot/Plot";
import { usePromiseTracker } from "react-promise-tracker";
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
class Analyze extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      activeTool: "",
      datasetsList: [],
      analysisTools: [],
      mapping: [],
    };
  }

  handleDatasetChange = (e) => {
    // link the form value to the dataset value to cplot in the datagrid
    let { value } = e.target;
    this.setState({ activeItem: value }, () => {
      this.getMapping();
    });
  };

  handleToolChange = (e) => {
    // link the form value to the dataset value to cplot in the datagrid
    let { value } = e.target;
    this.setState({ activeTool: value });
  };

  refreshList = () => {
    // refresh the list of all existing datasets by calling the GET dataset endpoint (may be redundant)

    axios
      .get("http://localhost:8000/api/datasets/")
      .then((res) => this.setState({ datasetsList: res.data }))
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8000/api/tools/")
      .then((res) => this.setState({ analysisTools: res.data }))
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // this function is called when the dataset page is loaded
    this.refreshList();
  }

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

  chooseDataset = () => {
    // map the list of datasets in the form
    const newItems = this.state.datasetsList;
    return newItems.map((item) => {
      return (
        <option key={item.index} value={item.index}>
          {item.label}
        </option>
      );
    });
  };

  chooseTool = () => {
    // map the list of tools in the form
    const newItems = this.state.analysisTools;
    return newItems.map((item) => {
      return (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      );
    });
  };

  callPlot = () => {
    if (this.state.activeItem && this.state.activeTool) {
      return (
        <Plot
          activeItem={this.state.activeItem}
          activeTool={this.state.activeTool}
          mapping={this.state.mapping}
        />
      );
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
              <h2 className="page-title">Data Analysis</h2>
              <Form>
                <FormGroup>
                  <Label for="dataset">Select a dataset</Label>
                  <Input
                    type="select"
                    name="dataset"
                    onChange={this.handleDatasetChange}
                    placeholder="Enter dataset"
                  >
                    <option></option>
                    {this.chooseDataset()}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="dataset">Select an analysis tool</Label>
                  <Input
                    type="select"
                    name="tool"
                    onChange={this.handleToolChange}
                    placeholder="Enter tool"
                  >
                    <option></option>
                    {this.chooseTool()}
                  </Input>
                </FormGroup>
              </Form>
              {this.callPlot()}
            </Col>
          </Row>
        </Container>
        <LoadingIndicator />
      </>
    );
  }
}

export default Analyze;
