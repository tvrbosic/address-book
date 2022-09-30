import {
  PhoneFill,
  TelephoneFill,
  EnvelopeFill,
  MusicPlayerFill,
} from 'react-bootstrap-icons';

const TypeIcon = ({ icon, className, labels }) => {
  let returnIcon;
  switch (icon) {
    case 'mobile':
      returnIcon = (
        <>
          {labels ? <span className='me-2'>Mobile</span> : null}
          <PhoneFill className={`${className}`} />
        </>
      );
      break;
    case 'landline':
      returnIcon = (
        <>
          {labels ? <span className='me-2'>Landline</span> : null}
          <TelephoneFill className={`${className}`} />
        </>
      );
      break;
    case 'email':
      returnIcon = (
        <>
          {labels ? <span className='me-2'>E-mail</span> : null}
          <EnvelopeFill className={`${className}`} />
        </>
      );
      break;
    case 'pager':
      returnIcon = (
        <>
          {labels ? <span className='me-2'>Pager</span> : null}
          <MusicPlayerFill className={`${className}`} />
        </>
      );
      break;

    default:
      returnIcon = (
        <>
          {labels ? <span className='me-2'>Mobile</span> : null}
          <PhoneFill className={`${className}`} />
        </>
      );
      break;
  }

  return returnIcon;
};

export default TypeIcon;
