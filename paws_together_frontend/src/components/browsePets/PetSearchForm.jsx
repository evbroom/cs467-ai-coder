import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import FetchPetBreeds from './FetchPetBreeds';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Modified from the generated code by ChatGPT by OpenAI
 * URL: https://chat.openai.com/share/4450b131-f86a-4e31-a976-b90b37ccdc53
 */
const PetSearchForm = ({ onSearch }) => {
  const { handleSubmit, watch, register, control } = useForm();
  const selectedType = watch('type');
  const [breeds, setBreeds] = useState([]);

  return (
    <Form onSubmit={handleSubmit(onSearch)} className="space-y-4">
      {/* Select: Pet Type */}
      <div className="flex flex-col">
        <Form.Label htmlFor="type" className="font-bold mx-auto">
          Type
        </Form.Label>
        <Form.Select aria-label="Select pet type" {...register('type')}>
          <option>Select Type</option>
          <option value="dogs">Dogs</option>
          <option value="cats">Cats</option>
          <option value="other">Other</option>
        </Form.Select>
      </div>

      {/* Select: Pet Breed */}
      <div className="flex flex-col">
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
      </div>

      {/* Checkbox: Pet Dispositions */}
      <div className="flex flex-col">
        <Form.Label className="font-bold mx-auto">Disposition</Form.Label>
        <div className="border-2 rounded p-3">
          <Form.Check
            type="checkbox"
            name="disposition"
            label="Good with other animals"
            value="Good with other animals"
            {...register('disposition')}
          />
          <Form.Check
            type="checkbox"
            name="disposition"
            label="Good with children"
            value="Good with children"
            {...register('disposition')}
          />
          <Form.Check
            type="checkbox"
            name="disposition"
            label="Must be leashed at all times"
            value="Must be leashed at all times"
            {...register('disposition')}
          />
        </div>
      </div>

      {/* DatePicker: Date Created */}
      <div className="flex flex-col">
        <Form.Label htmlFor="dateCreated" className="font-bold mx-auto">
          Created Date
        </Form.Label>
        <div className="mx-auto">
          <Controller
            name="dateCreated"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <DatePicker
                  selected={value}
                  onChange={onChange}
                  maxDate={new Date()}
                  dateFormat="MM-dd-yyyy"
                  className="border-2 rounded w-full text-center"
                  placeholderText="Select Date"
                />
              );
            }}
          />
        </div>
      </div>

      <Button type="submit" variant="dark" className="w-full">
        Search
      </Button>
    </Form>
  );
};

export default PetSearchForm;
