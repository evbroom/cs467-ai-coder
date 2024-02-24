import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Form, Alert } from 'react-bootstrap';
import { postLogin } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loginError, setLoginError] = useState('');

  const onSubmit = (credentials) => {
    postLogin({
      credentials,
      navigate,
      setLoginError,
      login,
    });
  };

  /**
   * Modified the styles generated by Vercel's v0.
   * @see https://v0.dev/t/9I7fb3MwnuW
   * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
   */
  return (
    <div className="mx-auto sm:w-1/2 xl:w-1/3 ">
      <h1 className="font-bold text-center">Login</h1>
      <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        {loginError && (
          <Alert key="danger" variant="danger">
            {loginError}
          </Alert>
        )}
        <Button className="w-full" variant="dark" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
