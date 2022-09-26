import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import ContactsPage from './pages/ContactsPage';

function App() {
  return (
    <Routes>
      <Route exact path='/' element={<LoginPage />}></Route>
      <Route exact path='/contacts' element={<ContactsPage />}></Route>
    </Routes>
  );
}

export default App;
