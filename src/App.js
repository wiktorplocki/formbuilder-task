import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Col, Row } from 'reactstrap';
import './stylesheets/main.scss';

const App = () => (
  <Container>
    <Row>
      <Col xs="12" sm="12" md="12" lg="12" xl="12">
        <h1>Hello World</h1>
      </Col>
    </Row>
  </Container>
);

ReactDOM.render(<App />, document.getElementById('root'));
export default App;
