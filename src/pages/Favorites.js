import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import useHttp from '../hooks/use-http';
import { contactsActions } from '../store/contacts-actions';
import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
import MainPanel from '../components/MainPanel';
import SearchPanel from '../components/contacts/SearchPanel';
import DataTable from '../components/table/DataTable';
import AddContact from '../components/contacts/AddContact';
import DeleteContact from '../components/contacts/DeleteContact';
import Modal from '../components/Modal';
import LoadingOverlay from '../components/LoadingOverlay';

const Favorites = () => {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const filteredContacts = useSelector((state) => state.contacts.filteredList);

  const { sendRequest, isLoading } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchedDataHandler = useCallback(
    (data) => {
      dispatch(contactsActions.setContacts(data));
    },
    [dispatch]
  );

  useEffect(() => {
    // Add later this url part favorite=true&
    sendRequest(
      { url: `http://localhost:3001/contacts?favorite=true&user=${userId}` },
      fetchedDataHandler
    );
  }, [sendRequest, fetchedDataHandler, userId]);

  const allContactsClickHandler = () => {
    navigate('/contacts');
  };

  const starClickHandler = () => {
    navigate('/contacts/starred');
  };

  const hideModalHandler = () => {
    setDisplayAddModal(false);
    setDisplayDeleteModal(false);
  };

  return (
    <PageLayout>
      <Header />

      <MainPanel title='Favorites'>
        <Button
          variant='outline-warning'
          className='ms-auto'
          onClick={starClickHandler}>
          Starred
        </Button>
        <Button variant='outline-primary' onClick={allContactsClickHandler}>
          All Contacts
        </Button>
        <Button
          variant='outline-success'
          onClick={() => setDisplayAddModal(true)}>
          Add Contact
        </Button>
      </MainPanel>

      <SearchPanel favorite={true} />

      <DataTable
        data={filteredContacts}
        deleteConfirmation={() => setDisplayDeleteModal(true)}
      />

      {displayAddModal && (
        <Modal onClose={hideModalHandler}>
          <AddContact
            userId={userId}
            closeModal={hideModalHandler}
            favorite={true}
          />
        </Modal>
      )}
      {displayDeleteModal && (
        <Modal onClose={hideModalHandler}>
          <DeleteContact
            closeClick={hideModalHandler}
            afterDelete={hideModalHandler}
          />
        </Modal>
      )}

      {isLoading && <LoadingOverlay />}
    </PageLayout>
  );
};

export default Favorites;
