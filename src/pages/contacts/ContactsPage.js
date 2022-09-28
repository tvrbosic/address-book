import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import DataTable from '../../components/DataTable';

import Header from '../../components/Header';
import MainPanel from './MainPanel';
import SearchPanel from './SearchPanel';
import useHttpRequest from '../../hooks/use-http-requst';

const ContactsPage = () => {
  const [contactData, setContactData] = useState([]);
  const { sendRequest } = useHttpRequest();

  const dataHandler = (data) => {
    console.log(data);
    setContactData(data);
  };

  useEffect(() => {
    sendRequest({ url: 'http://localhost:3001/contacts' }, dataHandler);
  }, [sendRequest]);

  return (
    <Container fluid className='p-0'>
      <Header />
      <MainPanel />
      <SearchPanel />
      <DataTable
        headers={[
          'Name',
          'Surname',
          'Date of birth',
          'Contact type',
          'Contact',
        ]}
        data={contactData}
      />
    </Container>
  );
};

export default ContactsPage;
