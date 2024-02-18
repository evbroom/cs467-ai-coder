import { getUsers } from '../../utils/adminUserApi';
import { useState, useEffect } from 'react';
import TableContainer from '../../components/admin/TableContainer';
import UserRow from '../../components/admin/UserRow';
import AddButton from '../../components/admin/AddButton';
import { useAuth } from '../../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const ManageUsersPage = () => {
  // TODO: remove dummy data
  const dummyUsers = [];
  for (let i = 0; i < 15; i++) {
    const id = i + 1;
    const username = `User${i + 1}`;
    const email = `user${i + 1}@example.com`;
    dummyUsers.push({ id, username, email });
  }

  const [users, setUsers] = useState(dummyUsers);
  const [error, setError] = useState(null);
  const userFieldset = ['Username', 'Email'];
  const { authToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      // navigate('/login');
    } else {
      getUsers({
        authToken,
        setUsers,
        setError,
      });
    }
  });

  return (
    <div className="container my-6 space-y-2">
      <h1 className="text-center">Manage Users</h1>
      <div className="w-1/2 mx-auto">
        <div className="flex justify-end pb-2">
          <AddButton route="/admin/add-user" />
        </div>
        {users ? (
          users.length === 0 ? (
            <p>No user data...</p>
          ) : (
            <TableContainer
              fieldset={userFieldset}
              data={users}
              RowComponent={UserRow}
              setData={setUsers}
            />
          )
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <p className="loading">Fetching users</p>
        )}
      </div>
    </div>
  );
};
export default ManageUsersPage;
