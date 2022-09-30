import styles from '../../sass/main.module.scss';
import SortedIcon from '../SortedIcon';

const TableHeader = ({ sortBy, attributeSortDirections, sortHandler }) => {
  return (
    <thead className={`${styles['hover-pointer']} align-middle`}>
      <tr>
        <th onClick={() => sortHandler('name')}>
          <span>Name</span>
          <SortedIcon
            visible={sortBy === 'name'}
            sortAscending={attributeSortDirections['name']}
            className='fs-4 ms-2'
          />
        </th>
        <th onClick={() => sortHandler('surname')}>
          <span>Surname</span>
          <SortedIcon
            visible={sortBy === 'surname'}
            sortAscending={attributeSortDirections['surname']}
            className='fs-4 ms-2'
          />
        </th>
        <th onClick={() => sortHandler('birth')}>
          <span>Date of birth</span>
          <SortedIcon
            visible={sortBy === 'birth'}
            sortAscending={attributeSortDirections['birth']}
            className='fs-4 ms-2'
          />
        </th>
        <th onClick={() => sortHandler('type')}>
          <span>Contact type</span>
          <SortedIcon
            visible={sortBy === 'type'}
            sortAscending={attributeSortDirections['type']}
            className='fs-4 ms-2'
          />
        </th>
        <th onClick={() => sortHandler('contact')}>
          <span>Contact</span>
          <SortedIcon
            visible={sortBy === 'contact'}
            sortAscending={attributeSortDirections['contact']}
            className='fs-4 ms-2'
          />
        </th>
        <th></th>
      </tr>
    </thead>
  );
};

export default TableHeader;
