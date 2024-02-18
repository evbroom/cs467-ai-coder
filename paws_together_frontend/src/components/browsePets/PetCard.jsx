import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

/**
 * Modified from the generated code by OpenAI's ChatGPT 4:
 * Accessed on: 2/13/24
 * Source: https://chat.openai.com/share/20b55a1d-8825-49da-8127-682eebcc2908
 */
const PetCard = ({ picture_url, breed, availability, date_created, id }) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={picture_url}
        onClick={() => navigate(`/browse-pets/${id}`)}
        className="cursor-pointer w-full h-48 object-cover"
      />
      <Card.Body>
        <Card.Title>{breed}</Card.Title>
        <Card.Text>
          {format(date_created, 'MM-dd-yyyy')} <br />
          {availability}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
