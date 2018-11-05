import React from 'react';
import { Button, Form } from 'reactstrap';

import FormInput from '../FormInput/FormInput';

class FormRoot extends React.Component {
  constructor() {
    super();
    this.state = {
      inputBlocks: []
    }
  }

  render() {
    const { inputBlocks } = this.state;
    return (
      <Form>
        <FormInput />
        {/* {inputBlocks.map(inputBlock => <FormInput />)} */}
        <Button color="primary">Add Input</Button>
      </Form>
    )
  }
}

export default FormRoot;
