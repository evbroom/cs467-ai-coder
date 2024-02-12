import Card from 'react-bootstrap/Card';

const PetData = ({ field, value }) => {
  if (Array.isArray(value)) {
    value = value.join(', ');
  }

  return (
    <div className="space-y-4">
      <h3>{field}</h3>
      <Card>
        <Card.Body>{value}</Card.Body>
      </Card>
    </div>
  );
};

export default PetData;
