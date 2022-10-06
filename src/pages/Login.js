import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Stack, Row, Col, Card, Alert } from 'react-bootstrap';

import styles from '../sass/main.module.scss';
import useHttp from '../hooks/use-http';
import { loginUser } from '../store/user-actions';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const { error, sendRequest } = useHttp();
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

  const renderError = () => {
    if (error === 'INVALID_CREDENTIALS') {
      return (
        <Alert variant='danger text-center'>
          Incorrect email and password. Please check entered data and try again!
        </Alert>
      );
    } else {
      // error === 'Failed to fetch'
      return (
        <Alert variant='danger text-center'>
          Server did not respond. Please try again later!
        </Alert>
      );
    }
  };

  return (
    <Container fluid className={`${styles['bg-green-100']}`}>
      <Stack className='vh-100 justify-content-center align-items-center'>
        <Row className='w-100'>
          <Col></Col>
          <Col xs={12} sm={10} md={8} lg={6} xl={5} xxl={4}>
            <Card className='shadow py-4 px-5 mb-5 bg-body rounded'>
              <h3 className='text-center mt-3 mb-4 text-primary'>WELCOME</h3>
              <LoginForm onSubmit={loginRequest} />
            </Card>
            {error && renderError()}
          </Col>
          <Col></Col>
        </Row>
      </Stack>
    </Container>
  );
};

export default LoginPage;
