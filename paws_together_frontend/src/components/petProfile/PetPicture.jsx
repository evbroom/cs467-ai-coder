import Image from 'react-bootstrap/Image';

const PetPicture = ({ imageUrl }) => {
  return (
    <div className="border-2 rounded overflow-hidden">
      <Image src={imageUrl} rounded />
    </div>
  );
};

export default PetPicture;
