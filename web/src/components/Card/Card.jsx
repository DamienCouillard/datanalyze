import React from 'react'
import {Card, Col} from 'react-bootstrap'
import axios from 'axios'
import Modal from '../Modal/Modal'

class DatasetCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          activeItem: {
            id: "",
            label: "",
            description: "",
            index: "",
            created_at: "",
    
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
    axios
        .post("http://localhost:8000/api/datasets/", item)
        .then(res => this.refreshList());
    };

    editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
    };

    handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/datasets/${item.id}`)
          .then(res => this.refreshList());
      };
    
    render() {
      return ( 
        <Col class="md-12">
            <Card style={{ width: '40rem' }}>
                { console.log(this.props.item) }
                <Card.Body>
                    <Card.Title>{this.props.item.label}</Card.Title>
                    <Card.Text>
                    {this.props.item.description}
                    </Card.Text>
                    <button onClick={() => this.editItem(this.props.item)} className="btn btn-secondary mr-2"> Edit </button>
                    <button onClick={() => this.handleDelete(this.props.item)} className="btn btn-danger">Delete </button>
                </Card.Body>
            </Card>
            {this.state.modal ? (
          <Modal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit} />
          ) : null}
        </Col>
        
    );
    }
  }

  export default DatasetCard