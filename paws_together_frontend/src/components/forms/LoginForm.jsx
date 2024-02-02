import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/9I7fb3MwnuW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

const url = 'dummy-url';

const LoginForm = ({ isAdmin, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="mx-auto max-w-sm space-y-6">
      <div className="space-y-2 text-center">
        {isAdmin ? (
          <h1 className="text-3xl font-bold">Admin Login</h1>
        ) : (
          <h1 className="text-3xl font-bold">Login</h1>
        )}
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Form.Group controlId="username">
              <Form.Label>Usernme</Form.Label>
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
            Sign Up
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
