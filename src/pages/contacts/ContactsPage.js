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
    console.log('test');
  }, [sendRequest, fetchedDataHandler]);

  const dataLoaded = contactData.length > 0 ? true : false;

  return (
    <Container fluid className='p-0'>
      <Header />
      <MainPanel />
      <SearchPanel />
      {dataLoaded && (
        <DataTable
          headers={[
            'Name',
            'Surname',
            'Date of birth',
            'Contact type',
            'Contact',
            'Controls',
          ]}
          data={contactData}
        />
      )}
      {!dataLoaded && <LoadingOverlay />}
    </Container>
  );
};

export default ContactsPage;
