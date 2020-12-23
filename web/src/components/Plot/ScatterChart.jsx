import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Select from "react-select";

export default class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      mapping: this.props.mapping,
      data: [],
      X: undefined,
      Y: undefined,
    };
  }

  chooseAxis = () => {
    // map the list of tools in the form
    const newItems = this.state.mapping;
    return newItems.map((item) => {
      return <option>{item}</option>;
    });
  };

  setXChange = (e) => {
    // link the form value to the dataset value to cplot in the datagrid
    let value = e.value;
    this.setState({ X: value }, () => {
      if (this.state.Y !== undefined) {
        this.getData();
      }
    });
  };

  setYChange = (e) => {
    // link the form value to the dataset value to cplot in the datagrid
    let value = e.value;
    this.setState({ Y: value }, () => {
      if (this.state.X !== undefined) {
        this.getData();
      }
    });
    console.log(this.state.X, this.state.Y);
  };

  getData = () => {
    axios
      .get(
        `http://localhost:8000/api/analyze/tools?tool=scatter&X=${this.state.X}&Y=${this.state.Y}`
      )
      .then((res) => {
        this.setState({
          data: res.data["data"],
        });
      })
      .catch((err) => console.log(err));
  };

  plotLine = () => {
    if (this.state.X !== undefined && this.state.Y !== undefined) {
      return (
        <ResponsiveContainer width="75%" aspect={2} className="chart">
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey={this.state.X} name={this.state.X} />
            <YAxis type="number" dataKey={this.state.Y} name={this.state.Y} />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter
              name={this.state.Y}
              data={this.state.data}
              fill="#8884d8"
            />
            <Legend />
          </ScatterChart>
        </ResponsiveContainer>
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
                <Label for="dataset">Select the X axis</Label>
                <Select
                  name="XAxis"
                  options={this.state.mapping}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.setXChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="dataset">Select the Y axis</Label>
                <Select
                  name="YAxis"
                  options={this.state.mapping}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.setYChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>{this.plotLine()}</Row>
        </Form>
      </Container>
    );
  }
}
