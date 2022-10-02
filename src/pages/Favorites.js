import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
import MainPanel from '../components/MainPanel';
import SearchPanel from '../components/contacts/SearchPanel';

const Favorites = () => {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const navigate = useNavigate();

  const allContactsClickHandler = () => {
    navigate('/contacts');
  };

  const starClickHandler = () => {
    navigate('/contacts/starred');
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

      <SearchPanel />
    </PageLayout>
  );
};

export default Favorites;
