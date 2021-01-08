import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import Sidebar from "../components/Sidebar/Sidebar";
import "../style/css/base.css";
import "bootstrap/dist/css/bootstrap.min.css";

class MLEngine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      datasetsList: [],
      modelsList: [],
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
      .then((res) =>
        this.setState({
          datasetsList: res.data,
        })
      )
      .catch((err) => console.log(err));
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
              <Row>
                <Button className="ml-select">Create a new model</Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default MLEngine;
