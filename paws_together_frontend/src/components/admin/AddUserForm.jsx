import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const AddUserForm = () => {
  const { handleSubmit, register } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor="username" className="font-bold mx-auto">
          Username
        </Form.Label>
        <Form.Control type="text" rows={3} {...register('username')} />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="password" className="font-bold mx-auto">
          Password
        </Form.Label>
        <Form.Control type="password" rows={3} {...register('password')} />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="email" className="font-bold mx-auto">
          Email
        </Form.Label>
        <Form.Control type="email" rows={3} {...register('email')} />
      </Form.Group>
      <Button type="submit" variant="dark" className="w-full my-10">
        Submit
      </Button>
    </Form>
  );
};

export default AddUserForm;
