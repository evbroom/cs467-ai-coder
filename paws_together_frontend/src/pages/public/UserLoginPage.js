import LoginForm from '../../components/forms/LoginForm';
import { useNavigate } from 'react-router-dom';

const UserLoginPage = () => {
  const navigate = useNavigate();

  const userOnSubmit = (data) => {
    console.log(data);
    navigate('/'); // Redirect to home page after successful login
  };
  return (
    <div>
      <LoginForm onSubmit={userOnSubmit} isAdmin={false} />
    </div>
  );
};
export default UserLoginPage;
