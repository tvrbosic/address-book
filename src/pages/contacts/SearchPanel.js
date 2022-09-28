import { Row, Col, Form, InputGroup, NavDropdown } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchPanel = () => {
  return (
    <Row className='d-flex align-items-center px-5 py-4 border-top bg-light'>
      <Col>
        <InputGroup>
          <InputGroup.Text id='search-input'>
            <Search className='fs-5' />
          </InputGroup.Text>
          <Form.Control
            placeholder='Search...'
            aria-label='Search'
            aria-describedby='search-input'
          />
        </InputGroup>
      </Col>

      <Col>
        <InputGroup>
          <input type='date' />
        </InputGroup>
      </Col>
      <Col>
        <NavDropdown id='type-dropdown' title='Type' menuVariant='light'>
          <NavDropdown.Item>Mobile</NavDropdown.Item>
          <NavDropdown.Item>Landline</NavDropdown.Item>
          <NavDropdown.Item>Email</NavDropdown.Item>
          <NavDropdown.Item>Pager</NavDropdown.Item>
        </NavDropdown>
      </Col>
    </Row>
  );
};

export default SearchPanel;
