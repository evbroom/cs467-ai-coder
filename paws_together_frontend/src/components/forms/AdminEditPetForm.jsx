import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import { getPetBreeds } from '../../utils/api';
import { patchPetProfile } from '../../utils/adminApi';
import LinkButton from '../common/LinkButton';
import { openInNewWindow } from '../../utils/helper';
import { RiDeleteBin6Line } from 'react-icons/ri';

const AdminEditPetForm = ({ initialPetProfile }) => {
  const {
    handleSubmit,
    watch,
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: initialPetProfile,
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const type = watch('type');
  const [breeds, setBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [news, setNews] = useState([]);
  const [isRequesting, setIsRequesting] = useState(false);

  const setBreedOptions = (type) => {
    if (type === 'dog') {
      setBreeds(dogBreeds);
    } else if (type === 'cat') {
      setBreeds(catBreeds);
    } else {
      setBreeds(['Other']);
    }
  };

  // Fetch dog and cat breeds from the server and then set the initial breed option.
  useEffect(() => {
    getPetBreeds('dog', setDogBreeds, setError);
    getPetBreeds('cat', setCatBreeds, setError);
    setBreedOptions(initialPetProfile.type);
    if (initialPetProfile.breed) {
      setValue('breed', initialPetProfile.breed);
    }
  }, []);

  // Updated breeds based on the selected type.
  useEffect(() => {
    setBreedOptions(type);
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
    const petId = initialPetProfile.id;
    const updatedPetProfile = Object.keys(petProfile).reduce((acc, key) => {
      if (
        !isEqual(petProfile[key], initialPetProfile[key]) &&
        petProfile[key].length > 0
      ) {
        acc[key] = petProfile[key];
      }
      return acc;
    }, {});
    // If there are updated fields, send a PATCH request to the server.
    if (Object.keys(updatedPetProfile).length > 0) {
      if (!isRequesting) {
        setIsRequesting(true);
        await patchPetProfile(petId, updatedPetProfile, setError, navigate);
      }
      setIsRequesting(false);
    } else {
      navigate('/admin/pet-profiles');
    }
  };

  return (
    <div className="w-3/4 lg:w-1/2 mx-auto">
      <div className="flex justify-end">
        <LinkButton route="/admin/pet-profiles/" text="Go Back" />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Group controlId="type">
          <Form.Label className="font-bold mx-auto">Type</Form.Label>
          <Form.Select
            aria-label="Select pet type"
            name="type"
            onChange={(e) => register('type').onChange(e)}
            {...register('type')}
          >
            <option value="">Select Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="breed">
          <Form.Label className="font-bold mx-auto">Breed</Form.Label>
          <Controller
            name="breed"
            control={control}
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
        </Form.Group>
        <Form.Group controlId="disposition">
          <Form.Label className="font-bold mx-auto">Disposition</Form.Label>
          <Form.Check
            type="checkbox"
            name="disposition"
            label="Good with other animals"
            value="good_with_animals"
            {...register('disposition', {})}
          />
          <Form.Check
            type="checkbox"
            name="disposition"
            label="Good with children"
            value="good_with_children"
            {...register('disposition', {})}
          />
          <Form.Check
            type="checkbox"
            name="disposition"
            label="Must be leashed at all times"
            value="leash_needed"
            {...register('disposition', {})}
          />
        </Form.Group>
        <Form.Group controlId="availability">
          <Form.Label className="font-bold mx-auto">Availability</Form.Label>
          <Form.Select
            aria-label="Select pet availability"
            name="availability"
            {...register('availability')}
          >
            <option value="">Select Availability</option>
            <option value="not_available">Not Available</option>
            <option value="available">Available</option>
            <option value="pending">Pending</option>
            <option value="adopted">Adopted</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="picture">
          <Form.Label className="font-bold mx-auto">Picture</Form.Label>
          <img
            src={initialPetProfile.picture_url}
            alt="Pet profile picture"
            className="pb-4 max-w-54 max-h-54 lg:max-w-64 lg:max-h-64 hover:cursor-pointer"
            onClick={() => openInNewWindow(initialPetProfile.picture_url)}
          />
          <Form.Control
            type="file"
            accept="image/jpeg, image/png"
            {...register('picture', {
              validate: validateFile,
            })}
          />
          {!errors.picture && (
            <Form.Text>Support file types: .jpg, .jpeg, .png</Form.Text>
          )}
        </Form.Group>
        <Form.Group controlId="news">
          <Form.Label className="font-bold mx-auto">News</Form.Label>
          <div className="flex items-center">
            <Form.Control
              type="text"
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
          <ul>
            {news.length > 0 ? (
              news.map((item, index) => (
                <li key={index}>
                  <RiDeleteBin6Line
                    className="inline cursor-pointer size-6 mr-2 text-danger"
                    onClick={() => {
                      const updatedNews = news.filter((_, i) => i !== index);
                      setNews(updatedNews);
                    }}
                  />
                  {item}
                </li>
              ))
            ) : (
              <li>No news items added</li>
            )}
          </ul>
        </div>

        <Form.Group controlId="description">
          <Form.Label className="font-bold mx-auto">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={8}
            {...register('description', {
              maxLength: {
                value: 500,
                message: 'Description cannot exceed 500 characters.',
              },
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
            Update
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminEditPetForm;
