import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Label } from "reactstrap";
import axios from "axios";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  ResponsiveContainer,
  Legend,
  ComposedChart,
} from "recharts";
import Select from "react-select";

export default class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      mapping: this.props.mapping,
      data: [],
      reg: [],
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
    if (e == null) {
      this.setState({ Y: undefined });
    } else {
      let values = e;
      var res = [];
      for (const item of values) {
        res.push(item.value);
      }
      this.setState({ Y: res }, () => {
        if (this.state.X !== undefined) {
          this.getData();
        }
      });
    }
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

  multiScatter = () => {
    const color = [
      "#264653",
      "#CC2936",
      "#8AB17D",
      "#F4A261",
      "#2A9D8F",
      "#E9C46A",
      "#EE8959",
    ];
    let count = 0,
      data;
    data = this.state.Y;
    count = data.length;
    return data.map((item) => {
      count = count + 1;
      return (
        <Scatter
          type="number"
          dataKey={item}
          fill={color[count % color.length]}
        />
      );
    });
  };

  plotLine = () => {
    if (this.state.X !== undefined && this.state.Y !== undefined) {
      console.log(this.state.data);
      return (
        <ResponsiveContainer width="75%" aspect={2} className="chart">
          <ComposedChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
            data={this.state.data}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey={this.state.X} name={this.state.X} />
            <YAxis />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            {this.multiScatter()}
            <Legend />
          </ComposedChart>
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
                  isMulti
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
