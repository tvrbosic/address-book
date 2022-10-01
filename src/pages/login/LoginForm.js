import { Form, Button } from 'react-bootstrap';

import useInput from '../../hooks/use-input';
import { emailValidator, passwordValidator } from '../../utility/validators';

const LoginForm = (props) => {
  const {
    value: email,
    hasError: emailHasError,
    isTouched: emailTouched,
    onChange: emailChangeHandler,
    onBlur: emailBlurHandler,
    validate: validateEmail,
  } = useInput('', emailValidator);

  const {
    value: password,
    hasError: passwordHasError,
    isTouched: passwordTouched,
    onChange: passwordChangeHandler,
    onBlur: passwordBlurHandler,
    validate: validatePassword,
  } = useInput('', passwordValidator);

  const submitHandler = (event) => {
    event.preventDefault();
    // Inputs were not touched (they are empty)
    if (!emailTouched && !passwordTouched) {
      // Trigger validation manually to show errors and return
      validateEmail();
      validatePassword();
      return;
    }
    // Inputs have errors
    if (emailHasError || passwordHasError) {
      return;
    }
    // All ok, send request
    props.onSubmit(email, password);
  };

  return (
    <Form
      noValidate
      className={`${props.className} justify-content-end`}
      onSubmit={submitHandler}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          className={`${emailHasError && 'is-invalid'}`}
        />
        <Form.Text className='invalid-feedback'>
          Please enter valid email address!
        </Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          className={`${passwordHasError && 'is-invalid'}`}
        />
        <Form.Text className='invalid-feedback'>
          Password requires at least 8 characters, uppercase letter, number and
          special character!
        </Form.Text>
      </Form.Group>
      <Form.Group className='mt-3 text-center'>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
