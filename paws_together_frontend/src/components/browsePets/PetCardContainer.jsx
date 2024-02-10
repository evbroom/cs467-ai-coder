import PetCard from './PetCard';
import PetCardPagination from './PetCardPagination';
import PetProfile from './PetProfile';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

const PetCardContainer = ({ pets }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [id, setId] = useState('');
  const [pet, setPet] = useState('');

  const onClick = (id) => () => {
    setId(id);
    handleShow();

    // fetch pet profile by id
    const pet = {
      image:
        'https://images.pexels.com/photos/1696589/pexels-photo-1696589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      breed: 'Labrador',
      type: 'dogs',
      disposition: ['Good with other animals', 'Good with children'],
      description: 'This is a Labrador Retriever.',
      availability: true,
      id: `${id}`,
    };
    setPet(pet);
  };

  return (
    <>
      <div className="grow p-8 lg:p-16">
        <div className="container grid gap-6 lg:grid-cols-4">
          {pets.map((pet) => {
            return (
              <PetCard
                key={pet.id}
                image={pet.image}
                breed={pet.breed}
                availability={pet.availability}
                onClick={onClick(pet.id)}
              />
            );
          })}
        </div>
        <PetCardPagination />
      </div>
      {show && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <PetProfile pet={pet} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};
export default PetCardContainer;
