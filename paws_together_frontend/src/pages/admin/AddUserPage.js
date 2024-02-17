import AddUserForm from '../../components/admin/AddUserForm';
import GoBackButton from '../../components/common/GoBackButton';

const AddUserPage = () => {
  return (
    <div className="container">
      <h1 className="text-center py-6 ">Add a User</h1>
      <div className="flex justify-end">
        <GoBackButton route="/admin/pet-profiles/" />
      </div>
      <div className="mx-auto">
        <AddUserForm />
      </div>
    </div>
  );
};
export default AddUserPage;
