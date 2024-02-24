import AdminUserForm from '../../../components/forms/AdminUserForm';
import { getUserById } from '../../../utils/adminUserApi';
import { useAuth } from '../../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const EditUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  useEffect(() => {
    getUserById({ authToken, userId: id, setUser, setError });
  }, [id]);

  return (
    <div className="container my-6 space-y-4">
      <h1 className="text-center">Edit User</h1>
      {user ? (
        <AdminUserForm initialUserData={user} />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <p className="loading">Fetching User Data</p>
      )}
    </div>
  );
};
export default EditUserPage;
