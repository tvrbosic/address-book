import {
  Heart,
  HeartFill,
  Star,
  StarFill,
  ToggleOff,
  ToggleOn,
} from 'react-bootstrap-icons';

import styles from '../sass/main.module.scss';

const ToggleIconButton = (props) => {
  let iconOff, iconOn;

  switch (props.icon) {
    case 'star':
      iconOff = <Star className='text-warning fs-4' />;
      iconOn = <StarFill className='text-warning fs-4' />;
      break;
    case 'heart':
      iconOff = <Heart className='text-danger fs-4' />;
      iconOn = <HeartFill className='text-danger fs-4' />;
      break;
    default:
      iconOff = <ToggleOff className='text-primary fs-4' />;
      iconOn = <ToggleOn className='text-primary fs-4' />;
      break;
  }
  return (
    <span
      className={`${props.className} ${styles['hover-pointer']}`}
      onClick={props.onClick}>
      {props.active ? iconOn : iconOff}
    </span>
  );
};

export default ToggleIconButton;
