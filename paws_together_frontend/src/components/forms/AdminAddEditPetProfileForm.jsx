import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { isEqual } from 'lodash';
import { getPetBreeds } from '../../utils/api';
import { postPetProfile, patchPetProfile } from '../../utils/adminPetApi';
import { useAuth } from '../../contexts/AuthContext';
import LinkButton from '../common/LinkButton';
import { openInNewWindow } from '../../utils/helper';

const AdminAddEditPetProfileForm = ({ initialPetProfile }) => {
  const {
    handleSubmit,
    watch,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialPetProfile ? initialPetProfile : {},
  });
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [error, setError] = useState('');

  // States for pet breeds selection
  const type = watch('type');
  const [breeds, setBreeds] = useState([]);
  const [dogBreeds, setDogBreeds] = useState([]);
  const [catBreeds, setCatBreeds] = useState([]);
  const [selectBreedError, setSelectBreedError] = useState('');

  // State for selected file (picture)
  const [selectedFile, setSelectedFile] = useState(
    initialPetProfile?.picture_url || null
  );

  // Fetch breed options and then for edit, set breed option to the initial pet profile's breed
  useEffect(() => {
    if (type) {
      if (type === 'dog' && dogBreeds.length === 0) {
        getPetBreeds({ type, setBreeds, setError: setSelectBreedError });
        setDogBreeds(breeds);
      } else {
        setBreeds(dogBreeds);
      }
      if (type === 'cat' && catBreeds.length === 0) {
        getPetBreeds({ type, setBreeds, setError: setSelectBreedError });
        setCatBreeds(breeds);
      } else {
        setBreeds(catBreeds);
      }
      if (type === 'other') {
        setBreeds(['Other']);
      }
    }
    if (initialPetProfile && initialPetProfile.breed) {
      setValue('breed', initialPetProfile.breed);
    }
  }, [type, initialPetProfile, setValue]);

  /**
   * Handle file input change when editing pet profile.
   * Reference from OpenAI's ChatGPT-4
   * Access Date: 2-17-2024
   * Source: https://chat.openai.com/share/db5c7cb9-8db0-4ea3-8c3a-2d69930f4601
   */
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };
  useEffect(() => {
    if (!selectedFile && initialPetProfile) {
      setValue('picture', initialPetProfile.picture_url);
    }
  }, [selectedFile, setValue, initialPetProfile?.picture_url]);

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

  const onSubmit = (data) => {
    if (initialPetData && !isEqual(data, initialPetData)) {
      // Handle edit pet profile
      const petProfile = Object.keys(data).reduce((acc, key) => {
        if (!isEqual(data[key], initialPetData[key])) {
          acc[key] = data[key];
        }
        return acc;
      }, {});
      patchPetProfile({
        petProfile,
        petId: initialPetProfile.id,
        authToken,
        navigate,
        setError,
      });
    } else if (initialPetProfile) {
      // Handle edit pet profile no changes
      setError('No changes detected. Please make changes to update.');
    } else {
      // Handle add pet profile
      data['date_created'] = format(new Date(), 'MM-dd-yyyy');
      postPetProfile({
        petProfile: data,
        authToken,
        navigate,
        setError,
      });
    }
  };

  return (
    <div className="w-1/2 mx-auto">
      <div className="flex justify-end">
        <LinkButton route="/admin/pet-profile/" text="Go Back" />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Text>Fields with * are required.</Form.Text>
        <Form.Group controlId="type">
          <Form.Label className="font-bold mx-auto">Type*</Form.Label>
          <Form.Select
            aria-label="Select pet type"
            name="type"
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
          <Form.Label className="font-bold mx-auto">Breed*</Form.Label>
          <Controller
            name="breed"
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
          {selectBreedError && (
            <Form.Text className="text-danger">{selectBreedError}</Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="dispositions">
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

        <Form.Group controlId="availability">
          <Form.Label className="font-bold mx-auto">Availability*</Form.Label>
          <Form.Select
            aria-label="Select pet availability"
            name="availability"
            {...register('availability', {
              required: 'Availability is required.',
            })}
          >
            <option value="">Select Availability</option>
            <option value="Not Available">Not Available</option>
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="Adopted">Adopted</option>
          </Form.Select>
          {errors.availability && (
            <Form.Text className="text-danger">
              {errors.availability.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="picture" onChange={onFileChange}>
          <Form.Label className="font-bold mx-auto">Picture</Form.Label>
          {initialPetProfile ? (
            initialPetProfile.picture_url ? (
              <img
                src={initialPetProfile.picture_url}
                alt="Pet profile picture"
                className="pb-4 max-w-64 max-h-64 hover:cursor-pointer"
                onClick={() => openInNewWindow(initialPetProfile.picture_url)}
              />
            ) : (
              <p>No picture</p>
            )
          ) : null}
          <Form.Control
            type="file"
            accept="image/jpeg, image/png"
            {...register('picture', { validate: validateFile })}
          />

          {errors.picture ? (
            <Form.Text className="text-danger">
              {errors.picture.message}
            </Form.Text>
          ) : (
            <Form.Text>Support file types: .jpg, .jpeg, .png</Form.Text>
          )}
        </Form.Group>

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
            {initialPetData ? 'Update' : 'Add'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminAddEditPetProfileForm;
