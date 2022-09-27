import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from './store/user-slice';
import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';

function App() {
  const userLoggedIn = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();

  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    dispatch(userActions.setUser(localStorage.getItem('user')));
    dispatch(userActions.login(storedToken));
  }

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
