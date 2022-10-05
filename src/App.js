import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initStorageSession } from './store/user-actions';
import LoginPage from './pages/Login';
import ContactsPage from './pages/Contacts';
import ContactDetails from './pages/ContactDetails';
import Starred from './pages/Starred';
import Favorites from './pages/Favorites';

function App() {
  const userLoggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Initialize application session from existing one
  useEffect(() => {
    dispatch(initStorageSession());
  }, []);

  // If session still valid redirect to contacts
  useEffect(() => {
    if (userLoggedIn) navigate('/contacts');
  }, [userLoggedIn]);

  return (
    <Routes>
      <Route exact path='/' element={<LoginPage />} />
      {userLoggedIn && (
        <>
          <Route exact path='/contacts' element={<ContactsPage />} />
          <Route exact path='/contacts/:id' element={<ContactDetails />} />
          <Route exact path='/contacts/favorites' element={<Favorites />} />
          <Route exact path='/contacts/starred' element={<Starred />} />
        </>
      )}
      <Route exact path='*' element={<Navigate to={'/'} replace />} />
    </Routes>
  );
}

export default App;
