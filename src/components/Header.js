import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Stack, Nav } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';

import { logoutUser } from '../store/user-actions';

const Header = () => {
  const email = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Stack direction='horizontal' className='px-5 py-2 bg-dark'>
      <span className='fs-5 text-white'>Address Book</span>
      <span className='ms-auto text-secondary'>Signed in as: </span>
      <span className='ms-1 text-light'>{email}</span>
      <Nav>
        <Nav.Link href='#' onClick={logoutHandler}>
          <BoxArrowRight className='text-light fs-4' />
        </Nav.Link>
      </Nav>
    </Stack>
  );
};

export default Header;
