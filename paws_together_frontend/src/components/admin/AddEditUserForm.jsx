import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { isEqual } from 'lodash';
import { postUser, patchUser } from '../../utils/adminUserApi';
import { useAuth } from '../../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import GoBackButton from '../../components/common/GoBackButton';

/**
 * Add and edit user form
 *
 * @returns {JSX.Element} - Add and edit user form.
 */
const AddEditUserForm = ({ initialUserData }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: initialUserData ? initialUserData : {},
  });
  const navigate = useNavigate();
  const [submitStatusText, setSubmitStatusText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { authToken } = useAuth();

  const onSubmit = (data) => {
    if (initialUserData && !isEqual(data, initialUserData)) {
      // Patch user data
      patchUser(data);
    }
    return (
      <div className="w-1/4 mx-auto">
        <div className="flex justify-end">
          <GoBackButton route="/admin/users/" />
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
            <Button type="submit" variant="dark" className="w-1/2">
              {initialUserData ? 'Update' : 'Add'}
            </Button>
          </div>
        </Form>
      </div>
    );
  };
};

export default AddEditUserForm;
