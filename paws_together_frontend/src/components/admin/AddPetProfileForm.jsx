import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FetchPetBreeds from '../browsePets/FetchPetBreeds';

const AddPetProfileForm = () => {
  const { handleSubmit, watch, register, control } = useForm();
  const selectedType = watch('type');
  const [breeds, setBreeds] = useState([]);

  const onSubmit = (data) => {
    data['date_created'] = new Date();
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor="type" className="font-bold mx-auto">
          Type
        </Form.Label>
        <Form.Select aria-label="Select pet type" {...register('type')}>
          <option>Select Type</option>
          <option value="dogs">Dogs</option>
          <option value="cats">Cats</option>
          <option value="other">Other</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <FetchPetBreeds type={selectedType} setPetBreeds={setBreeds} />
        <Form.Label htmlFor="breed" className="font-bold mx-auto">
          Breed
        </Form.Label>
        <Form.Select aria-label="Select pet breed" {...register('breed')}>
          <option>Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label className="font-bold mx-auto">Disposition</Form.Label>
        <Form.Check
          type="checkbox"
          name="dispositions"
          label="Good with other animals"
          value="Good with other animals"
          {...register('dispositions')}
        />
        <Form.Check
          type="checkbox"
          name="dispositions"
          label="Good with children"
          value="Good with children"
          {...register('dispositions')}
        />
        <Form.Check
          type="checkbox"
          name="dispositions"
          label="Must be leashed at all times"
          value="Must be leashed at all times"
          {...register('dispositions')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="picture" className="font-bold mx-auto">
          Picture
        </Form.Label>
        <Form.Control type="file" {...register('picture')} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="description" className="font-bold mx-auto">
          Description
        </Form.Label>
        <Form.Control as="textarea" rows={3} {...register('description')} />
      </Form.Group>
      <Button type="submit" variant="dark" className="w-full my-10">
        Submit
      </Button>
    </Form>
  );
};

export default AddPetProfileForm;
