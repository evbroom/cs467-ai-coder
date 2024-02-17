import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AddButton = ({ route }) => {
  return (
    <Link to={`${route}`}>
      <Button variant="dark">Add</Button>
    </Link>
  );
};
export default AddButton;
