import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

/**
 * Modified from the generated code by OpenAI's ChatGPT 4:
 * Accessed on: 2/13/24
 * Source: https://chat.openai.com/share/20b55a1d-8825-49da-8127-682eebcc2908
 */
const PetCard = ({ petProfile }) => {
  const { picture_url, breed, availability, date_created, description, id } = petProfile;
  const navigate = useNavigate();

  console.log('Availability:', availability)

  let borderColorClass, bgColorClass, textColorClass;
  switch (availability) {
    case 'Not Available':
      borderColorClass = 'border-red-500';
      bgColorClass = 'bg-red-100';
      textColorClass = 'text-red-500';
      break;
    case 'available':
      borderColorClass = 'border-green-500';
      bgColorClass = 'bg-green-100';
      textColorClass = 'text-green-500';
      break;
    case 'Pending':
      borderColorClass = 'border-yellow-500';
      bgColorClass = 'bg-yellow-100';
      textColorClass = 'text-yellow-500';
      break;
    case 'Adopted':
      borderColorClass = 'border-blue-500';
      bgColorClass = 'bg-blue-100';
      textColorClass = 'text-blue-500';
      break;
    default:
      borderColorClass = 'border-gray-300';
      bgColorClass = 'bg-gray-100';
      textColorClass = 'text-gray-500';
  }

  return (
    <Card
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          navigate(`/browse-pets/${id}`);
        }
      }}
      >
      <Card.Img
        variant="top"
        src={picture_url}
        onClick={() => navigate(`/browse-pets/${id}`)}
        className="cursor-pointer h-48 object-cover"
      />
      <Card.Body className="flex flex-col">
        <Card.Title className="flex justify-between items-center">
        <span className="pr-2">{breed}</span>
        <span className={`border-1 p-1 rounded text-xs ${borderColorClass} ${bgColorClass} ${textColorClass}`}>{availability}</span>
        </Card.Title>
        <Card.Text>
          <span className="text-sm">Added on <span className="font-semibold">{date_created}</span></span> <br />
          <span className="line-clamp-2 text-sm mt-3">{description}</span>
        </Card.Text>
        <Button 
          variant="outline-primary" 
          className="view-profile-button px-2 py-1 text-sm mt-auto mx-auto inline-block" 
          onClick={() => navigate(`/browse-pets/${id}`)}
        >
          View Profile
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PetCard;
