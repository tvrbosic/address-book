import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';

import styles from '../sass/main.module.scss';
import useHttp from '../hooks/use-http';
import { contactsActions } from '../store/contacts-slice';
import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
import MainPanel from '../components/MainPanel';
import ToggleIconButton from '../components/ToggleIconButton';
import EditContactForm from '../components/contacts/EditContactForm';
import DeleteContact from '../components/contacts/DeleteContact';
import Modal from '../components/Modal';
import EditResponse from '../components/contacts/EditResponse';
import LoadingOverlay from '../components/LoadingOverlay';

const ContactDetails = () => {
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [editDisabled, setEditDisabled] = useState(true);
  const [displayMessageModal, setDisplayMessageModal] = useState(false);
  const { id } = useParams();
  const displayedContact = useSelector(
    (state) => state.contacts.contactToDisplay
  );
  const { sendRequest, isLoading, error } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // If all values are 0, it is initial state and still hasn't been populated with data
  const dataEmpty = [
    displayedContact.id,
    displayedContact.birth,
    displayedContact.user,
  ].every((val) => val === 0);

  const fetchedDataHandler = useCallback(
    (data) => {
      //console.log(data);
      dispatch(contactsActions.setContactToDisplay(data));
      dispatch(contactsActions.setContactToDelete(data));
    },
    [dispatch]
  );

  // Populate data on manual url visit (due to redux state loss)
  useEffect(() => {
    // Send request only if data is empty
    dataEmpty &&
      sendRequest(
        { url: `http://localhost:3001/contacts/${id}` },
        fetchedDataHandler
      );
  }, [sendRequest, fetchedDataHandler, id, dataEmpty]);

  const requestSuccessHandler = (data) => {
    // After successful database update, update app state
    dispatch(contactsActions.addOrUpdateContact(data));
    dispatch(contactsActions.setContactToDisplay(data));
  };

  const updateContactRequest = (data) => {
    setDisplayMessageModal(true);

    // Update contact in database
    sendRequest(
      {
        url: `http://localhost:3001/contacts/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      },
      requestSuccessHandler
    );
  };

  const starClickHandler = (event) => {
    // Stop propagation to prevent click event on <tr> and trigger displayContactDetails
    event.stopPropagation();
    // Update contact in database
    sendRequest(
      {
        url: `http://localhost:3001/contacts/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { star: !displayedContact.star },
      },
      requestSuccessHandler
    );
  };

  const favouriteClickHandler = () => {
    // Update contact in database
    sendRequest(
      {
        url: `http://localhost:3001/contacts/${id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { favourite: !displayedContact.favourite },
      },
      requestSuccessHandler
    );
  };

  const deleteClickHandler = () => {
    setDisplayDeleteModal(true);
    dispatch(contactsActions.setContactToDelete(displayedContact.id));
  };

  const afterDeleteHandler = () => {
    setDisplayDeleteModal(false);
    navigate('/contacts');
  };

  const afterUpdateHandler = () => {
    setDisplayMessageModal(false);
  };

  return (
    <PageLayout className='d-flex flex-column'>
      <Header />

      <MainPanel
        title={`${displayedContact.name} ${displayedContact.surname} `}
        className={`${styles['bg-gray-200']}`}>
        <Button
          variant={`${editDisabled ? 'outline-primary' : 'primary'}`}
          className='ms-auto'
          onClick={() => setEditDisabled(!editDisabled)}>
          Edit
        </Button>
        <Button variant='outline-danger' onClick={deleteClickHandler}>
          Delete
        </Button>
        <span>Mark as: </span>
        <ToggleIconButton
          icon='star'
          active={displayedContact.star}
          onClick={starClickHandler}
        />
        <ToggleIconButton
          icon='heart'
          active={displayedContact.favourite}
          onClick={favouriteClickHandler}
        />
      </MainPanel>

      <Row className={`${styles['bg-gray-100']} p-5 m-0 flex-grow-1`}>
        <Col xs={12} sm={1} md={2} lg={3} xl={4}></Col>
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className='flex-grow-1'>
          <EditContactForm
            displayedContact={displayedContact}
            editDisabled={editDisabled}
            onSubmit={updateContactRequest}
          />
        </Col>
        <Col xs={12} sm={1} md={2} lg={3} xl={4}></Col>
      </Row>
      {displayMessageModal && (
        <Modal onClose={() => setDisplayMessageModal(false)}>
          <EditResponse closeModal={afterUpdateHandler} error={error} />
        </Modal>
      )}
      {displayDeleteModal && (
        <Modal onClose={() => setDisplayDeleteModal(false)}>
          <DeleteContact
            closeClick={() => setDisplayDeleteModal(false)}
            afterDelete={afterDeleteHandler}
          />
        </Modal>
      )}

      {isLoading && <LoadingOverlay />}
    </PageLayout>
  );
};

export default ContactDetails;
