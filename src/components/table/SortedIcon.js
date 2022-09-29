import { SortDown, SortDownAlt } from 'react-bootstrap-icons';

const SortedIcon = ({ visible, sortAscending, className }) => {
  // Which icon should be displayed
  const renderIcon = () =>
    sortAscending ? (
      <SortDown className={`${className}`} />
    ) : (
      <SortDownAlt className={`${className}`} />
    );

  // If visible display icon else return null
  return visible ? renderIcon() : null;
};

export default SortedIcon;
