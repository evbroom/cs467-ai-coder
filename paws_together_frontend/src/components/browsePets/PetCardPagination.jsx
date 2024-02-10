import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PetCardPagination = () => {
  const [isPrevDisabled, setIsPrevDissabled] = useState(true);
  const [isNextDisabled, setIsNextDissabled] = useState(false);

  return (
    <div className="py-6">
      <Pagination className="justify-center align-center">
        <Pagination.Prev disabled={isPrevDisabled} />
        <Pagination.Next disabled={isNextDisabled} />
      </Pagination>
    </div>
  );
};

export default PetCardPagination;
