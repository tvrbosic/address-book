import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';

function App() {
  const userLoggedIn = useSelector((state) => state.user.loggedIn);
  return (
    <Routes>
      {!userLoggedIn && <Route exact path='/' element={<LoginPage />} />}
      {userLoggedIn && (
        <Route exact path='/contacts' element={<ContactsPage />} />
      )}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
