import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }
  handleChange = e => {
    // link the form value to the dataset value to create or update
    let { name, value } = e.target;
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  
  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Dataset</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Label</Label>
              <Input
                type="text"
                name="label"
                value={this.state.activeItem.label}
                onChange={this.handleChange}
                placeholder="Enter dataset label"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Enter dataset description"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Source</Label>
              <Input
                type="text"
                name="source"
                value={this.state.activeItem.source}
                onChange={this.handleChange}
                placeholder="Enter dataset source"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Source Type</Label>
              <Input
                type="select"
                name="source_type"
                value={this.state.activeItem.source_type}
                onChange={this.handleChange}
                placeholder="Enter dataset source type"
                defaultValue='CSV'
              >
                <option> </option>
                <option>CSV</option>
                </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}