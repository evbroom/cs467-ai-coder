import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { isEqual } from 'lodash';
import { postUser, patchUser } from '../../utils/adminUserApi';
import { useAuth } from '../../contexts/AuthContext';
import LinkButton from '../common/LinkButton';

/**
 * Add and edit user form
 *
 * @returns {JSX.Element} - Add and edit user form.
 */
const AdminUserForm = ({ initialUserData }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: initialUserData ? initialUserData : {},
  });
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [error, setError] = useState('');

  const onSubmit = (data) => {
    if (initialUserData && !isEqual(data, initialUserData)) {
      // Handle edit user data
      patchUser({
        user: data,
        userId: initialUserData.id,
        authToken,
        navigate,
        setError,
      });
    } else if (initialUserData) {
      // Handle add user data no change
      setError('No changes detected. Please make changes to update.');
    } else {
      // Handle add user data
      postUser({ user: data, authToken, navigate, setError });
    }
  };

  return (
    <div className="w-1/4 mx-auto">
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
        <Form.Group controlId="password">
          <Form.Label className="font-bold mx-auto">Password</Form.Label>
          <Form.Control
            type="password"
            {...register('password', {
              required: 'Password is required.',
            })}
          />
        </Form.Group>
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
          <Button type="submit" variant="dark" className="w-1/2">
            {initialUserData ? 'Update' : 'Add'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AdminUserForm;
