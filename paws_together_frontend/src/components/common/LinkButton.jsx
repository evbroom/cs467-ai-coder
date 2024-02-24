import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AddButton = ({ route, text }) => {
  return (
    <Link to={`${route}`}>
      <Button variant="dark">{text}</Button>
    </Link>
  );
};
export default AddButton;
