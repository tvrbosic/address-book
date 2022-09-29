import { Stack, Button } from 'react-bootstrap';

const MainPanel = () => {
  return (
    <Stack
      direction='horizontal'
      gap={3}
      className='d-flex align-items-center px-5 py-3'>
      <span className='fs-5 fw-bold text-center'>My Contacts</span>

      <Button variant='outline-warning' className='ms-auto'>
        Starred
      </Button>
      <Button variant='outline-danger'>Favourites</Button>
      <Button variant='outline-success'>Add Contact</Button>
    </Stack>
  );
};

export default MainPanel;
