import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import useInput from '../hooks/use-input';

const isNotEmpty = (value) => value.trim().length >= 3;

const LoginForm = (props) => {
  const {
    value: email,
    isTouched: emailTouched,
    hasError: emailHasError,
    onChange: emailChangeHandler,
    onBlur: emailBlurHandler,
    validate: validateEmail,
  } = useInput(isNotEmpty);

  const {
    value: password,
    isTouched: passwordTouched,
    hasError: passwordHasError,
    onChange: passwordChangeHandler,
    onBlur: passwordBlurHandler,
    validate: validatePassword,
  } = useInput(isNotEmpty);

  return (
    <Form
      className={`${props.className}`}
      onSubmit={(event) => props.onSubmit(event, email, password)}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        <Form.Text className='text-muted'>Could display error here.</Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
        <Form.Text className='text-muted'>Could display error here.</Form.Text>
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
