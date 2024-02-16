import { Button } from 'react-bootstrap';

// TODO: Complete edit and delete functionality
// TODO: responsive design
// TODO: table design
const PetProfileRow = ({ item, setData }) => {
  const handlePetProfileEdit = (id) => {
    console.log(`${id} Edit pet profile`);
  };
  const handlePetProfileDelete = (id) => {
    console.log(`${id} Delete pet profile`);
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const { id, type, breed, disposition, dateCreated } = item;
  return (
    <tr className="border text-center">
      <td className="p-2 border">{type}</td>
      <td className="p-2 border">{breed}</td>
      <td className="p-2 border whitespace-pre text-left">
        {disposition.join('\n')}
      </td>
      <td className="p-2 border">{dateCreated}</td>

      <td className="p-2 border">
        <Button variant="primary" onClick={() => handlePetProfileEdit(id)}>
          Edit
        </Button>
      </td>
      <td className="p-2 border">
        <Button variant="danger" onClick={() => handlePetProfileDelete(id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default PetProfileRow;
