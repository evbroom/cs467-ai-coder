import HomePage from './pages/public/HomePage';
import BrowsePetsPage from './pages/auth/BrowsePetsPage';
import PetProfilePage from './pages/auth/PetProfilePage';
import SignupPage from './pages/public/SignupPage';
import LoginPage from './pages/public/LoginPage';
import ManagePetProfilesPage from './pages/admin/petProfiles/ManagePetProfilesPage';
import AddPetProfilePage from './pages/admin/petProfiles/AddPetProfilePage';
import EditPetProfilePage from './pages/admin/petProfiles/EditPetProfilePage';
import ManageUsersPage from './pages/admin/users/ManageUsersPage';
import AddUserPage from './pages/admin/users/AddUserPage';
import EditUserPage from './pages/admin/users/EditUserPage';

export const routes = [
  { path: '/', component: HomePage },
  { path: '/signup/', component: SignupPage },
  { path: '/login/', component: LoginPage },
  { path: '/browse-pets', component: BrowsePetsPage },
  { path: '/browse-pets/:id', component: PetProfilePage },
];

export const adminRoutes = [
  { path: '/admin/pet-profiles', component: ManagePetProfilesPage },
  { path: '/admin/pet-profiles/:id', component: EditPetProfilePage },
  { path: '/admin/add-pet-profile', component: AddPetProfilePage },
  { path: '/admin/users', component: ManageUsersPage },
  { path: '/admin/users/:id', component: EditUserPage },
  { path: '/admin/add-user', component: AddUserPage },
];
