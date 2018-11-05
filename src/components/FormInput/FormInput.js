import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputType: this.props.inputType ? this.props.inputType : 'boolean',
      isSubInput: this.props.isSubInput ? this.props.isSubInput : false
    }
  }

  render() {
    const { inputType, isSubInput } = this.state;
    return (
      <div className={isSubInput ? 'sub-input' : null}>
        <Form>
          <FormGroup>
            {isSubInput ? (
              <h1>I'm a sub input!</h1>
            ) : null}
            <Label for="formQuestion">Question</Label>
            <Input type="text" id="formQuestion" />
            <Label for="formType">Type</Label>
            <Input type="select" id="formType">
              <option>Yes / No</option>
              <option>Text</option>
              <option>Number</option>
            </Input>
          </FormGroup>
          <Button color="primary">Add Sub-Input</Button>
          <Button color="danger">Delete</Button>
        </Form>
      </div>
    )
  }
}

export default FormInput;
