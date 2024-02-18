import HomePage from './pages/public/HomePage';
import BrowsePetsPage from './pages/auth/BrowsePetsPage';
import PetProfilePage from './pages/auth/PetProfilePage';
import SignupPage from './pages/public/SignupPage';
import LoginPage from './pages/public/LoginPage';
import ManagePetProfilesPage from './pages/admin/ManagePetProfilesPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import AddPetProfilePage from './pages/admin/AddPetProfilePage';
import AddUserPage from './pages/admin/AddUserPage';
import EditPetProfilePage from './pages/admin/EditPetProfilePage';
import EditUserPage from './pages/admin/EditUserPage';

const routes = [
  { path: '/', component: HomePage },
  { path: '/signup/', component: SignupPage },
  { path: '/login/', component: LoginPage },
  { path: '/browse-pets', component: BrowsePetsPage },
  { path: '/browse-pets/:id', component: PetProfilePage },
  { path: '/admin/pet-profiles', component: ManagePetProfilesPage },
  { path: '/admin/pet-profiles/:id', component: EditPetProfilePage },
  { path: '/admin/add-pet-profile', component: AddPetProfilePage },
  { path: '/admin/users', component: ManageUsersPage },
  { path: '/admin/users/:id', component: EditUserPage },
  { path: '/admin/add-user', component: AddUserPage },
];

export default routes;
