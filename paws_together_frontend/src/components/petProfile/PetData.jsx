const PetData = ({ field, value }) => {
  return (
    <div className="grid gap-2">
      <p>
        <span className="fw-semibold pr-1">{field}:</span>
        <span>
          {field === 'Disposition' ? <>{value?.join(', ')}</> : value}
        </span>
      </p>
    </div>
  );
};

export default PetData;
