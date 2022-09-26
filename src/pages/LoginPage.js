import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';

import styles from './LoginPage.module.css';
import LoginForm from '../components/LoginForm';
import { Card } from 'react-bootstrap';

const LoginPage = () => {
  return (
    <Container>
      <Stack
        className={`${styles.layout} justify-content-center align-items-center`}>
        <h1 className={`${styles.title} text-center`}>Address Book App</h1>
        <Card
          className={`${styles['login-form']} shadow py-4 px-5 mb-5 bg-body rounded`}>
          <LoginForm />
        </Card>
      </Stack>
    </Container>
  );
};

export default LoginPage;
