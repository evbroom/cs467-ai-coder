import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const GoBackButton = ({ route }) => {
  return (
    <Link to={`${route}`}>
      <Button variant="dark">Go Back</Button>
    </Link>
  );
};

export default GoBackButton;
