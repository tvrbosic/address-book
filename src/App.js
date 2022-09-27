import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initializeStoredSession } from './store/user-actions';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';

function App() {
  // Initialize application session from existing one
  const dispatch = useDispatch();

  dispatch(initializeStoredSession());

  const userLoggedIn = useSelector((state) => state.user.loggedIn);

  console.log(userLoggedIn);

  return (
    <>
      {!userLoggedIn && (
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route exact path='*' element={<Navigate to={'/'} replace />} />
        </Routes>
      )}
      {userLoggedIn && (
        <Routes>
          <Route exact path='/' element={<LoginPage />} />
          <Route exact path='/contacts' element={<ContactsPage />} />
          <Route exact path='*' element={<Navigate to={'/'} replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
