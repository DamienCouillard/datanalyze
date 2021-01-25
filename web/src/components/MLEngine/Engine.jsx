import React, { Component } from "react";

import ClassificationNeuralNetwork from "./Classification/NeuralNetwork";

export default class Engine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      activeModel: this.props.activeModel,
      mapping: this.props.mapping,
    };
  }

  renderSwitch = () => {
    switch (this.state.activeModel) {
      case "classification_nn":
        return (
          <ClassificationNeuralNetwork
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
