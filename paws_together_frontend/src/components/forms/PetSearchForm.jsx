import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { getPetBreeds, getPetProfile } from '../../utils/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Modified from the generated code by ChatGPT by OpenAI
 * Accessed on: 2/13/24
 * Source: https://chat.openai.com/share/20b55a1d-8825-49da-8127-682eebcc2908
 */
const PetSearchForm = ({
  setPetProfiles,
  setPage,
  setIsNextPage,
  setError,
  setCurrentFilter,
}) => {
  const { handleSubmit, watch, register, control } = useForm();
  const type = watch('type');
  const [breeds, setBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const { authToken } = useAuth();

  // Fetch breeds based on type
  useEffect(() => {
    if (type) {
      if (type === 'dog' && dogBreeds.length === 0) {
        getPetBreeds({ type, setBreeds });
        setDogBreeds(breeds);
      } else {
        setBreeds(dogBreeds);
      }
      if (type === 'cat' && catBreeds.length === 0) {
        getPetBreeds({ type, setBreeds });
        setCatBreeds(breeds);
      } else {
        setBreeds(catBreeds);
      }
      if (type === 'other') {
        setBreeds(['Other']);
      }
    }
  }, [type, setBreeds]);

  const onSearch = (filters) => {
    getPetProfile({
      page: 1,
      ...filters,
      authToken,
      setPetProfiles,
      setIsNextPage,
      setError,
    });
    setCurrentFilter(filters);
    setPage(1); // Reset page to 1
  };

  return (
    <Form onSubmit={handleSubmit(onSearch)} className="space-y-4">
      <Form.Control controlId="type" className="flex flex-col">
        <Form.Label className="font-bold mx-auto">Type</Form.Label>
        <Form.Select aria-label="Select pet type" {...register('type')}>
          <option value="">Select Type</option>
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
          <option value="other">Other</option>
        </Form.Select>
      </Form.Control>
      <Form.Control controlId="breed" className="flex flex-col">
        <Form.Label className="font-bold mx-auto">Breed</Form.Label>
        <Form.Select aria-label="Select pet breed" {...register('breed')}>
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </Form.Select>
      </Form.Control>
      <Form.Control controlId="dispositions" className="flex flex-col">
        <Form.Label className="font-bold mx-auto">Disposition</Form.Label>
        <div className="border-2 rounded p-3">
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
        </div>
      </Form.Control>
      <Form.Control controlId="date_created" className="flex flex-col">
        <Form.Label className="font-bold mx-auto">Created Date</Form.Label>
        <Controller
          name="date_created"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <DatePicker
                selected={value}
                onChange={onChange}
                maxDate={new Date()}
                dateFormat="MM-dd-yyyy"
                className="border-2 rounded text-center mx-auto"
                placeholderText="Select Date"
              />
            );
          }}
        />
      </Form.Control>
      <Button type="submit" variant="dark" className="w-full">
        Search
      </Button>
    </Form>
  );
};

export default PetSearchForm;
