import React, { Component } from "react";

import Line from "./LineChart";

export default class Plot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      activeTool: this.props.activeTool,
      mapping: this.props.mapping,
    };
  }

  renderSwitch = () => {
    switch (this.state.activeTool) {
      case "scatter":
        return (
          <Line
            activeItem={this.state.activeItem}
            mapping={this.state.mapping}
          />
        );
      default:
        return <div>Waiting for a dataset to plot</div>;
    }
  };

  render() {
    return <>{this.renderSwitch()}</>;
  }
}
