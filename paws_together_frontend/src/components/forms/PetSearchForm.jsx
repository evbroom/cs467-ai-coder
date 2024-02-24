import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { getPetBreeds, getPetProfiles } from '../../utils/api';
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
  setFetchError,
  setFilter,
}) => {
  const { handleSubmit, watch, register, control } = useForm();
  const type = watch('type');
  const [breeds, setBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const { authToken } = useAuth();
  const [breedsFetchError, setBreedsFetchError] = useState('');

  // Fetch dog and cat breeds from the server.
  useEffect(() => {
    getPetBreeds({
      type: 'dog',
      setBreeds: setDogBreeds,
      setError: setBreedsFetchError,
    });
    getPetBreeds({
      type: 'cat',
      setBreeds: setCatBreeds,
      setError: setBreedsFetchError,
    });
  }, []);

  // Updated breeds based on the selected type.
  useEffect(() => {
    if (type) {
      if (type === 'dog') {
        setBreeds(dogBreeds);
      } else if (type === 'cat') {
        setBreeds(catBreeds);
      } else {
        setBreeds(['Other']);
      }
    } else {
      setBreeds([]);
    }
  }, [type]);

  const onSearch = (filter) => {
    getPetProfiles({
      page: 1,
      filter,
      setPetProfiles,
      setIsNextPage,
      setFetchError,
    });
    setFilter(filter);
    setPage(1); // Reset page to 1
  };

  return (
    <Form onSubmit={handleSubmit(onSearch)} className="space-y-4">
      <Form.Group controlId="text" className="flex flex-col">
        <Form.Label className="font-bold mx-auto">Type</Form.Label>
        <Form.Select
          id="type"
          aria-label="Select pet type"
          {...register('type')}
        >
          <option value="">Select Type</option>
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
          <option value="other">Other</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="breed" className="flex flex-col">
        <Form.Label className="font-bold mx-auto">Breed</Form.Label>
        <Form.Select aria-label="Select pet breed" {...register('breed')}>
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </Form.Select>
        {breedsFetchError && (
          <Form.Text className="text-danger">{breedsFetchError}</Form.Text>
        )}
      </Form.Group>
      <Form.Group controlId="disposition" className="flex flex-col">
        <Form.Label className="font-bold mx-auto">Disposition</Form.Label>
        <div className="border-2 rounded p-3">
          <Form.Check
            type="checkbox"
            name="disposition"
            label="Good with other animals"
            value="good_with_animals"
            {...register('disposition')}
          />
          <Form.Check
            type="checkbox"
            name="disposition"
            label="Good with children"
            value="good_with_children"
            {...register('disposition')}
          />
          <Form.Check
            type="checkbox"
            name="disposition"
            label="Must be leashed at all times"
            value="leash_needed"
            {...register('disposition')}
          />
        </div>
      </Form.Group>
      <Form.Group controlId="dateCreated" className="flex flex-col">
        <Form.Label className="font-bold mx-auto">Created Date</Form.Label>
        <Controller
          name="dateCreated"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <div className="mx-auto">
                <DatePicker
                  selected={value}
                  onChange={onChange}
                  maxDate={new Date()}
                  dateFormat="MM-dd-yyyy"
                  className="border-2 rounded text-center"
                  placeholderText="Select Date"
                />
              </div>
            );
          }}
        />
      </Form.Group>
      <Button type="submit" variant="dark" className="w-full">
        Search
      </Button>
    </Form>
  );
};

export default PetSearchForm;
