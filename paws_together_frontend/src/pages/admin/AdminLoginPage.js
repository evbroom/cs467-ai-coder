import LoginForm from '../../components/forms/LoginForm';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const adminOnSubmit = (data) => {
    console.log(data);
    // upon successful login, redirect to admin dashboard
    navigate('/admin/dashboard');
  };
  return (
    <div>
      <LoginForm onSubmit={adminOnSubmit} isAdmin={true} />
    </div>
  );
};
export default AdminLoginPage;
