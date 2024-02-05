import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../utils/api';
import { useDispatch } from 'react-redux';
import { login } from '../../slices/loginStatusSlice';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9I7fb3MwnuW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await postLogin(data);
    if (response.ok) {
      console.log('User logged in successfully');
      // Store user login status
      // TODO: get user role ? (e.g. admin or user)
      dispatch(login(data.username));
      navigate('/');
    } else {
      // Handle error (e.g. display error message to user)
      console.log('User login failed');
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
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

          <Button className="w-full" variant="dark" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
