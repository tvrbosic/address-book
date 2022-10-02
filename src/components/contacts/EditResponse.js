import { Stack, Button } from 'react-bootstrap';
import { InfoCircleFill } from 'react-bootstrap-icons';

import styles from '../../sass/main.module.scss';

const EditResponse = ({ closeModal, error }) => {
  const renderMessage = (error) => {
    let message;
    if (error) {
      message = (
        <>
          <span>An</span>
          <span className='mx-1 text-danger'>error</span>
          <span>
            occured during request processing. Please try again later!
          </span>
        </>
      );
    } else {
      message = (
        <>
          <span>Contact successfully</span>
          <span className='mx-1 text-danger'>updated</span>
          <span>!</span>
        </>
      );
    }
    return message;
  };

  return (
    <Stack>
      <div
        className={`${styles.modal__header} p-3 text-center fs-4 fw-bold text-white border-bottom rounded-top`}>
        <span>
          <InfoCircleFill className='fs-3' />
        </span>
        <span className='ms-3'>Info message</span>
      </div>

      <div className='p-5 text-center'>{renderMessage(error)}</div>

      <div className='d-flex justify-content-center pb-4'>
        <Button variant='success' onClick={closeModal}>
          Close
        </Button>
      </div>
    </Stack>
  );
};

export default EditResponse;
