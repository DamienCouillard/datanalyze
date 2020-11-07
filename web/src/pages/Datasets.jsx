import React, {
  Component
} from 'react';
import {
  Container,
  Row,
  Col
} from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import axios from "axios";
import '../style/Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from '../components/Modal/Modal'
import NavbarCustom from '../components/Navbar/Navbar'
import CardCustom from '../components/Card/Card'


class Datasets extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        id: "",
        label: "",
        description: "",
        index: "",
        created_at: "",
        source: "",
        source_type: ""

      },
      datasetsList: []
    };
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/datasets/")
      .then(res => this.setState({
        datasetsList: res.data
      }))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.refreshList();
  }

  renderItems = () => {
      const newItems = this.state.datasetsList
      return newItems.map(item => { return <li><CardCustom item= {item}/></li> })
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = item => {
    this.toggle();
    if (item.id) {
      axios
        .put(`http://localhost:8000/api/datasets/${item.id}/`, item)
        .then(res => this.refreshList());
      return;
    }
    console.log(item)
    axios
      .post("http://localhost:8000/api/datasets/", item)
      .then(res => this.refreshList())
      .catch(err => {
        // what now?
        console.log(err);
      });
  };

  createItem = () => {
    const item = { label: "", description: "", index:"", source:"", source_type:""};
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  
  render() {
    return (
        <>
          <Container fluid>
            <NavbarCustom/>
          </Container>
          <Container fluid>
            <Row>
              <Col xs={2} id="sidebar-wrapper">
              <Sidebar />
              </Col>
              <Col xs={10} id="page-content-wrapper">
              <Row>
                <Col></Col>
                <div class="mx-20 align-self-end">
                  <button onClick={this.createItem} className="btn btn-primary">
                    Add dataset
                  </button>
                </div>
              </Row>
              <Row>
                  <ul>
                  {this.renderItems()}
                  </ul>
              </Row>
              </Col>
            </Row>

          </Container>
          {this.state.modal ? (
          <Modal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit} />
          ) : null}
        </>
    );
  }
}

export default Datasets;