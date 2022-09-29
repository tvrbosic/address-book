import { useState } from 'react';

import { Table } from 'react-bootstrap';
import TableRow from './TableRow';
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
          {currentPageData.map((contact) => (
            <TableRow key={contact.id} contact={contact} />
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
