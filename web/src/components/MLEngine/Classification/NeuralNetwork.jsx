import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import Select from "react-select";
import { trackPromise } from "react-promise-tracker";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";
export default class ClassificationNeuralNetwork extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      mapping: this.props.mapping,
      inputs: undefined,
      classes: undefined,
      floss: undefined,
      facc: undefined,
      loss: undefined,
      acc: undefined,
    };
  }

  setOutputChange = (e) => {
    // link the form value to the dataset value to plot
    let value = e.value;
    this.setState({ classes: value }, () => {
      if (this.state.inputs !== undefined) {
        this.getData();
      }
    });
  };

  setInputChange = (e) => {
    // link the form value to the dataset value to plot
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
    trackPromise(
      axios
        .get(
          `http://localhost:8000/api/mlengine/train?tool=classification_nn&inputs=${this.state.inputs}&classes=${this.state.classes}`
        )
        .then((res) => {
          this.setState({
            loss: res.data["loss"],
            acc: res.data["acc"],
            floss: res.data["results"][0],
            facc: res.data["results"][1],
          });
        })
        .catch((err) => console.log(err))
    );
  };

  plotResults = () => {
    if (this.state.floss !== undefined) {
      return (
        <div>
          <div>
            <div>The final loss is {Number(this.state.floss.toFixed(2))}</div>
            <div>
              The final accuracy is {Number(this.state.facc.toFixed(2))}
            </div>
          </div>
          <br />
          <Row>
            <Col>
              <div>Training and test loss by epoch</div>
              <LineChart
                width={600}
                height={400}
                data={this.state.loss}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="train"
                  stroke="#264653"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="test"
                  stroke="#E76F51"
                  dot={false}
                />
              </LineChart>
            </Col>
            <Col>
              <div>Training and test accuracy by epoch</div>
              <LineChart
                width={600}
                height={400}
                data={this.state.acc}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="train"
                  stroke="#264653"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="test"
                  stroke="#E76F51"
                  dot={false}
                />
              </LineChart>
            </Col>
          </Row>
        </div>
      );
    }
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
        <Row>{this.plotResults()}</Row>
      </Container>
    );
  }
}
