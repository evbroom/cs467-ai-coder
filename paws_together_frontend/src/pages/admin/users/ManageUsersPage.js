import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { getUsers } from '../../../utils/adminApi';
import UserRow from '../../../components/admin/UserRow';
import TableContainer from '../../../components/admin/TableContainer';
import { useNavigate } from 'react-router-dom';
import LinkButton from '../../../components/common/LinkButton';

const ManageUsersPage = () => {
  const [users, setUsers] = useState(null);
  const [fetchError, setFetchError] = useState('');
  const { authToken } = useAuth();
  const navigate = useNavigate();
  const fieldset = ['Username', 'Email', 'Actions'];

  useEffect(() => {
    if (!authToken) navigate('/login');
    getUsers(setUsers, setFetchError);
  }, [authToken]);

  return (
    <div className="my-6 space-y-2 mx-auto">
      {users ? (
        <div className="flex justify-center mx-auto">
          <TableContainer
            title="User Data"
            fieldset={fieldset}
            data={users}
            RowComponent={UserRow}
            setData={setUsers}
            linkButton={
              <LinkButton route="/admin/add-user" text="Add a New User" />
            }
          />
        </div>
      ) : fetchError ? (
        <div className="flex justify-center mx-auto">
          <p className="text-danger">{fetchError}</p>
        </div>
      ) : (
        <div className="flex justify-center mx-auto">
          <p className="loading">Fetching user data</p>
        </div>
      )}
    </div>
  );
};
export default ManageUsersPage;
