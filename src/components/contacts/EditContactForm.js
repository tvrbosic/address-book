import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';

import useInput from '../../hooks/use-input';
import useDatepicker from '../../hooks/use-datepciker';
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

const EditContactForm = ({ selectedContact, editDisabled, onSubmit }) => {
  const navigate = useNavigate();

  const {
    value: name,
    hasError: nameHasError,
    isTouched: nameTouched,
    onChange: nameChangeHandler,
    onBlur: nameBlurHandler,
    validate: validateName,
  } = useInput(selectedContact.name, nameValidator);

  const {
    value: surname,
    hasError: surnameHasError,
    isTouched: surnameTouched,
    onChange: surnameChangeHandler,
    onBlur: surnameBlurHandler,
    validate: validateSurname,
  } = useInput(selectedContact.surname, surnameValidator);

  const {
    value: birth,
    hasError: birthHasError,
    isTouched: birthTouched,
    onChange: birthChangeHandler,
    onBlur: birthBlurHandler,
    validate: validateBirth,
  } = useDatepicker(new Date(selectedContact.birth), notEmptyValidator);

  const [contactType, setContactType] = useState('mobile');

  const {
    value: contact,
    hasError: contactHasError,
    isTouched: contactTouched,
    onChange: contactChangeHandler,
    onBlur: contactBlurHandler,
    validate: validateContact,
  } = useInput(selectedContact.contact, notEmptyValidator);

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
    onSubmit({
      name,
      surname,
      birth: birth.getTime(),
      type: contactType,
      contact,
      star: selectedContact.star,
      favorite: selectedContact.favorite,
      user: selectedContact.user,
    });
  };

  return (
    <Form noValidate onSubmit={submitHandler}>
      <Form.Group className='mb-2'>
        <Form.Label>Name</Form.Label>

        <Form.Control
          type='text'
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          className={`${nameHasError && 'is-invalid'}`}
          disabled={editDisabled}
        />
      </Form.Group>

      <Form.Group className='mb-2'>
        <Form.Label>Surname</Form.Label>
        <Form.Control
          type='text'
          value={surname}
          onChange={surnameChangeHandler}
          onBlur={surnameBlurHandler}
          className={`${surnameHasError && 'is-invalid'}`}
          disabled={editDisabled}
        />
      </Form.Group>

      <Row>
        <Col xs={12} sm={6}>
          <Form.Group className='mb-2'>
            <Form.Label>Date of birth</Form.Label>
            <div>
              <DatePicker
                value={birth}
                onChange={birthChangeHandler}
                onBlur={birthBlurHandler}
                clearIcon={null}
                required={true}
                format={'dd/MM/y'}
                className='w-100'
                disabled={editDisabled}
              />
            </div>
          </Form.Group>
        </Col>

        <Col xs={12} sm={6}>
          <Form.Group className='mb-2'>
            <Form.Label>Type</Form.Label>
            <Form.Select
              defaultValue={selectedContact.type}
              onChange={(event) => setContactType(event.target.value)}
              disabled={editDisabled}>
              <option value='mobile'>Mobile</option>
              <option value='landline'>Landline</option>
              <option value='email'>Email</option>
              <option value='pager'>Pager</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className='mb-2'>
        <Form.Label>Contact</Form.Label>
        <Form.Control
          type='text'
          value={contact}
          onChange={contactChangeHandler}
          onBlur={contactBlurHandler}
          className={`${contactHasError && 'is-invalid'}`}
          disabled={editDisabled}
        />
      </Form.Group>

      <div className='text-center mt-4'>
        <Button variant='secondary' onClick={() => navigate('/contacts')}>
          Back to contacts
        </Button>
        {!editDisabled && (
          <Button variant='success' className='ms-3' type='submit'>
            Save changes
          </Button>
        )}
      </div>
    </Form>
  );
};

export default EditContactForm;
