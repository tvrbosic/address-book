import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const LoginForm = (props) => {
  return (
    <Form className={`${props.className}`} onSubmit={props.onSubmit}>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control type='email' placeholder='Enter email' />
        <Form.Text className='text-muted'>Could display error here.</Form.Text>
      </Form.Group>

      <Form.Group className='mb-3' controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Password' />
        <Form.Text className='text-muted'>Could display error here.</Form.Text>
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
