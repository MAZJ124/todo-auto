// frontend/src/components/Modal.js

import React, { Component, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
  timeoutsShape
} from "reactstrap";
import DatePicker from 'react-date-picker';

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem
    };
  }

  handleChange = e => {
    if (typeof e !== undefined) {
      let { name, value } = e.target;
      console.log(name)
      console.log(value)
      if (e.target.type === "checkbox") {
        value = e.target.checked;
      }
      const activeItem = { ...this.state.activeItem, [name]: value};
      this.setState({ activeItem });
      console.log(activeItem);
    }
  };

  render() {
    const { toggle, onSave } = this.props;
    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}> Module </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Module Code</Label>
              <Input
                type="text"
                name="code"
                value={this.state.activeItem.code}
                onChange={this.handleChange}
                placeholder="Enter Module Code"
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Module Name</Label>
              <Input
                type="text"
                name="name"
                value={this.state.activeItem.name}
                onChange={this.handleChange}
                placeholder="Enter Module Name"
              />
            </FormGroup>
            {/* <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.activeItem.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup> */}
            {/* <FormGroup>
              <Label for="deadline">Deadline</Label>
              <DatePicker 
                onChange={this.handleChange}
                // value={this.selectDate.date}
              />
            </FormGroup> */}
            <FormGroup>
              <Label for="deadline">Start Date</Label>
              <Input
                type="text"
                name="startDate"
                value={this.state.activeItem.startDate}
                onChange={this.handleChange}
                placeholder="In yyyy-mm-dd format"
              />
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
