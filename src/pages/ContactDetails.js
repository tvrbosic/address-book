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
import LoadingOverlay from '../components/LoadingOverlay';

const ContactDetails = () => {
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [editDisabled, setEditDisabled] = useState(true);
  const { id } = useParams();
  const displayedContact = useSelector(
    (state) => state.contacts.contactToDisplay
  );
  const { sendRequest, isLoading } = useHttp();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchedDataHandler = useCallback(
    (data) => {
      dispatch(contactsActions.setDisplayContact(data));
    },
    [dispatch]
  );

  useEffect(() => {
    sendRequest(
      { url: `http://localhost:3001/contacts/${id}` },
      fetchedDataHandler
    );
  }, [sendRequest, fetchedDataHandler, id]);

  const updateContactRequest = () => {
    console.log('TODO: Update request sent!');
  };

  const requestSuccessHandler = (data) => {
    // After successful database update, update app state
    dispatch(contactsActions.addOrUpdateContact(data));
    dispatch(contactsActions.setDisplayContact(data));
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

  const hideModalHandler = () => {
    setDisplayDeleteModal(false);
    navigate('/contacts');
  };

  return (
    <PageLayout className='d-flex flex-column'>
      <Header />
      {!isLoading && (
        <>
          <MainPanel
            title={`${displayedContact.name} ${displayedContact.surname} `}
            className={`${styles['bg-gray-200']}`}>
            <Button
              variant={`${editDisabled ? 'outline-primary' : 'primary'}`}
              className='ms-auto'
              onClick={() => setEditDisabled(!editDisabled)}>
              Edit
            </Button>
            <Button
              variant='outline-danger'
              onClick={() => setDisplayDeleteModal(true)}>
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
          {displayDeleteModal && (
            <Modal onClose={hideModalHandler}>
              <DeleteContact closeModal={hideModalHandler} />
            </Modal>
          )}
        </>
      )}
      {isLoading && <LoadingOverlay />}
    </PageLayout>
  );
};

export default ContactDetails;
