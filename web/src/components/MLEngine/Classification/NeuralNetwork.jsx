import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import Select from "react-select";

export default class ClassificationNeuralNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      mapping: this.props.mapping,
      data: [],
      res: [],
      inputs: undefined,
      classes: undefined,
    };
  }

  setOutputChange = (e) => {
    // link the form value to the dataset value to cplot in the datagrid
    let value = e.value;
    this.setState({ classes: value }, () => {
      if (this.state.inputs !== undefined) {
        this.getData();
      }
    });
  };

  setInputChange = (e) => {
    // link the form value to the dataset value to cplot in the datagrid
    if (e == null) {
      this.setState({ Y: undefined });
    } else {
      let values = e;
      var res = [];
      for (const item of values) {
        res.push(item.value);
      }
      this.setState({ inputs: res }, () => {
        if (this.state.classes !== undefined) {
          this.getData();
        }
      });
    }
  };

  getData = () => {
    axios
      .get(
        `http://localhost:8000/api/mlengine/train?tool=classification_nn&inputs=${this.state.inputs}&classes=${this.state.classes}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Form>
          <Row>
            <Col>
              <FormGroup>
                <Label for="dataset">Select the inputs variables</Label>
                <Select
                  name="inputs"
                  isMulti
                  options={this.state.mapping}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.setInputChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="dataset">Select the classes column</Label>
                <Select
                  name="Output"
                  options={this.state.mapping}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.setOutputChange}
                />
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}
