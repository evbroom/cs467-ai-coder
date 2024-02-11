import { useForm } from 'react-hook-form';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { postUserSignup } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/loginStatusSlice';
import { useState } from 'react';

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data) => {
    try {
      const response = await postUserSignup(data);
      if (response.status >= 200 && response.status < 300) {
        // Store user login status
        dispatch(login(data.username));
        navigate('/');
      } else if (response.status === 400) {
        setServerError('Username or email already exists. Please try again.');
        return;
      } else {
        setServerError('Server error. Please try again.');
        return;
      }
    } catch (error) {
      setServerError('Server error. Please try again.');
      return;
    }
  };

  /**
   * Modified the styles generated by Vercel's v0.
   * @see https://v0.dev/t/9I7fb3MwnuW
   * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
   */
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              {...register('username', { required: 'Username is required.' })}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </Form.Group>
        </div>
        <div className="space-y-2">
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              {...register('password', { required: 'Password is required.' })}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </Form.Group>
        </div>
        <div className="space-y-2">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              {...register('email', { required: 'Email is required.' })}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </Form.Group>
        </div>
        {serverError && (
          <Alert key="danger" variant="danger">
            {serverError}
          </Alert>
        )}
        <Button className="w-full" variant="dark" type="submit">
          Sign Up
        </Button>
      </div>
    </Form>
  );
};

export default SignupForm;