import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const PetNewsCard = ({ pet }) => {
  const { picture_url, breed, news, id } = pet;
  const navigate = useNavigate();

  // This function processes and displays news items. Adapt it as needed.
  const renderNewsItems = (news) => {
    return news.map((item, index) => (
      <li key={index} className="text-sm mt-1">
        {item}
      </li>
    ));
  };

  return (
    <Card className="mb-4">
      <Card.Img
        variant="top"
        src={picture_url}
        onClick={() => navigate(`/browse-pets/${id}`)}
        className="cursor-pointer h-48 object-cover"
      />
      <Card.Body className="flex flex-col">
        <Card.Title>{breed}</Card.Title>
        <Card.Text>
          <ul>
            {renderNewsItems(news)}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PetNewsCard;
