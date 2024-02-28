import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { patchUser } from '../../utils/adminApi';
import { postUserSignup } from '../../utils/api';
import LinkButton from '../common/LinkButton';

const AdminUserForm = ({ initialUserData = {} }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: initialUserData,
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const isAddForm = Object.keys(initialUserData).length === 0;
  const [isRequesting, setIsRequesting] = useState(false);

  const onSubmit = async (user) => {
    if (isAddForm) {
      // Handle add user data
      if (!isRequesting) {
        setIsRequesting(true);
        await postUserSignup(user, navigate, setError);
      }
      setIsRequesting(false);
    } else {
      // Handle edit user data
      if (!isRequesting) {
        setIsRequesting(true);
        const userId = initialUserData.id;
        await patchUser(userId, user, navigate, setError);
      }
      setIsRequesting(false);
    }
  };

  return (
    <div className="w-3/4 lg:w-1/2 mx-auto">
      <div className="flex justify-end">
        <LinkButton route="/admin/users/" text="Go Back" />
      </div>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Form.Group controlId="username">
          <Form.Label className="font-bold mx-auto">Username</Form.Label>
          <Form.Control
            type="text"
            {...register('username', { required: 'Username is required.' })}
          />
        </Form.Group>
        {isAddForm && (
          <Form.Group controlId="password">
            <Form.Label className="font-bold mx-auto">Password</Form.Label>
            <Form.Control
              type="password"
              {...register('password', {
                required: 'Password is required.',
              })}
            />
          </Form.Group>
        )}
        <Form.Group controlId="email">
          <Form.Label className="font-bold mx-auto">Email</Form.Label>
          <Form.Control
            type="email"
            {...register('email', {
              required: 'Email is required.',
            })}
          />
        </Form.Group>
        <div className="flex justify-center">
          {error && <Form.Text className="text-danger">{error}</Form.Text>}
        </div>
        <div className="flex justify-center">
          <Button type="submit" variant="dark" className="w-1/2">
            {isAddForm ? 'Add' : 'Update'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminUserForm;
