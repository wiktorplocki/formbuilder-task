import React from 'react';
import shortid from 'shortid';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item ? this.props.item.id : shortid.generate(),
      question: this.props.item ? this.props.item.question : '',
      answer: '',
      type: this.props.item ? this.props.item.type : 'boolean',
      operand: this.props.item ? this.props.item.operand : '===',
      children: this.props.item ? this.props.item.children : []
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
        return this.setState({ type: 'boolean' });
      case 'Number':
        return this.setState({ type: 'number' });
      case 'Text':
        return this.setState({ type: 'text' });
      default:
        return this.setState({ type: 'boolean' });
    }
  };

  handleOperandChange = e => {
    switch (e.target.value) {
      case 'Equal':
        return this.setState({ operand: '===' });
      case 'Greater than':
        return this.setState({ operand: '>' });
      case 'Lesser than':
        return this.setState({ operand: '<' });
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
    const { item, isChild, removeItem, onAddItemClick, renderChildren } = this.props;
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
              onClick={removeItem}
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
