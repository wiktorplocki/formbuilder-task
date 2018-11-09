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
      selectValue: true,
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
      default:
        return this.setState({ operand: '===' });
    }
  };

  handleSelectValue = e => {
    switch (e.target.value) {
      case 'Yes':
        return this.setState({ selectValue: true });
      case 'No':
        return this.setState({ selectValue: false });
      default:
        return this.setState({ selectValue: true });
    }
  };

  renderComparatorSection = () => {
    const { item } = this.props;
    const { selectValue, answer } = this.state;
    switch (item.type) {
      case 'boolean':
        return (
          <Input
            type="select"
            onChange={this.handleSelectValue}
          >
            <option value selected={selectValue === true}>
              Yes
            </option>
            <option value={false} selected={selectValue === false}>
              No
            </option>
          </Input>
        );
      case 'text':
        return (
          <Input
            type="text"
            defaultValue={answer}
            onChange={this.handleAnswerChange}
          />
        );
      case 'number':
        return (
          <Input
            type="number"
            defaultValue={answer}
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
                    <option selected={this.state.operand === '==='}>Equals</option>
                    <option selected={this.state.operand === '>'}>
                      Greater than
                    </option>
                    <option selected={this.state.operand === '<'}>Lesser than</option>
                  </Input>
                  {this.renderComparatorSection()}
                </span>
              ) : null}
              <Label for="formQuestion">Question</Label>
              <Input
                type="text"
                id="formQuestion"
                defaultValue={this.state.question}
                onChange={this.handleQuestionChange}
              />
              <Label for="formType">Type</Label>
              <Input
                type="select"
                id="formType"
                onChange={this.handleInputTypeChange}
              >
                <option selected={this.state.type === 'boolean'}>Yes / No</option>
                <option selected={this.state.type === 'text'}>Text</option>
                <option selected={this.state.type === 'number'}>Number</option>
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
            {renderChildren(item.children)}
          </Form>
        </div>
      </Container>
    );
  }
}

export default FormInput;
