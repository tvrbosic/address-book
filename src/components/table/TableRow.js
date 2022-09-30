import { useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';

import styles from '../../sass/main.module.scss';
import useHttp from '../../hooks/use-http';
import { contactsActions } from '../../store/contacts-slice';
import TypeIcon from '../../components/TypeIcon';
import ToggleIconButton from '../ToggleButton';

const TableRow = ({ contact, deleteConfirmation }) => {
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();

  const requestSuccessHandler = (data) => {
    // After successful database update, update app state
    dispatch(contactsActions.addOrUpdateContact(data));
  };

  const starClickHandler = () => {
    // Update contact in database
    sendRequest(
      {
        url: `http://localhost:3001/contacts/${contact.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { star: !contact.star },
      },
      requestSuccessHandler
    );
  };

  const favouriteClickHandler = () => {
    // Update contact in database
    sendRequest(
      {
        url: `http://localhost:3001/contacts/${contact.id}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { favourite: !contact.favourite },
      },
      requestSuccessHandler
    );
  };

  const trashClickHandler = () => {
    dispatch(contactsActions.setContactToDelete(contact.id));
    deleteConfirmation();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('hr-HR');
  };

  console.log(contact.type);
  return (
    <tr>
      <td className='text-primary'>{contact.name}</td>
      <td className='text-primary'>{contact.surname}</td>
      <td className={styles['text-gray-600']}>{formatDate(contact.birth)}</td>
      <td className={styles['text-gray-600']}>
        <TypeIcon icon={contact.type} labels={true} className='fs-4' />
      </td>
      <td className='text-primary'>{contact.contact}</td>
      <td className='d-flex justify-content-around align-items-center'>
        <ToggleIconButton
          icon='heart'
          active={contact.favourite}
          onClick={favouriteClickHandler}
        />
        <ToggleIconButton
          icon='star'
          active={contact.star}
          className='ms-1'
          onClick={starClickHandler}
        />
        <Button
          variant='outline-primary'
          className='ms-1'
          onClick={trashClickHandler}>
          <TrashFill />
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
