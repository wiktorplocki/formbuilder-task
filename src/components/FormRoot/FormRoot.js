import React from 'react';
import shortid from 'shortid';
import db from '../../database';
import { Button, Container, Form } from 'reactstrap';

import FormInput from '../FormInput/FormInput';

const MOCK_DATA = [
  {
    id: shortid.generate(),
    type: 'boolean',
    question: 'Do you own a car?',
    answer: true,
    children: [
      {
        id: shortid.generate(),
        type: 'text',
        question: `What is your car's model?`,
        answer: 'Ford',
        children: [
          {
            id: shortid.generate(),
            type: 'text',
            question: 'What color is your Ford?',
            answer: null,
            children: []
          },
          {
            id: shortid.generate(),
            type: 'number',
            operand: '>',
            question: 'How many wheels on your Ford?',
            answer: '4',
            children: [
              {
                id: shortid.generate(),
                type: 'boolean',
                question: 'Is your Ford road legal?',
                answer: null,
                children: []
              }
            ]
          }
        ]
      },
      {
        id: shortid.generate(),
        type: 'boolean',
        question: 'Has your Toyota been recalled?',
        answer: 'Toyota',
        children: []
      }
    ]
  },
  {
    id: shortid.generate(),
    type: 'number',
    question: 'What year was your building built?',
    answer: null,
    children: []
  },
  {
    id: shortid.generate(),
    type: 'text',
    question: 'What is the name of your company?',
    answer: null,
    children: []
  }
];

class FormRoot extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    db.table('data')
      .toArray()
      .then(data => this.setState({ data }))
      .catch(error => console.error(error));
    db.on('changes', null, true);
  }

  addItem = e => {
    const { data } = this.state;
    const NEW_OBJECT = {
      id: shortid.generate(),
      question: '',
      answer: true,
      type: 'boolean',
      operand: '===',
      selectValue: true,
      children: []
    };
    e.preventDefault();
    this.setState({ data: data.concat(NEW_OBJECT) });
    db.data.put(NEW_OBJECT).catch(error => console.error(error));
  };

  addItemToState = (list, id) => {
    return list.map(item => {
      const NEW_OBJECT = {
        id: shortid.generate(),
        question: '',
        answer: true,
        type: 'boolean',
        operand: '===',
        selectValue: true,
        children: []
      };
      if (item.id !== id) {
        if (item.children) {
          return {
            ...item,
            children: this.addItemToState(item.children, id)
          };
        }
        return list.concat(NEW_OBJECT);
      }
      return { ...item, children: item.children.concat(NEW_OBJECT) };
    });
  };

  onAddItemClick = id => e => {
    e.preventDefault();
    this.setState(prevState => {
      const nextState = this.addItemToState(prevState.data, id);
      db.table('data').update({ id }, { children: nextState[0].children });
      return {
        data: nextState
      };
    });
  };

  removeItemFromState = (list, id) =>
    list.map(item => {
      if (item.id === id) {
        if (item.children) {
          return {
            ...item,
            children: this.removeItemFromState(item.children, id)
          };
        }
        return list.filter(item => item.id !== id);
      }
      return {
        ...item,
        children: item.children.filter(child => child.id !== id)
      };
    });

  onRemoveItemClick = id => e => {
    e.preventDefault();
    this.setState(prevState => {
      const nextState = this.removeItemFromState(prevState.data, id);
      return {
        data: nextState
      };
    });
  };

  removeItem = index => {
    const { data } = this.state;
    const { id } = data.find(item => item);
    db.table('data')
      .delete(id)
      .then(() => this.setState({ data: data.filter((item, i) => index !== i) }))
      .catch(error => console.error(error));
  };

  renderChildren = children => {
    if (children && children.length > 0) {
      return children.map((child, childIndex) => (
        <FormInput
          item={child}
          isChild
          addItemToState={this.addItemToState}
          onAddItemClick={() => this.onAddItemClick(child.id)}
          removeItemFromState={this.removeItemFromState}
          onRemoveItemClick={() => this.onRemoveItemClick(child.id)}
          removeItem={() => this.removeItem(childIndex)}
          renderChildren={this.renderChildren}
        />
      ))
    }
  };

  renderData = items =>
    items.map((item, i) => (
      <FormInput
        item={item}
        isChild={false}
        addItemToState={this.addItemToState}
        onAddItemClick={() => this.onAddItemClick(item.id)}
        removeItemFromState={this.removeItemFromState}
        onRemoveItemClick={() => this.onRemoveItemClick(item.id)}
        removeItem={() => this.removeItem(i)}
        renderChildren={this.renderChildren}
      />
    ));

  render() {
    const { data } = this.state;
    return (
      <Container>
        <Form>
          <div>{this.renderData(data)}</div>
          <Button color="primary" onClick={this.addItem}>
            Add Input
          </Button>
        </Form>
      </Container>
    );
  }
}

export default FormRoot;
