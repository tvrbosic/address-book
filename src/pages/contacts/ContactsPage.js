import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import DataTable from '../../components/table/DataTable';

import useHttp from '../../hooks/use-http';
import { contactsActions } from '../../store/contacts-slice';
import Header from '../../components/Header';
import MainPanel from './MainPanel';
import SearchPanel from './SearchPanel';
import LoadingOverlay from '../../components/LoadingOverlay';

const ContactsPage = () => {
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
    sendRequest({ url: 'http://localhost:3001/contacts' }, fetchedDataHandler);
  }, [sendRequest, fetchedDataHandler]);

  const sortContacts = (sortAttribute) => {
    dispatch(contactsActions.sortContacts(sortAttribute));
  };

  const dataLoaded = contactData.length > 0 ? true : false;

  return (
    <Container fluid className='p-0'>
      <Header />
      <MainPanel />
      <SearchPanel />
      {dataLoaded && <DataTable data={contactData} sort={sortContacts} />}
      {!dataLoaded && <LoadingOverlay />}
    </Container>
  );
};

export default ContactsPage;
