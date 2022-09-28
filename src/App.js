import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { initStorageSession } from './store/user-actions';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';

function App() {
  const dispatch = useDispatch();

  // Initialize application session from existing one
  dispatch(initStorageSession());

  const userLoggedIn = useSelector((state) => state.user.loggedIn);

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
