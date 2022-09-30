import ReactDOM from 'react-dom';
import { Container, Spinner } from 'react-bootstrap';

import styles from '../sass/main.module.scss';

const Backdrop = (props) => {
  return (
    <div
      className={styles.loadingOverlay__backdrop}
      onClick={props.onClose}></div>
  );
};

const LoadingSpinner = (props) => {
  return (
    <Container
      fluid
      className={`${styles.loadingOverlay__spinner} d-flex flex-column align-items-center justify-content-center vh-100 fixed-top`}>
      {props.children}
    </Container>
  );
};

const portalElement = document.getElementById('overlay');

const LoadingOverlay = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <LoadingSpinner>
          <Spinner
            animation='border'
            variant='primary'
            style={{ width: '4rem', height: '4rem' }}
          />
        </LoadingSpinner>,
        portalElement
      )}
    </>
  );
};

export default LoadingOverlay;
