import { useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form, InputGroup, Navbar } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import DatePicker from 'react-date-picker';

// Customize DatePicker css
import '../../sass/customized/_react-date-picker.scss';
import styles from '../../sass/main.module.scss';
import { contactsActions } from '../../store/contacts-actions';

const initialSearchParams = {
  text: '',
  date: null,
  type: 'all',
  favorite: false,
  star: false,
};

const searchParamsReducer = (state, action) => {
  switch (action.type) {
    case 'TEXT_CHANGE':
      return { ...state, text: action.payload };
    case 'DATE_CHANGE':
      return { ...state, date: action.payload };
    case 'TYPE_CHANGE':
      return { ...state, type: action.payload };
    case 'FAVORITE_CHANGE':
      return { ...state, favorite: action.payload };
    case 'STAR_CHANGE':
      return { ...state, star: action.payload };

    default:
      return initialSearchParams;
  }
};

const SearchPanel = ({ favorite = false, star = false }) => {
  const contacts = useSelector((state) => state.contacts.list);
  const [searchParams, dispatchSearchParams] = useReducer(searchParamsReducer, {
    ...initialSearchParams,
    favorite: favorite,
    star: star,
  });

  const dispatch = useDispatch();
  let searchDebounceTimer;

  useEffect(() => {
    dispatch(contactsActions.applyContactFilters(contacts, searchParams));
  }, [dispatch, contacts, searchParams]);

  const searchTextHandler = (event) => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      dispatchSearchParams({
        type: 'TEXT_CHANGE',
        payload: event.target.value,
      });
    }, 400);
  };

  const selectDateHandler = (value) => {
    dispatchSearchParams({ type: 'DATE_CHANGE', payload: value });
  };

  const selectTypeHandler = (event) => {
    dispatchSearchParams({ type: 'TYPE_CHANGE', payload: event.target.value });
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
                value={searchParams.date}
                onChange={selectDateHandler}
                format={'dd/MM/y'}
              />
            </Col>
          </Row>
        </Col>

        <Col xs={12} md={3} xl={2} className='mb-3 mb-md-0'>
          <Row className='align-items-center'>
            <Col xs={4} lg={5} className='text-end'>
              <Navbar.Text>Type:</Navbar.Text>
            </Col>
            <Col xs={8} lg={7}>
              <Form.Select onChange={selectTypeHandler}>
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
