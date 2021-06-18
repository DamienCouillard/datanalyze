import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
import "../style/css/base.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "../components/Modal/Modal";
import CardCustom from "../components/Card/Card";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
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
class Datasets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        label: "",
        description: "",
        index: "",
        created_at: "",
        source: "",
        source_type: "",
        xlsx_sheet: "",
        promiseInProgress: undefined,
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

  componentDidMount() {
    // this function is called when the dataset page is loaded
    this.refreshList();
  }

  renderItems = () => {
    // map the list of datasets
    const newItems = this.state.datasetsList;
    return newItems.map((item) => {
      return (
        <li key={item.index}>
          <CardCustom item={item} />
        </li>
      );
    });
  };

  toggle = () => {
    // trigger the modal
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = async (item) => {
    this.toggle();
    if (item.index && item.index !== "__dataset_init_index_4111898256585") {
      trackPromise(
        axios
          .put(`http://localhost:8000/api/datasets/${item.index}/`, item)
          .then((res) => {
            this.refreshList();
          })
      );
      // .catch(err => {notify("Update failed")});
      return;
    }
    trackPromise(
      axios.post("http://localhost:8000/api/datasets/", item).then((res) => {
        this.refreshList();
      })
    );
    /* .catch(err => {
        // what now?
        notify("Import failed");
      })*/
  };

  createItem = () => {
    // open a modal for item creation
    const item = {
      label: "",
      description: "",
      index: "__dataset_init_index_4111898256585",
      source: "",
      source_type: "",
      xlsx_sheet: "",
    };
    this.setState({ activeItem: item, modal: !this.state.modal });
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
              <Row>
                <div>
                  <h2 className="page-title">Datasets index</h2>
                  <button
                    onClick={this.createItem}
                    className="add-button"
                    title="Add a dataset"
                  >
                    +
                  </button>
                </div>
              </Row>
              <Row>
                <ul>{this.renderItems()}</ul>
              </Row>
            </Col>
          </Row>
        </Container>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        <LoadingIndicator />
      </>
    );
  }
}

export default Datasets;
