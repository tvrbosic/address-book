import { useState } from 'react';

import { Table, Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';
import ToggleIconButton from '../ToggleButton';
import PaginationControl from '../PaginationControl';

const itemsPerPage = 20;

const DataTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(props.data.length / itemsPerPage);

  const currentPageData = props.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Table hover className='text-center align-middle border-top'>
        <thead className='align-middle'>
          <tr>
            {props.headers.map((text, index) => (
              <th key={index}>{text}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((user) => (
            <tr key={user.id}>
              <td className='text-primary'>{user.name}</td>
              <td className='text-primary'>{user.surname}</td>
              <td>{user.birth}</td>
              <td>{user.type}</td>
              <td className='text-primary'>{user.contact}</td>
              <td className='d-flex justify-content-around align-items-center'>
                <ToggleIconButton icon='heart' active={user.favourite} />
                <ToggleIconButton
                  icon='star'
                  active={user.star}
                  className='ms-1'
                />
                <Button variant='outline-primary' className='ms-1'>
                  <TrashFill />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationControl
        currentPage={currentPage}
        maxPage={maxPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default DataTable;
