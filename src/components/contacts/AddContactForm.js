import { useState } from 'react';
import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import useInput from '../../hooks/use-input';
import useDatepicker from '../../hooks/use-datepicker';
import {
  maxLength20Validator,
  maxLength30Validator,
  notEmptyValidator,
} from '../../utility/validators';

// Customize DatePicker css
import '../../sass/main.module.scss';

const nameValidator = (value) => {
  return notEmptyValidator(value) && maxLength20Validator(value);
};

const surnameValidator = (value) => {
  return notEmptyValidator(value) && maxLength30Validator(value);
};

const AddContactForm = (props) => {
  const {
    value: name,
    hasError: nameHasError,
    isTouched: nameTouched,
    onChange: nameChangeHandler,
    onBlur: nameBlurHandler,
    validate: validateName,
  } = useInput('', nameValidator);

  const {
    value: surname,
    hasError: surnameHasError,
    isTouched: surnameTouched,
    onChange: surnameChangeHandler,
    onBlur: surnameBlurHandler,
    validate: validateSurname,
  } = useInput('', surnameValidator);

  const {
    value: birth,
    hasError: birthHasError,
    isTouched: birthTouched,
    onChange: birthChangeHandler,
    onBlur: birthBlurHandler,
    validate: validateBirth,
  } = useDatepicker(new Date(), notEmptyValidator);

  const [contactType, setContactType] = useState('mobile');

  const {
    value: contact,
    hasError: contactHasError,
    isTouched: contactTouched,
    onChange: contactChangeHandler,
    onBlur: contactBlurHandler,
    validate: validateContact,
  } = useInput('', notEmptyValidator);

  const submitHandler = (event) => {
    event.preventDefault();
    // Inputs were not touched (they are empty)
    if (!nameTouched && !surnameTouched && !contactTouched && !birthTouched) {
      // Trigger validation manually to show errors and return
      validateName();
      validateSurname();
      validateContact();
      validateBirth();
      return;
    }
    // Inputs have errors
    if (nameHasError || surnameHasError || contactHasError || birthHasError) {
      return;
    }
    // All ok, send request
    props.onSubmit({
      name,
      surname,
      birth: birth.getTime(),
      type: contactType,
      contact,
    });
  };

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
              className={`${nameHasError && 'is-invalid'}`}
            />
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
              className={`${surnameHasError && 'is-invalid'}`}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={3} className='text-end'>
            <Form.Label column>Date of birth</Form.Label>
          </Col>
          <Col xs={9}>
            <DatePicker
              value={birth}
              onChange={birthChangeHandler}
              onBlur={birthBlurHandler}
              clearIcon={null}
              required={true}
              format={'dd/MM/y'}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={3} className='text-end'>
            <Form.Label column>Type</Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Select
              onChange={(event) => setContactType(event.target.value)}>
              <option value='mobile'>Mobile</option>
              <option value='landline'>Landline</option>
              <option value='email'>Email</option>
              <option value='pager'>Pager</option>
            </Form.Select>
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
              className={`${contactHasError && 'is-invalid'}`}
            />
          </Col>
        </Row>
      </Stack>
      <Form.Group className='mt-3 text-center'>
        <Button variant='secondary' onClick={props.onClose}>
          Cancel
        </Button>
        <Button variant='success' type='submit' className='ms-3'>
          Add Contact
        </Button>
      </Form.Group>
    </Form>
  );
};

export default AddContactForm;
