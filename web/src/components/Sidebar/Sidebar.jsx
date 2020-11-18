import React from "react";
import {Nav} from "react-bootstrap";
import '../../style/Dashboard.css'

const Side = props => {


    return (
        <>

            <Nav className="col-md-12 d-none d-md-block bg-light sidebar"
            activeKey="/"
            >
                <div className="sidebar-sticky"></div>
            <Nav.Item>
                <Nav.Link href="/">Datasets</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/tables">Tables</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="/analyze">Analyze</Nav.Link>
            </Nav.Item>
            </Nav>

        </>
        );
  };
  const Sidebar = Side;
  export default Sidebar