import { Container } from 'react-bootstrap';
const PageLayout = (props) => {
  return (
    <Container fluid className={`${props.className} p-0 min-vh-100`}>
      {props.children}
    </Container>
  );
};

export default PageLayout;
