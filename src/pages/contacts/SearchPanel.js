import { useState } from 'react';

import { Stack, Form, InputGroup, Navbar, NavDropdown } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

import DatePicker from 'react-date-picker';
//import DatePicker from 'react-date-picker/dist/entry.nostyle';

// Customize DatePicker css
import '../../sass/DatePicker.scss';

const SearchPanel = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Stack
      direction='horizontal'
      gap={4}
      className='px-5 py-3 border-top bg-light align-items-stretch justify-content-start'>
      <InputGroup className='w-50'>
        <InputGroup.Text id='search-input'>
          <Search className='fs-5' />
        </InputGroup.Text>
        <Form.Control
          placeholder='Search...'
          aria-label='Search'
          aria-describedby='search-input'
        />
      </InputGroup>

      <div className='d-flex'>
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          format={'dd/MM/y'}
        />
      </div>

      <div className='d-flex align-items-center '>
        <Navbar.Text>Type:</Navbar.Text>
        <NavDropdown
          id='type-dropdown'
          title='All'
          menuVariant='light'
          className='ms-2'>
          <NavDropdown.Item>Mobile</NavDropdown.Item>
          <NavDropdown.Item>Landline</NavDropdown.Item>
          <NavDropdown.Item>Email</NavDropdown.Item>
          <NavDropdown.Item>Pager</NavDropdown.Item>
        </NavDropdown>
      </div>
    </Stack>
  );
};

export default SearchPanel;
