import React from 'react';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.item.question ? this.props.item.question : '',
      answer: this.props.item.answer ? this.props.item.answer : '',
      inputType: this.props.item.type ? this.props.item.type : 'boolean',
      operandType: this.props.item.operandType ? this.props.item.operandType : '===',
    };
  }

  handleQuestionChange = e => {
    this.setState({ question: e.target.value });
  };

  handleAnswerChange = e => {
    this.setState({ answer: e.target.value });
  };

  handleInputTypeChange = e => {
    switch (e.target.value) {
      case 'Yes / No':
        return this.setState({ inputType: 'boolean' });
      case 'Number':
        return this.setState({ inputType: 'number' });
      case 'Text':
        return this.setState({ inputType: 'text' });
      default:
        return this.setState({ inputType: 'boolean' });
    }
  };

  handleOperandChange = e => {
    switch (e.target.value) {
      case 'Equal':
        return this.setState({ operandType: '===' });
      case 'Greater than':
        return this.setState({ operandType: '>' });
      case 'Lesser than':
        return this.setState({ operandType: '<' });
    }
  };

  renderComparatorSection = () => {
    const { item } = this.props;
    const { selectValue } = this.state;
    switch (item.type) {
      case 'boolean':
        return (
          <Input
            type="select"
            value={selectValue}
            onChange={this.handleAnswerChange}
          >
            <option value selected={selectValue}>
              Yes
            </option>
            <option value={false} selected={selectValue}>
              No
            </option>
          </Input>
        );
      case 'text':
        return (
          <Input
            type="text"
            defaultValue={item.answer}
            onChange={this.handleAnswerChange}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            defaultValue={item.answer}
            onChange={this.handleAnswerChange}
          />
        );
    }
  };

  render() {
    const { item, isChild, removeItem, onAddItemClick, onRemoveItemClick, renderChildren } = this.props;
    return (
      <Container>
        <div className={isChild ? 'input-component sub-input' : 'sub-input'}>
          <Form>
            <FormGroup>
              {isChild ? (
                <span>
                  <Label for="formCondition">Condition</Label>
                  <Input
                    type="select"
                    id="formCondition"
                    onChange={this.handleOperandChange}
                  >
                    <option selected={item.operand === '==='}>Equals</option>
                    <option selected={item.operand === '>'}>
                      Greater than
                    </option>
                    <option selected={item.operand === '<'}>Lesser than</option>
                  </Input>
                  {this.renderComparatorSection()}
                </span>
              ) : null}
              <Label for="formQuestion">Question</Label>
              <Input
                type="text"
                id="formQuestion"
                defaultValue={item.question}
                onChange={this.handleQuestionChange}
              />
              <Label for="formType">Type</Label>
              <Input
                type="select"
                id="formType"
                onChange={this.handleInputTypeChange}
              >
                <option selected={item.type === 'boolean'}>Yes / No</option>
                <option selected={item.type === 'text'}>Text</option>
                <option selected={item.type === 'number'}>Number</option>
              </Input>
            </FormGroup>
            <Button color="primary" onClick={onAddItemClick()}>
              Add Sub-Item
            </Button>
            <Button
              color="danger"
              onClick={isChild ? onRemoveItemClick : removeItem}
            >
              Delete
            </Button>
            <Button color="success" onClick={onRemoveItemClick}>Success</Button>
            {renderChildren(item.children)}
          </Form>
        </div>
      </Container>
    );
  }
}

export default FormInput;
