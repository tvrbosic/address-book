import {
  Form,
  Stack,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
} from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import useInput from '../../hooks/use-input';
import { emailValidator } from '../../utility/validators';

// Customize DatePicker css
import '../../sass/DatePicker.scss';

const AddContactForm = (props) => {
  const {
    value: name,
    hasError: nameHasError,
    isTouched: nameTouched,
    onChange: nameChangeHandler,
    onBlur: nameBlurHandler,
    validate: validateName,
  } = useInput(emailValidator);

  const {
    value: surname,
    hasError: surnameHasError,
    isTouched: surnameTouched,
    onChange: surnameChangeHandler,
    onBlur: surnameBlurHandler,
    validate: validateSurname,
  } = useInput(emailValidator);

  const {
    value: contact,
    hasError: contactHasError,
    isTouched: contactTouched,
    onChange: contactChangeHandler,
    onBlur: contactBlurHandler,
    validate: validateContact,
  } = useInput(emailValidator);

  const submitHandler = () => {};

  return (
    <Form
      noValidate
      className={`${props.className} p-4 justify-content-end`}
      onSubmit={submitHandler}>
      <Stack gap={3}>
        <Row className='align-items-center text-end'>
          <Col xs={3}>
            <Form.Label>Name</Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type='text'
              value={name}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              className={`${nameHasError && 'is-invalid'}`}></Form.Control>
          </Col>
        </Row>

        <Row className='align-items-center'>
          <Col xs={3} className='text-end'>
            <Form.Label column>Surname</Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type='text'
              value={surname}
              onChange={surnameChangeHandler}
              onBlur={surnameBlurHandler}
              className={`${surnameHasError && 'is-invalid'}`}></Form.Control>
          </Col>
        </Row>

        <Row>
          <Col xs={3} className='text-end'>
            <Form.Label column>Date of birth</Form.Label>
          </Col>
          <Col xs={9}>
            <DatePicker />
          </Col>
        </Row>

        <Row>
          <Col xs={3} className='text-end'>
            <Form.Label column>Type</Form.Label>
          </Col>
          <Col xs={9}>
            <DropdownButton id='dropdown-basic-button' title='Mobile'>
              <Dropdown.Item>Mobile</Dropdown.Item>
              <Dropdown.Item>Landline</Dropdown.Item>
              <Dropdown.Item>Email</Dropdown.Item>
              <Dropdown.Item>Pager</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>

        <Row className='align-items-center'>
          <Col xs={3} className='text-end'>
            <Form.Label column>Contact</Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type='text'
              value={contact}
              onChange={contactChangeHandler}
              onBlur={contactBlurHandler}
              className={`${contactHasError && 'is-invalid'}`}></Form.Control>
          </Col>
        </Row>
      </Stack>
      <Form.Group className='mt-3 text-center'>
        <Button variant='success' type='submit'>
          Add Contact
        </Button>
      </Form.Group>
    </Form>
  );
};

export default AddContactForm;
