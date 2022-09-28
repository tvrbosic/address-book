import { useState } from 'react';

import {
  Row,
  Col,
  Form,
  InputGroup,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchPanel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Row className='d-flex align-items-center px-5 py-3 border-top bg-light'>
      <Col xs={7}>
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

      <Col xs={3}>
        <InputGroup className='d-flex justify-content-center'>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </InputGroup>
      </Col>

      <Col xs={2} className='d-flex justify-content-center align-items-center'>
        <Navbar.Text className='me-2'>Type:</Navbar.Text>
        <NavDropdown id='type-dropdown' title='All' menuVariant='light'>
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
