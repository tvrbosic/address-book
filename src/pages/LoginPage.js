import { useNavigate } from 'react-router-dom';
import { Container, Stack, Card } from 'react-bootstrap';

import styles from './LoginPage.module.css';
import useHttpRequest from '../hooks/use-http-requst';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const { isLoading, error, sendRequest } = useHttpRequest();
  let navigate = useNavigate();

  const handleResponse = (data) => {
    console.log(data);
    navigate('/contacts');
  };

  const loginHandler = (event) => {
    event.preventDefault();
    sendRequest(
      {
        url: 'http://localhost:3001/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { email: 'user@email.com', password: 'user' },
      },
      handleResponse
    );
    console.log(error);
  };

  return (
    <Container>
      <Stack
        className={`${styles.layout} justify-content-center align-items-center`}>
        <h1 className={`${styles.title} text-center`}>Address Book App</h1>
        <Card
          className={`${styles['login-form']} shadow py-4 px-5 mb-5 bg-body rounded`}>
          <LoginForm onSubmit={loginHandler} />
        </Card>
      </Stack>
    </Container>
  );
};

export default LoginPage;
