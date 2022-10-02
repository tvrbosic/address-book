import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
import MainPanel from '../components/MainPanel';
import SearchPanel from '../components/contacts/SearchPanel';

const Starred = () => {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const navigate = useNavigate();

  const allContactsClickHandler = () => {
    navigate('/contacts');
  };

  const favoritesClickHandler = () => {
    navigate('/contacts/favorites');
  };

  return (
    <PageLayout>
      <Header />

      <MainPanel title='Starred'>
        <Button
          variant='outline-primary'
          className='ms-auto'
          onClick={allContactsClickHandler}>
          All Contacts
        </Button>
        <Button variant='outline-danger' onClick={favoritesClickHandler}>
          Favorites
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

export default Starred;
