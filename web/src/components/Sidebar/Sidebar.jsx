import React from "react";
import { Nav } from "react-bootstrap";

const Side = (props) => {
  return (
    <>
      <Nav className="col-md-12 d-none d-md-block sidebar" activeKey="/">
        <h1 className="sidebar-title">Datanalyze</h1>
        <Nav.Item key="dataset">
          <Nav.Link className="sidebar-item" href="/">
            Datasets
          </Nav.Link>
        </Nav.Item>
        <Nav.Item key="tables">
          <Nav.Link className="sidebar-item" href="/tables">
            Tables
          </Nav.Link>
        </Nav.Item>
        <Nav.Item key="analyze">
          <Nav.Link className="sidebar-item" href="/analyze">
            Analyze
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};
const Sidebar = Side;
export default Sidebar;
