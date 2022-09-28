import { Row, Col, Button } from 'react-bootstrap';

const MainPanel = () => {
  return (
    <Row className='d-flex align-items-center px-5 py-3'>
      <Col className='fs-5 fw-bold'>My Contacts</Col>
      <Col>Dropdown</Col>
      <Col>
        <Button variant='outline-success'>Add Contact</Button>
      </Col>
    </Row>
  );
};

export default MainPanel;
