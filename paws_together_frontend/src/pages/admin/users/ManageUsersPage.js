import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getUsers } from '../../../utils/adminApi';
import UserRow from '../../../components/admin/UserRow';
import TableContainer from '../../../components/admin/TableContainer';
import LinkButton from '../../../components/common/LinkButton';
import { useNavigate } from 'react-router-dom';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const fieldset = ['Username', 'Email', 'Edit', 'Delete'];

  useEffect(() => {
    if (!authToken) navigate('/login');
    getUsers(setUsers, setError);
  }, [authToken]);

  return (
    <div className="my-6 space-y-2 mx-auto">
      <h1 className="text-center">Manage Users</h1>
      <div className="container">
        <div className="flex justify-center pb-2">
          <LinkButton route="/admin/add-user" text="Add New" />
        </div>
        {users ? (
          users.length === 0 ? (
            <div className="container justify-items-center">
              <p>No user data found.</p>
            </div>
          ) : (
            <TableContainer
              fieldset={fieldset}
              data={users}
              RowComponent={UserRow}
              setData={setUsers}
            />
          )
        ) : error ? (
          <div className="container justify-items-center">
            <p className="text-danger">{error}</p>
          </div>
        ) : (
          <div className="container justify-items-center">
            <p className="loading">Fetching users</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ManageUsersPage;
