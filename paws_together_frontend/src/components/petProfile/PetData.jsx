import Card from 'react-bootstrap/Card';

const PetData = ({ field, value }) => {
  return (
    <div className="space-y-4">
      <h3>{field}</h3>
      <Card>
        <Card.Body>
          {field === 'Disposition' ? (
            <>
              {value?.map((disposition) => (
                <p key={disposition}>{disposition}</p>
              ))}
            </>
          ) : (
            value
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PetData;
