import React, { Component } from "react";
import axios from "axios";
import { Table, Pagination } from "react-bootstrap";
export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
      mapping: [],
      records: [],
      size: 0,
      active: 1,
    };
    this.pageChanged = this.pageChanged.bind(this);
    this.pageNext = this.pageNext.bind(this);
    this.pagePrev = this.pagePrev.bind(this);
    this.pageFirst = this.pageFirst.bind(this);
    this.pageLast = this.pageLast.bind(this);
  }

  getMapping = (data) => {
    var res = [];
    var record = this.state.records[1];
    for (var key in record) {
      res.push(key);
    }
    this.setState({ mapping: res });
  };

  getRecords = (data) => {
    var res = [];
    var list = data["hits"]["hits"];
    for (var i in list) {
      res.push(list[i]["_source"]);
    }
    this.setState({ records: res });
  };

  refreshRecords = (from) => {
    // refresh the list of 20 records by calling elasticsearch

    axios
      .get(
        `http://localhost:9200/${this.state.activeItem}/_search?size=15&from=${from}`
      )
      .then((res) => {
        this.getRecords(res.data);
        this.getMapping();
      })
      .catch((err) => console.log(err));
  };

  refreshSize = () => {
    // refresh the list of 20 records by calling elasticsearch

    axios
      .get(`http://localhost:9200/${this.state.activeItem}/_stats`)
      .then((res) => {
        var len = res.data["_all"]["primaries"]["docs"]["count"];
        this.setState({ size: len });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.refreshRecords(0);
    this.refreshSize();
  }

  mapHeader = () => {
    return this.state.mapping.map((item) => {
      return <th>{item}</th>;
    });
  };

  mapRecord = () => {
    var records = this.state.records;
    var toMap = [];
    for (var i in records) {
      var record = records[i];
      var temp = [];
      for (var key in record) {
        temp.push(record[key]);
      }
      toMap.push(
        temp.map((item) => {
          return <td>{item}</td>;
        })
      );
    }
    return toMap.map((item) => {
      return <tr>{item}</tr>;
    });
  };

  mapDatagrid = () => {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>{this.mapHeader()}</tr>
        </thead>
        <tbody>{this.mapRecord()}</tbody>
      </Table>
    );
  };

  pageChanged(e) {
    var newPage = parseInt(e.target.text);
    if (newPage) {
      this.setState({ active: newPage });
      this.refreshRecords((newPage - 1) * 15);
    }
  }

  pageNext(e) {
    var maxPage = Math.ceil(this.state.size / 15);
    var newPage = this.state.active + 1;
    if (newPage < maxPage + 1) {
      this.setState({ active: newPage });
      this.refreshRecords((newPage - 1) * 15);
    }
  }

  pagePrev(e) {
    var newPage = this.state.active;
    if (newPage > 1) {
      this.setState({ active: newPage - 1 });
      this.refreshRecords((newPage - 2) * 15);
    }
  }

  pageFirst(e) {
    this.setState({ active: 1 });
    this.refreshRecords(0);
  }

  pageLast(e) {
    var maxPage = Math.ceil(this.state.size / 15);
    console.log(maxPage);
    this.setState({ active: maxPage });
    this.refreshRecords((maxPage - 1) * 15);
  }

  pagination = (i) => {
    // Handle the Datagrid Pagination
    var size = this.state.size;
    var maxPage = Math.ceil(size / 15);
    let active = this.state.active;
    let items = [];

    if (i < maxPage - 2) {
      items.push(
        <Pagination.Item key={i} active={i === active}>
          {i}
        </Pagination.Item>
      );
      items.push(
        <Pagination.Item key={i + 1} active={i + 1 === active}>
          {i + 1}
        </Pagination.Item>
      );
    } else {
      items.push(
        <Pagination.Item key={maxPage - 3} active={maxPage - 3 === active}>
          {maxPage - 3}
        </Pagination.Item>
      );
      items.push(
        <Pagination.Item key={maxPage - 2} active={maxPage - 2 === active}>
          {maxPage - 2}
        </Pagination.Item>
      );
    }
    if (i < maxPage - 3) {
      items.push(<Pagination.Ellipsis />);
    }
    items.push(
      <Pagination.Item key={maxPage - 1} active={maxPage - 1 === active}>
        {maxPage - 1}
      </Pagination.Item>
    );
    items.push(
      <Pagination.Item key={maxPage} active={maxPage === active}>
        {maxPage}
      </Pagination.Item>
    );
    return (
      <Pagination>
        <Pagination.First onClick={this.pageFirst} />
        <Pagination.Prev onClick={this.pagePrev} />
        <Pagination onClick={this.pageChanged}>{items}</Pagination>
        <Pagination.Next onClick={this.pageNext} />
        <Pagination.Last onClick={this.pageLast} />
      </Pagination>
    );
  };

  render() {
    return (
      <>
        {this.mapDatagrid()}
        {this.pagination(this.state.active)}
      </>
    );
  }
}
