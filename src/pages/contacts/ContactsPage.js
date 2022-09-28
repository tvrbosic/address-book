import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import DataTable from '../../components/DataTable';

import useHttpRequest from '../../hooks/use-http-requst';
import Header from '../../components/Header';
import MainPanel from './MainPanel';
import SearchPanel from './SearchPanel';
import LoadingOverlay from '../../components/LoadingOverlay';

const ContactsPage = () => {
  const [contactData, setContactData] = useState([]);
  const { sendRequest } = useHttpRequest();

  const dataHandler = (data) => {
    setContactData(data);
  };

  useEffect(() => {
    sendRequest({ url: 'http://localhost:3001/contacts' }, dataHandler);
  }, [sendRequest]);

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
