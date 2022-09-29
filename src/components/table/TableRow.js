import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';

import ToggleIconButton from '../ToggleButton';

const TableRow = ({ user }) => {
  return (
    <tr key={user.id}>
      <td className='text-primary'>{user.name}</td>
      <td className='text-primary'>{user.surname}</td>
      <td>{user.birth}</td>
      <td>{user.type}</td>
      <td className='text-primary'>{user.contact}</td>
      <td className='d-flex justify-content-around align-items-center'>
        <ToggleIconButton icon='heart' active={user.favourite} />
        <ToggleIconButton icon='star' active={user.star} className='ms-1' />
        <Button variant='outline-primary' className='ms-1'>
          <TrashFill />
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
