import PetProfile from './PetProfile';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
// TODO: take id from the component handles pet lists on BrowsePetsPage
// TODO: fetch pet data from the backend using the id
// TODO: pass the pet data to the PetProfile component
const PetProfilePage = (id) => {
  // Example of a pet object
  const petExample = {
    pictureUrl: 'https://example.com/pet.jpg',
    type: 'Dog',
    breed: 'Labrador',
    dispositions: ['good with children', 'animal must be leashed at all times'],
    availability: 'Available',
    description:
      'A friendly and energetic Labrador perfect for a family with children.',
  };
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <div>
      <Modal show={show} onHilde={handleClose}>
        <Modal.Header>
          {/* Can switch title to the name of the pet */}
          <Modal.Title>Pet Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PetProfile pet={petExample} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default PetProfilePage;
