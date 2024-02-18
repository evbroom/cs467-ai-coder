import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { getPetBreeds } from '../../utils/api';
import { isEqual } from 'lodash';
import { postPetProfile, patchPetProfile } from '../../utils/adminPetApi';
import { useNavigate } from 'react-router-dom';
import GoBackButton from '../../components/common/GoBackButton';

/**
 * Add and edit pet profile form
 *
 * @param {Object} initialPetData - The initial pet data to be edited. Passed by EditPetProfilePage.
 * @returns {JSX.Element} - Add and edit pet profile form.
 */
const AddEditPetProfileForm = ({ initialPetData }) => {
  const {
    handleSubmit,
    watch,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialPetData ? initialPetData : {},
  });
  const navigate = useNavigate();

  // State for selected file (picture)
  const [selectedFile, setSelectedFile] = useState(
    initialPetData?.picture || null
  );

  // States for submission
  const [submitStatusText, setSubmitStatusText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // States for pet breeds selection
  const type = watch('type');
  const [breeds, setBreeds] = useState([]);
  const [selectBreedError, setSelectBreedError] = useState('');

  // Fetch and set breed options once type is selected
  useEffect(() => {
    if (type) {
      const fetchPetBreeds = async () => {
        try {
          const response = await getPetBreeds(type);
          if (response.status === 200) {
            setBreeds(response.data);
          } else {
            setSelectBreedError(
              'Failed to fetch pet breeds. Please try again later.'
            );
          }
        } catch (error) {
          setSelectBreedError('Something went wrong. Please try again later.');
        }
      };
      fetchPetBreeds();
    }
    if (initialPetData && initialPetData.breed) {
      setValue('breed', initialPetData.breed);
    }
  }, [type, initialPetData, setValue]);

  // Handle file input change when editing pet profile.
  // InitilaPetDta.picture is a string of imageUrl from the database.
  // The file of selectedFile is a file object.
  /**
   * handle file input change is referenced from OpenAI's ChatGPT-4.
   * Date: 2-17-2024
   * URL: https://chat.openai.com/share/db5c7cb9-8db0-4ea3-8c3a-2d69930f4601
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
    if (!selectedFile && initialPetData) {
      setValue('picture', initialPetData.picture);
    }
  }, [selectedFile, setValue, initialPetData?.picture]);

  const onSubmit = (data) => {
    // Handle edit pet profile submission
    if (initialPetData && !isEqual(data, initialPetData)) {
      // Prepare updated data for patch request
      const updatedData = Object.keys(data).reduce((acc, key) => {
        if (!isEqual(data[key], initialPetData[key])) {
          acc[key] = data[key];
        }
        return acc;
      }, {});

      // Send patch request to update pet profile
      patchPetProfile({
        updatedData,
        id: initialPetData.id,
        navigate,
        setSubmitStatusText,
        setIsSubmitted,
      });
    } else if (initialPetData) {
      setSubmitStatusText(
        'No changes detected. Please make changes to update.'
      );
    }

    // Handle add pet profile submission
    else {
      data['date_created'] = format(new Date(), 'MM-dd-yyyy');
      postPetProfile({ data, navigate, setIsSubmitted, setSubmitStatusText });
    }
  };

  // Open image in new window
  const openImageInNewWindow = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  const validateFile = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        return true;
      }
      return 'Unsupported file type. Please select .jpg, .jpeg, or .png file.';
    }
  };

  return (
    <div className="w-1/2 mx-auto">
      <div className="flex justify-end">
        <GoBackButton route="/admin/pet-profile/" />
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
        </Form.Group>
        {errors.type && (
          <Form.Text className="text-danger">{errors.type.message}</Form.Text>
        )}

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
          />{' '}
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

        <Form.Group controlId="picture" onChange={onFileChange}>
          <Form.Label className="font-bold mx-auto">Picture</Form.Label>
          {initialPetData ? (
            initialPetData.picture ? (
              <img
                src={initialPetData.picture}
                alt="Pet profile picture"
                className="pb-4 max-w-64 max-h-64 hover:cursor-pointer"
                onClick={() => openImageInNewWindow(initialPetData.picture)}
              />
            ) : (
              <p>No picture uploaded</p>
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
          {submitStatusText && (
            <Form.Text className={isSubmitted ? 'text-success' : 'text-danger'}>
              {submitStatusText}
            </Form.Text>
          )}
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

export default AddEditPetProfileForm;
