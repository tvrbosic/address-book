import { Stack } from 'react-bootstrap';

import styles from './AddContact.module.scss';
import AddContactForm from './AddContactForm';
const AddContact = () => {
  return (
    <Stack>
      <div
        className={`${styles.header} p-3 text-center fs-4 fw-bold text-white border-bottom rounded-top`}>
        Add New Contact
      </div>
      <AddContactForm />
    </Stack>
  );
};

export default AddContact;
