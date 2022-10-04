import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from '../../sass/main.module.scss';
import { contactsActions } from '../../store/contacts-actions';
import SortedIcon from '../SortedIcon';

const TableHeader = () => {
  const [sortAttribute, setSortAttribute] = useState(null);
  const attributeSortDirections = useSelector(
    (state) => state.contacts.sortAscending
  );
  const dispatch = useDispatch();

  const sortHandler = (sortBy) => {
    setSortAttribute(sortBy);
    dispatch(contactsActions.sortContacts(sortBy));
  };

  return (
    <thead className={`${styles['hover-pointer']} align-middle`}>
      <tr>
        <th onClick={() => sortHandler('name')}>
          <span>Name</span>
          <SortedIcon
            visible={sortAttribute === 'name'}
            sortAscending={attributeSortDirections['name']}
            className='fs-4 ms-2'
          />
        </th>
        <th onClick={() => sortHandler('surname')}>
          <span>Surname</span>
          <SortedIcon
            visible={sortAttribute === 'surname'}
            sortAscending={attributeSortDirections['surname']}
            className='fs-4 ms-2'
          />
        </th>
        <th onClick={() => sortHandler('birth')}>
          <span>Date of birth</span>
          <SortedIcon
            visible={sortAttribute === 'birth'}
            sortAscending={attributeSortDirections['birth']}
            className='fs-4 ms-2'
          />
        </th>
        <th onClick={() => sortHandler('type')}>
          <span>Contact type</span>
          <SortedIcon
            visible={sortAttribute === 'type'}
            sortAscending={attributeSortDirections['type']}
            className='fs-4 ms-2'
          />
        </th>
        <th onClick={() => sortHandler('contact')}>
          <span>Contact</span>
          <SortedIcon
            visible={sortAttribute === 'contact'}
            sortAscending={attributeSortDirections['contact']}
            className='fs-4 ms-2'
          />
        </th>
        <th>{/* Controls header - placeholder */}</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
