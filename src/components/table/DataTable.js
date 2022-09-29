import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Table } from 'react-bootstrap';

import SortedIcon from './SortedIcon';
import TableRow from './TableRow';
import PaginationControl from '../PaginationControl';

const itemsPerPage = 20;

const DataTable = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedBy, setSortedBy] = useState(null);
  const sortAscending = useSelector((state) => state.contacts.sortAscending);
  const maxPage = Math.ceil(props.data.length / itemsPerPage);

  const currentPageData = props.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sortByHandler = (sortAttribute) => {
    setSortedBy(sortAttribute);
    props.sort(sortAttribute);
  };

  return (
    <>
      <Table hover className='text-center align-middle border-top'>
        <thead className='align-middle'>
          <tr>
            <th onClick={() => sortByHandler('name')}>
              <span>Name</span>
              <SortedIcon
                visible={sortedBy === 'name'}
                sortAscending={sortAscending['name']}
                className='fs-4 ms-2'
              />
            </th>
            <th onClick={() => sortByHandler('surname')}>
              <span>Surname</span>
              <SortedIcon
                visible={sortedBy === 'surname'}
                sortAscending={sortAscending['surname']}
                className='fs-4 ms-2'
              />
            </th>
            <th onClick={() => sortByHandler('birth')}>
              <span>Date of birth</span>
              <SortedIcon
                visible={sortedBy === 'birth'}
                sortAscending={sortAscending['birth']}
                className='fs-4 ms-2'
              />
            </th>
            <th onClick={() => sortByHandler('type')}>
              <span>Contact type</span>
              <SortedIcon
                visible={sortedBy === 'type'}
                sortAscending={sortAscending['type']}
                className='fs-4 ms-2'
              />
            </th>
            <th onClick={() => sortByHandler('contact')}>
              <span>Contact</span>
              <SortedIcon
                visible={sortedBy === 'contact'}
                sortAscending={sortAscending['contact']}
                className='fs-4 ms-2'
              />
            </th>
            <th></th>
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
