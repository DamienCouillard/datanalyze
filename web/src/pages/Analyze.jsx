import React, { Component } from 'react';
import {Container, Row, Col} from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import '../style/Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';

class Analyze extends Component {
  render() {
    return (
    <Container fluid>
        <Row>
            <Col xs={2} id="sidebar-wrapper">      
              <Sidebar />
            </Col>
            <Col xs={10} id="page-content-wrapper">
                Analyze
            </Col> 
        </Row>

    </Container>
    );
  }
}

export default Analyze;