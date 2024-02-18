import HomePage from './pages/public/HomePage';
import BrowsePetsPage from './pages/public/BrowsePetsPage';
import PetProfilePage from './pages/public/PetProfilePage';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import ManagePetProfilesPage from './pages/admin/ManagePetProfilesPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import AddPetProfilePage from './pages/admin/AddPetProfilePage';
import AddUserPage from './pages/admin/AddUserPage';
import EditPetProfilePage from './pages/admin/EditPetProfilePage';
import EditUserPage from './pages/admin/EditUserPage';

const routes = [
  { path: '/', exact: true, component: HomePage },
  { path: '/browse-pets', component: BrowsePetsPage },
  { path: '/browse-pets/:id', component: PetProfilePage },
  { path: '/signup/', component: SignupPage },
  { path: '/login/', component: LoginPage },
  { path: '/admin/pet-profiles', component: ManagePetProfilesPage },
  { path: '/admin/pet-profiles/:id', component: EditPetProfilePage },
  { path: '/admin/users', component: ManageUsersPage },
  { path: 'admin/users/:id', component: EditUserPage },
  { path: '/admin/add-pet-profile', component: AddPetProfilePage },
  { path: '/admin/add-user', component: AddUserPage },
];

export default routes;
// Path: paws_together_frontend/src/App.js
