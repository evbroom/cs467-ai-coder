import AdminUserForm from '../../../components/forms/AdminUserForm';
import { getUserById } from '../../../utils/adminApi';
import { useAuth } from '../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const EditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) navigate('/login');
    getUserById(id, setUser, setError);
  }, [id, authToken]);

  return (
    <div className="container my-6 space-y-4">
      <h1 className="text-center">Edit User</h1>
      {user ? (
        <AdminUserForm initialUserData={user} />
      ) : error ? (
        <div className="container justify-items-center">
          <Alert variant="danger">{error}</Alert>
        </div>
      ) : (
        <div className="container justify-items-center">
          <p className="loading">Fetching User Data</p>
        </div>
      )}
    </div>
  );
};
export default EditUserPage;
