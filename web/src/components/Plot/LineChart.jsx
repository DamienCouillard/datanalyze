import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
} from "recharts";

export default class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      mapping: this.props.mapping,
      data: [],
      X: "",
      Y: "",
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
    let { value } = e.target;
    this.setState({ X: value }, () => {
      if (this.state.Y !== "") {
        this.getData();
      }
    });
  };

  setYChange = (e) => {
    // link the form value to the dataset value to cplot in the datagrid
    let { value } = e.target;
    this.setState({ Y: value }, () => {
      if (this.state.X !== "") {
        this.getData();
      }
    });
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
    if (this.state.data !== []) {
      console.log(this.state.data);
      return (
        <ResponsiveContainer width="75%" aspect={2}>
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
              name="Scatter plot"
              data={this.state.data}
              fill="#8884d8"
            />
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
                <Input type="select" name="xAxis" onChange={this.setXChange}>
                  <option></option>
                  {this.chooseAxis()}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="dataset">Select the Y axis</Label>
                <Input type="select" name="yAxis" onChange={this.setYChange}>
                  <option></option>
                  {this.chooseAxis()}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          {this.plotLine()}
        </Form>
      </Container>
    );
  }
}
