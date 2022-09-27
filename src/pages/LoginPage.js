import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container, Stack, Row, Col, Card, Alert } from 'react-bootstrap';

import styles from './LoginPage.module.css';
import useHttpRequest from '../hooks/use-http-requst';
import { userActions } from '../store/user-slice';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const { error, sendRequest } = useHttpRequest();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSuccessfulLogin = (data) => {
    localStorage.setItem('token', data.accessToken);
    dispatch(userActions.login(data.accessToken));
    navigate('/contacts');
  };

  const loginRequest = (event, email, password) => {
    event.preventDefault();
    dispatch(userActions.setUser(email));
    sendRequest(
      {
        url: 'http://localhost:3001/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { email, password },
      },
      handleSuccessfulLogin
    );
  };

  return (
    <Container fluid className={styles.container}>
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
