import { Form, Button, ListGroup } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getPetBreeds } from '../../utils/api';
import { postPetProfile } from '../../utils/adminApi';
import LinkButton from '../common/LinkButton';
import { RiDeleteBack2Line } from 'react-icons/ri';

const AdminAddPetForm = () => {
  const {
    handleSubmit,
    watch,
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const type = watch('type');
  const [breeds, setBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [news, setNews] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  // Fetch dog and cat breeds from the server.
  useEffect(() => {
    getPetBreeds('dog', setDogBreeds, setError);
    getPetBreeds('cat', setCatBreeds, setError);
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
    }
  }, [type, dogBreeds, catBreeds]);

  // Validate picture file type
  const validateFile = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        return true;
      }
      return 'Unsupported file type. Please select .jpg, .jpeg, or .png file.';
    }
  };

  const onSubmit = async (petProfile) => {
    if (!isRequesting) {
      setIsRequesting(true);
      petProfile.news = news;
      await postPetProfile(petProfile, setError, navigate);
    }
    setIsRequesting(false);
  };

  return (
    <div className="w-3/4 lg:w-1/2 mx-auto">
      <div className="flex justify-end">
        <LinkButton route="/admin/pet-profiles/" text="Go Back" />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Text>
          <span className="font-bold">*</span> required fields
        </Form.Text>
        <Form.Group controlId="type">
          <Form.Label className="font-bold mx-auto">Type *</Form.Label>
          <Form.Select
            aria-label="Select pet type"
            name="type"
            area-required="true"
            onChange={(e) => register('type').onChange(e)}
            {...register('type', { required: 'Type is required.' })}
          >
            <option value="">Select Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </Form.Select>
          {errors.type && (
            <Form.Text className="text-danger">{errors.type.message}</Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="breed">
          <Form.Label className="font-bold mx-auto">Breed *</Form.Label>
          <Controller
            name="breed"
            aria-label="Select pet breed"
            area-required="true"
            control={control}
            rules={{ required: 'Breed is required.' }}
            render={({ field }) => (
              <Form.Select aria-label="Select pet breed" {...field}>
                <option value="">Select Breed</option>
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </Form.Select>
            )}
          />
          {errors.breed && (
            <Form.Text className="text-danger">
              {errors.breed.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="disposition">
          <p className="font-bold mx-auto">Disposition *</p>
          <Form.Check
            type="checkbox"
            name="disposition"
            aria-label="Good with other animals"
            area-required="true"
            label="Good with other animals"
            value="good_with_animals"
            id="good_with_animals"
            {...register('disposition', {
              required: 'Select at least one disposition.',
            })}
          />
          <Form.Check
            type="checkbox"
            name="disposition"
            aria-label="Good with children"
            area-required="true"
            label="Good with children"
            value="good_with_children"
            id="good_with_children"
            {...register('disposition', {
              required: 'Select at least one disposition.',
            })}
          />
          <Form.Check
            type="checkbox"
            name="disposition"
            aria-label="Must be leashed at all times"
            area-required="true"
            label="Must be leashed at all times"
            value="leash_needed"
            id="leash_needed"
            {...register('disposition', {
              required: 'Select at least one disposition.',
            })}
          />
          {errors.disposition && (
            <Form.Text className="text-danger">
              {errors.disposition.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="availability">
          <Form.Label className="font-bold mx-auto">Availability *</Form.Label>
          <Form.Select
            aria-label="Select pet availability"
            area-required="true"
            name="availability"
            {...register('availability', {
              required: 'Availability is required.',
            })}
          >
            <option value="">Select Availability</option>
            <option value="not_available">Not Available</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="adopted">Adopted</option>
          </Form.Select>
          {errors.availability && (
            <Form.Text className="text-danger">
              {errors.availability.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="picture">
          <Form.Label className="font-bold mx-auto">Picture *</Form.Label>
          <Form.Control
            type="file"
            accept="image/jpeg, image/png"
            aria-label="Select pet picture"
            area-required="true"
            {...register('picture', {
              validate: validateFile,
              required: 'Please add a picture.',
            })}
          />
          {errors.picture && (
            <Form.Text className="text-danger">
              {errors.picture.message}
            </Form.Text>
          )}
          {!errors.picture && (
            <Form.Text>Support file types: .jpg, .jpeg, .png</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="news">
          <Form.Label className="font-bold mx-auto">News Items</Form.Label>
          <div className="flex items-center">
            <Form.Control
              type="text"
              aria-label="Add news item"
              placeholder="Add news item"
              {...register('news')}
            />
            <button
              type="button"
              className="ml-2 btn btn-primary"
              onClick={() => {
                const newsItem = getValues('news');
                if (newsItem) {
                  setNews([...news, newsItem]);
                  setValue('news', '');
                }
              }}
            >
              Add
            </button>
          </div>
          {errors.news && (
            <Form.Text className="text-danger">{errors.news.message}</Form.Text>
          )}
        </Form.Group>

        <div className="">
          <p className="font-bold">Added News Items</p>
          <ListGroup>
            {news.length > 0 &&
              news.map((item, index) => (
                <ListGroup.Item key={index}>
                  <div className="flex justify-between">
                    {item}
                    <RiDeleteBack2Line
                      className="inline cursor-pointer size-6 mr-2 text-danger"
                      onClick={() => {
                        const updatedNews = news.filter((_, i) => i !== index);
                        setNews(updatedNews);
                      }}
                    />
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </div>

        <Form.Group controlId="description">
          <Form.Label className="font-bold mx-auto">Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            aria-label="Enter pet description"
            {...register('description', {
              maxLength: {
                value: 500,
                message: 'Description cannot exceed 500 characters.',
              },
              required: 'Description is required.',
            })}
          />
          {errors.description ? (
            <Form.Text className="text-danger">
              {errors.description.message}
            </Form.Text>
          ) : (
            <Form.Text>Max 500 characters</Form.Text>
          )}
        </Form.Group>

        <div className="flex justify-center">
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </div>
        <div className="flex justify-center">
          <Button type="submit" variant="dark" className="w-1/2">
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminAddPetForm;
