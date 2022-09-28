import Pagination from 'react-bootstrap/Pagination';

const PaginationControl = ({ currentPage, maxPage, setCurrentPage }) => {
  const pageNumbers = [];
  const hasPrevious = currentPage === 1 ? false : true;
  const hasNext = currentPage === maxPage ? false : true;

  let renderLeftEllipsis = false;
  let renderRightEllipsis = false;

  // ################ Populate page numbers array ################
  // CASE 1: Less than 10 pages
  if (maxPage <= 9) {
    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(i);
    }
    // CASE 2: 10 pages or more
  } else {
    // CASE 2.1: Current page is within first 5 pages
    if (currentPage <= 5) {
      // Generate first 9 elements
      for (let i = 1; i <= 9; i++) {
        pageNumbers.push(i);
        renderRightEllipsis = true;
      }
      // CASE 2.2:  Current page is close to last page
    } else if (currentPage + 4 >= maxPage) {
      // Generate last 9 elements
      for (let i = maxPage - 8; i <= maxPage; i++) {
        pageNumbers.push(i);
        renderLeftEllipsis = true;
      }
      // CASE 2.3: Current page has 4 or more pages both to the left and right
    } else {
      // Generate 4 pages to the left and right from current page
      for (let i = currentPage - 4; i <= currentPage + 4; i++) {
        pageNumbers.push(i);
        renderLeftEllipsis = true;
        renderRightEllipsis = true;
      }
    }
  }

  // ################ Action handlers ################
  const setPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const setNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const setFirstPage = () => {
    setCurrentPage(1);
  };

  const setLastPage = () => {
    setCurrentPage(maxPage);
  };

  return (
    <div>
      <Pagination className='justify-content-center'>
        <Pagination.First disabled={!hasPrevious} onClick={setFirstPage} />
        <Pagination.Prev disabled={!hasPrevious} onClick={setPrevPage} />
        {renderLeftEllipsis && <Pagination.Ellipsis disabled={true} />}
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => {
              setCurrentPage(number);
            }}>
            {number}
          </Pagination.Item>
        ))}
        {renderRightEllipsis && <Pagination.Ellipsis disabled={true} />}
        <Pagination.Next disabled={!hasNext} onClick={setNextPage} />
        <Pagination.Last disabled={!hasNext} onClick={setLastPage} />
      </Pagination>
    </div>
  );
};

export default PaginationControl;
