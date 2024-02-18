import Card from 'react-bootstrap/Card';

const PetData = ({ field, value }) => {
  return (
    <div className="space-y-4">
      <h3>{field}</h3>
      <Card>
        <Card.Body>
          {field === 'Dispositions' ? (
            <ul>
              {value.map((disposition) => (
                <li key={disposition}>{disposition}</li>
              ))}
            </ul>
          ) : (
            { value }
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PetData;
