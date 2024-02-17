import { useState } from 'react';
import TableContainer from '../../components/admin/TableContainer';
import UserRow from '../../components/admin/UserRow';
import AddButton from '../../components/admin/AddButton';

const ManageUsersPage = () => {
  // Generate dummy data
  const dummyUsers = [];
  for (let i = 0; i < 15; i++) {
    const id = i + 1;
    const username = `User${i + 1}`;
    const email = `user${i + 1}@example.com`;
    dummyUsers.push({ id, username, email });
  }

  const [users, setUsers] = useState(dummyUsers);
  const userFieldset = ['Username', 'Email'];

  return (
    <div className="container my-8">
      <h1 className="text-center">Manage Users</h1>
      <div className="flex justify-end">
        <AddButton route="/admin/add/users" />
      </div>
      <TableContainer
        fieldset={userFieldset}
        data={users}
        RowComponent={UserRow}
        setData={setUsers}
      />
    </div>
  );
};
export default ManageUsersPage;
