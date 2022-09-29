import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';

import useHttp from '../../hooks/use-http';
import { contactsActions } from '../../store/contacts-slice';
import LoadingOverlay from '../../components/LoadingOverlay';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import AddContact from './AddContact';
import MainPanel from './MainPanel';
import SearchPanel from './SearchPanel';
import DataTable from '../../components/table/DataTable';

const ContactsPage = () => {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const contactData = useSelector((state) => state.contacts.list);
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();

  const fetchedDataHandler = useCallback(
    (data) => {
      dispatch(contactsActions.setContacts(data));
    },
    [dispatch]
  );

  useEffect(() => {
    sendRequest(
      { url: `http://localhost:3001/contacts?user=${userId}` },
      fetchedDataHandler
    );
  }, [sendRequest, fetchedDataHandler, userId]);

  const sortContacts = (sortAttribute) => {
    dispatch(contactsActions.sortContacts(sortAttribute));
  };

  const hideAddModalHandler = () => {
    setDisplayAddModal(false);
  };

  const dataLoaded = contactData.length > 0 ? true : false;

  return (
    <Container fluid className='p-0'>
      <Header />
      <MainPanel addContactClick={() => setDisplayAddModal(true)} />
      <SearchPanel />
      {dataLoaded && <DataTable data={contactData} sort={sortContacts} />}
      {!dataLoaded && <LoadingOverlay />}
      {displayAddModal && (
        <Modal onClose={hideAddModalHandler}>
          <AddContact />
        </Modal>
      )}
    </Container>
  );
};

export default ContactsPage;
