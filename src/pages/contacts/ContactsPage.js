import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from 'react-bootstrap';

import useHttp from '../../hooks/use-http';
import { contactsActions } from '../../store/contacts-slice';
import LoadingOverlay from '../../components/LoadingOverlay';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import AddContact from './Add';
import DeleteContact from './Delete';
import MainPanel from './MainPanel';
import SearchPanel from './SearchPanel';
import DataTable from '../../components/table/DataTable';

const ContactsPage = () => {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  const userId = useSelector((state) => state.user.id);
  const contacts = useSelector((state) => state.contacts.list);
  const filteredContacts = useSelector((state) => state.contacts.filteredList);

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

  const hideModalHandler = () => {
    setDisplayAddModal(false);
    setDisplayDeleteModal(false);
  };

  const dataLoaded = contacts.length > 0 ? true : false;

  return (
    <Container fluid className='p-0'>
      <Header />
      <MainPanel addContactClick={() => setDisplayAddModal(true)} />
      <SearchPanel />
      {dataLoaded && (
        <DataTable
          data={filteredContacts || contacts}
          deleteConfirmation={() => setDisplayDeleteModal(true)}
        />
      )}
      {!dataLoaded && <LoadingOverlay />}
      {displayAddModal && (
        <Modal onClose={hideModalHandler}>
          <AddContact userId={userId} closeModal={hideModalHandler} />
        </Modal>
      )}
      {displayDeleteModal && (
        <Modal onClose={hideModalHandler}>
          <DeleteContact closeModal={hideModalHandler} />
        </Modal>
      )}
    </Container>
  );
};

export default ContactsPage;
