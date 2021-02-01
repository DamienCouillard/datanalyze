import React from "react";
import { Card, Col } from "react-bootstrap";
import axios from "axios";
import Modal from "../Modal/Modal";
import { trackPromise } from "react-promise-tracker";

class DatasetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        label: "",
        description: "",
        index: "",
        created_at: "",
      },
      datasetsList: [],
    };
  }

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

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    // call the POST or PUT dataset endpoint to create or update dataset
    this.toggle();
    if (item.index) {
      trackPromise(
        axios
          .put(`http://localhost:8000/api/datasets/${item.index}/`, item)
          .then((res) => this.refreshList())
      );
      return;
    }
    trackPromise(
      axios
        .post("http://localhost:8000/api/datasets/", item)
        .then((res) => this.refreshList())
    );
  };

  editItem = (item) => {
    // call a modal component to edit a selected dataset
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  handleDelete = (item) => {
    // call the DELETE dataset endpoint to remove data from elasticsearch and django SQLite
    axios
      .delete(`http://localhost:8000/api/datasets/${item.index}/`)
      .then((res) => this.refreshList())
      .catch((err) => console.log(err));
    window.location.reload();
  };

  renderDescription = (desc) => {
    // display the description
    if (desc.length > 256) {
      return desc.substring(0, 253).concat("...");
    } else {
      return desc;
    }
  };

  render() {
    return (
      <Col className="md-12">
        <Card style={{ width: "40rem", height: "15rem" }}>
          <Card.Body>
            <Card.Title>{this.props.item.label}</Card.Title>
            <Card.Text>
              {this.renderDescription(this.props.item.description)}
            </Card.Text>
            <button
              onClick={() => this.editItem(this.props.item)}
              className="edit-button button btn btn-secondary mr-2 "
            >
              {" "}
              Edit{" "}
            </button>
            <button
              onClick={() => this.handleDelete(this.props.item)}
              className="delete-button button btn btn-danger"
            >
              {" "}
              Delete{" "}
            </button>
          </Card.Body>
        </Card>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </Col>
    );
  }
}

export default DatasetCard;
