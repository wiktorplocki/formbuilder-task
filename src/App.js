import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Col, Row } from 'reactstrap';
import './stylesheets/main.scss';

import FormRoot from './components/FormRoot/FormRoot';

class App extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <FormRoot />
          </Col>
        </Row>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
