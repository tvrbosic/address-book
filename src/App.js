import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initStorageSession } from './store/user-actions';
import LoginPage from './pages/Login';
import ContactsPage from './pages/Contacts';
import ContactDetails from './pages/ContactDetails';
import Starred from './pages/Starred';
import Favorites from './pages/Favorites';

function App() {
  const dispatch = useDispatch();

  // Initialize application session from existing one
  dispatch(initStorageSession());

  const userLoggedIn = useSelector((state) => state.user.loggedIn);

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
