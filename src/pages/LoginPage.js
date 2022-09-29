import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Stack, Row, Col, Card, Alert } from 'react-bootstrap';

import useHttpRequest from '../hooks/use-http';
import { loginUser } from '../store/user-actions';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const { error, sendRequest } = useHttpRequest();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const loginSuccessHandler = (data) => {
    dispatch(loginUser(data.accessToken));
    navigate('/contacts');
  };

  const loginRequest = (email, password) => {
    // Clear storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Send login request
    sendRequest(
      {
        url: 'http://localhost:3001/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { email, password },
      },
      loginSuccessHandler
    );
  };

  return (
    <Container fluid className='bg-light'>
      <Stack className='vh-100 justify-content-center align-items-center'>
        <h1 className='text-center mb-5'>Address Book App</h1>
        <Row className='w-100'>
          <Col></Col>
          <Col xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}>
            <Card className='shadow py-4 px-5 mb-5 bg-body rounded'>
              <LoginForm onSubmit={loginRequest} />
            </Card>
            {error && (
              <Alert variant='danger text-center'>
                Incorrect email and password. Please check entered data and try
                again!
              </Alert>
            )}
          </Col>
          <Col></Col>
        </Row>
      </Stack>
    </Container>
  );
};

export default LoginPage;
