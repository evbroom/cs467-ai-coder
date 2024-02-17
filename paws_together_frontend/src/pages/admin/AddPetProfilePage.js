import AddPetProfileForm from '../../components/admin/AddPetProfileForm';
import GoBackButton from '../../components/common/GoBackButton';

const AddPetProfilePage = () => {
  return (
    <div className="container">
      <h1 className="text-center py-6 ">Add a Pet Profile</h1>
      <div className="flex justify-end">
        <GoBackButton route="/admin/pet-profiles/" />
      </div>
      <div className="mx-auto">
        <AddPetProfileForm />
      </div>
    </div>
  );
};
export default AddPetProfilePage;
