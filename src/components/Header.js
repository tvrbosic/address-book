import { Link, NavLink } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight } from 'react-bootstrap-icons';

const Header = (props) => {
  const logoutHandler = () => {
    localStorage.removeItem('token');
  };

  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      variant='dark'
      bg='dark'
      className={`${props.className}`}>
      <Container>
        <Navbar.Brand>AddressBook</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav' as={Link}>
          <Nav className='mx-auto'>
            <Nav.Link as={NavLink} to='/contacts' end>
              Contacts
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown title='User' id='basic-nav-dropdown'>
              <NavDropdown.Item
                onClick={logoutHandler}
                className='d-flex justify-content-around align-items-center'>
                Logout
                <BoxArrowRight className='fs-4' />
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;