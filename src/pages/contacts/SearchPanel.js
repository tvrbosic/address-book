import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form, InputGroup, Navbar } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import DatePicker from 'react-date-picker';

// Customize DatePicker css
import '../../sass/customized/_react-date-picker.scss';
import styles from '../../sass/main.module.scss';
import { applyContactFilters } from '../../store/contacts-actions';

const SearchPanel = () => {
  const contacts = useSelector((state) => state.contacts.list);
  const [searchedText, setSearchedText] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();
  let searchDebounceTimer;

  useEffect(() => {
    dispatch(applyContactFilters(contacts, searchedText, selectedDate));
  }, [dispatch, contacts, searchedText, selectedDate]);

  const searchTextHandler = (event) => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      setSearchedText(event.target.value);
    }, 400);
  };

  return (
    <Container fluid className={`${styles['bg-gray-200']} px-4 py-3`}>
      <Row>
        <Col xs={12} md={4} xl={6} className='mb-3 mb-md-0'>
          <InputGroup>
            <InputGroup.Text id='search-input' className='bg-success'>
              <Search className='fs-5 text-light' />
            </InputGroup.Text>
            <Form.Control
              placeholder='Search...'
              className='flex-grow-1'
              onChange={searchTextHandler}
            />
          </InputGroup>
        </Col>

        <Col xs={12} md={5} xl={4} className='mb-3 mb-md-0'>
          <Row className='align-items-center'>
            <Col xs={4} lg={5} className='text-end'>
              <Navbar.Text>Date of birth:</Navbar.Text>
            </Col>
            <Col xs={8} lg={7}>
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                format={'dd/MM/y'}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={12} md={3} xl={2} className='mb-md-0'>
          <Row className='align-items-center'>
            <Col xs={4} lg={5} className='text-end'>
              <Navbar.Text>Type:</Navbar.Text>
            </Col>
            <Col xs={8} lg={7}>
              <Form.Select>
                <option value='all'>All</option>
                <option value='mobile'>Mobile</option>
                <option value='landline'>Landline</option>
                <option value='email'>Email</option>
                <option value='pager'>Pager</option>
              </Form.Select>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPanel;
