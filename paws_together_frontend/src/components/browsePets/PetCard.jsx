import Card from 'react-bootstrap/Card';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { startCase } from 'lodash';

/**
 * Modified from the generated code by OpenAI ChatGPT 4:
 * Source: https://chat.openai.com/share/4450b131-f86a-4e31-a976-b90b37ccdc53
 */
const PetCard = ({ image, breed, availability, dateCreated, id }) => {
  const navigate = useNavigate();

  return (
    <Card style={{ width: '18rem' }}>
      {/*
       * The image style is from the generate dcode by OpenAI's ChatGPT4:
       * Source: https://chat.openai.com/share/3b6b58b7-eb12-423d-93db-db20e4cd1c95
       */}
      <Card.Img
        variant="top"
        src={image}
        onClick={() => navigate(`/browse-pets/${id}`)}
        className="cursor-pointer w-full h-48 object-cover"
      />
      <Card.Body>
        <Card.Title>{startCase(breed)}</Card.Title>
        <Card.Text>
          {format(dateCreated, 'MM-dd-yyyy')} <br />
          {startCase(availability)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
