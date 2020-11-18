import React, {
    Component
} from 'react';
import {
    Container,
    Row,
    Col,
} from "react-bootstrap";
import {
    Form,
    FormGroup,
    Label,
    Input

} from 'reactstrap';
import axios from 'axios';
import Sidebar from "../components/Sidebar/Sidebar";
import '../style/Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarCustom from '../components/Navbar/Navbar'
import Datagrid from '../components/Datagrid/Datagrid'

class Datasets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeItem: "",
            datasetsList: []
        };

    }

    handleChange = e => {
        // link the form value to the dataset value to cplot in the datagrid
        let {
            value
        } = e.target;
        this.setState({
            activeItem: value
        });
    };

    refreshList = () => {
        // refresh the list of all existing datasets by calling the GET dataset endpoint (may be redundant)
        axios
            .get("http://localhost:8000/api/datasets/")
            .then(res => this.setState({
                datasetsList: res.data
            }))
            .catch(err => console.log(err));
    };


    componentDidMount() {
        // this function is called when the dataset page is loaded
        this.refreshList();
    }

    chooseDataset = () => {
        // map the list of datasets in the form 
          const newItems = this.state.datasetsList
          return newItems.map(item => { return <option value={item.index}>{item.label}</option> })
      };

    plotDatagrid = () => {
        if (this.state.activeItem !== "") {
            return <Datagrid activeItem={this.state.activeItem}/>
        }
    }


    render() {
      return (
          <>
              <Container fluid>
                  <NavbarCustom />
              </Container>
              <Container fluid>
                  <Row>
                      <Col xs={2} id="sidebar-wrapper">
                      <Sidebar />
                      </Col>
                      <Col xs={10} id="page-content-wrapper">

                      <Form>
                          <FormGroup>
                              <Label for="dataset">Select a dataset</Label>
                              <Input type="select" name="source_type" value={this.state.activeItem}
                                  onChange={this.handleChange} placeholder="Enter dataset source type">
                                      <option></option>
                                      {this.chooseDataset()}
                              </Input>
                          </FormGroup>
                      </Form>
                            {this.plotDatagrid()}

                      </Col>
                  </Row>
              </Container>
          </>
      );
    }
  }
  
  export default Datasets;