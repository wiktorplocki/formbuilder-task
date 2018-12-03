import React from 'react';
import shortid from 'shortid';
import db from '../../database';
import { Button, Container, Form, FormGroup, Label, Input } from 'reactstrap';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.item ? this.props.item.id : shortid.generate(),
      question: this.props.item ? this.props.item.question : '',
      answer: this.props.item ? this.props.item.answer : '',
      type: this.props.item ? this.props.item.type : 'boolean',
      operand: this.props.item ? this.props.item.operand : '===',
      selectValue: this.props.item ? this.props.item.selectValue : true,
      children: this.props.item ? this.props.item.children : [],
      parentId: this.props.item ? this.props.item.parentId : null,
      parentType: this.props.item ? this.props.item.parentType : null
    };
  }

  handleQuestionChange = e => {
    this.setState({ question: e.target.value });
  };

  handleAnswerChange = e => {
    this.setState({ answer: e.target.value });
  };

  handleInputTypeChange = e => {
    const { id, type } = this.state;
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
    switch (item.parentType) {
      case 'boolean':
        return (
          <Input
            type="select"
            onChange={this.handleSelectValue}
          >
            <option value selected={selectValue}>
              Yes
            </option>
            <option value={false} selected={!selectValue}>
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
      default:
        return (
          <Input type="select" onChange={this.handleSelectValue}>
            <option value selected={selectValue}>
              Yes
            </option>
            <option value={false} selected={!selectValue}>
              No
            </option>
          </Input>
        );
    }
  };

  addChild = e => {
    const { children, type, id } = this.state;
    e.preventDefault();
    const NEW_OBJECT = {
      parentId: id,
      parentType: type,
      id: shortid.generate(),
      question: '',
      answer: '',
      operand: '===',
      selectValue: true,
      type: 'boolean',
      children: []
    };
    this.setState({ children: children.concat(NEW_OBJECT) });
  };

  componentDidMount() {
    const { id } = this.state;
    const { item } = this.props;
    if (item) {
      db.table('data').get(id).then(res => console.log(res));
      db.table('data')
        .get({ id: item.parentId })
        .then(res => db.table('data').update(res, { children: res.children.concat(this.state) }));
    }
  }

  render() {
    const { item, isChild, removeItem, renderChildren } = this.props;
    const { question, operand, type, children, id } = this.state;
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
                    disabled={item.parentType !== 'number'}
                  >
                    <option selected={operand === '==='}>Equals</option>
                    <option selected={operand === '>'}>Greater than</option>
                    <option selected={operand === '<'}>Lesser than</option>
                  </Input>
                  {this.renderComparatorSection()}
                </span>
              ) : null}
              <Label for="formQuestion">Question</Label>
              <Input
                type="text"
                id="formQuestion"
                defaultValue={question}
                onChange={this.handleQuestionChange}
              />
              <Label for="formType">Type</Label>
              <Input
                type="select"
                id="formType"
                onChange={this.handleInputTypeChange}
              >
                <option selected={type === 'boolean'}>Yes / No</option>
                <option selected={type === 'text'}>Text</option>
                <option selected={type === 'number'}>Number</option>
              </Input>
            </FormGroup>
            <Button color="primary" onClick={this.addChild}>
              Add Sub-Item
            </Button>
            <Button
              color="danger"
              onClick={removeItem}
            >
              Delete
            </Button>
            {renderChildren(children)}
          </Form>
        </div>
      </Container>
    );
  }
}

export default FormInput;
