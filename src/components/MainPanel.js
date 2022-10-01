import { Stack } from 'react-bootstrap';

const MainPanel = (props) => {
  return (
    <Stack
      direction='horizontal'
      gap={3}
      className={`${props.className} d-flex align-items-center px-5 py-3 border-top border-bottom`}>
      <span className='fs-5 fw-bold text-dark text-center'>{props.title}</span>

      {props.children}
    </Stack>
  );
};

export default MainPanel;
