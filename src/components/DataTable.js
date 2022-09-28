import { useState } from 'react';

import { Table, Button } from 'react-bootstrap';
import { HeartFill, StarFill, TrashFill } from 'react-bootstrap-icons';

import PaginationControl from './PaginationControl';

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
          {currentPageData.map((item) => (
            <tr key={item.id}>
              <td className='text-primary'>{item.name}</td>
              <td className='text-primary'>{item.surname}</td>
              <td>{item.birth}</td>
              <td>{item.type}</td>
              <td className='text-primary'>{item.contact}</td>
              <td className='d-flex justify-content-around'>
                <Button variant='outline-success'>
                  <HeartFill />
                </Button>
                <Button variant='outline-warning'>
                  <StarFill />
                </Button>
                <Button variant='outline-danger'>
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
