import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getUsers } from '../../../utils/adminUserApi';
import UserRow from '../../../components/admin/UserRow';
import TableContainer from '../../../components/admin/TableContainer';
import LinkButton from '../../../components/common/LinkButton';

const ManageUsersPage = () => {
  const [users, setUsers] = useState({});
  const [error, setError] = useState(null);
  const { authToken } = useAuth();

  const fieldset = ['Username', 'Email'];

  useEffect(() => {
    getUsers({ authToken, setUsers, setError });
  }, [users, setUsers]);

  return (
    <div className="container my-6 space-y-2">
      <h1 className="text-center">Manage Users</h1>
      <div className="w-1/2 mx-auto">
        <div className="flex justify-end pb-2">
          <LinkButton route="/admin/add-user" text="Add New User" />
        </div>
        {users ? (
          users.length === 0 ? (
            <p>No user data...</p>
          ) : (
            <TableContainer
              fieldset={fieldset}
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
