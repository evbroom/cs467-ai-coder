import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

const PetCardPagination = ({ page, setPage, isNextPage = false }) => {
  const [isPrevDisabled, setIsPrevDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(!isNextPage);

  useEffect(() => {
    setIsPrevDisabled(page <= 1);
  }, [page]);
  useEffect(() => {
    setIsNextDisabled(!isNextPage);
  }, [isNextPage]);

  return (
    <div className="pagination justify-center p-4 space-x-10">
      <Button
        variant="link"
        onClick={() => setPage(page - 1)}
        disabled={isPrevDisabled}
      >
        Prev
      </Button>
      <Button
        variant="link"
        onClick={() => setPage(page + 1)}
        disabled={isNextDisabled}
      >
        Next
      </Button>
    </div>
  );
};

export default PetCardPagination;
