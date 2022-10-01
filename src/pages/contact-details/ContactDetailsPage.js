import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';

import styles from '../../sass/main.module.scss';
import useHttp from '../../hooks/use-http';
import { contactsActions } from '../../store/contacts-slice';
import PageLayout from '../../components/PageLayout';
import Header from '../../components/Header';
import MainPanel from '../../components/MainPanel';
import ToggleIconButton from '../../components/ToggleButton';
import DetailsForm from './DetailsForm';
import LoadingOverlay from '../../components/LoadingOverlay';

const ContactDetails = () => {
  const { id } = useParams();
  const [editDisabled, setEditDisabled] = useState(true);
  const displayedContact = useSelector(
    (state) => state.contacts.contactToDisplay
  );
  const { sendRequest, isLoading } = useHttp();
  const dispatch = useDispatch();

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

  return (
    <PageLayout className='d-flex flex-column'>
      <Header />
      {!isLoading && (
        <>
          <MainPanel
            title={`${displayedContact.name} ${displayedContact.surname} `}
            className={`${styles['bg-gray-200']}`}>
            <Button
              variant='outline-primary'
              className='ms-auto'
              onClick={() => setEditDisabled(false)}>
              Edit
            </Button>
            <Button variant='outline-danger'>Delete</Button>
            <span>Mark as: </span>
            <ToggleIconButton icon='star' />
            <ToggleIconButton icon='heart' />
          </MainPanel>

          <Row className={`${styles['bg-gray-100']} p-5 m-0 flex-grow-1`}>
            <Col xs={12} sm={1} md={2} lg={3} xl={4}></Col>
            <Col xs={12} sm={10} md={8} lg={6} xl={4} className='flex-grow-1'>
              <DetailsForm
                displayedContact={displayedContact}
                editDisabled={editDisabled}
                onSubmit={updateContactRequest}
              />
            </Col>
            <Col xs={12} sm={1} md={2} lg={3} xl={4}></Col>
          </Row>
        </>
      )}
      {isLoading && <LoadingOverlay />}
    </PageLayout>
  );
};

export default ContactDetails;
