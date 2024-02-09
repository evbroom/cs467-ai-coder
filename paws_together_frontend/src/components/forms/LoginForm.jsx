import { useForm } from 'react-hook-form';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/loginStatusSlice';
import { useState } from 'react';

const LoginForm = () => {
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
      const response = await postLogin(data);
      if (response.status >= 200 && response.status < 300) {
        // Store user login status
        const isAdmin = response?.data?.is_admin || false;
        const payload = {
          user: data.username,
          isAdmin: isAdmin,
        };
        dispatch(login(payload));
        navigate('/');
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
   * v0 by Vercel.
   * @see https://v0.dev/t/9I7fb3MwnuW
   * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
   */
  return (
    <div className="mx-auto max-w-sm space-y-6 mt-5">
      <div>
        <h1 className="font-bold text-center">Login</h1>
      </div>
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
          {serverError && (
            <Alert key="danger" variant="danger">
              {serverError}
            </Alert>
          )}
          <Button className="w-full" variant="dark" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
