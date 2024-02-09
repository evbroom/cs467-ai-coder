import HomePage from './pages/public/HomePage';
import UserLoginPage from './pages/public/UserLoginPage.js';
import UserSignupPage from './pages/public/UserSignupPage.js';
import BrowsePetsPage from './pages/public/BrowsePetsPage.js';
import AdminPage from './pages/admin/AdminPage.js';
import CreatePetProfilePage from './pages/admin/CreatePetProfilePage.js';
import ManagePetProfilesPage from './pages/admin/ManagePetProfilesPage.js';
import ManageUsersPage from './pages/admin/ManageUsersPage.js';

const publicRoutes = [
  { path: '/', exact: true, component: HomePage },
  { path: '/browse-pets', component: BrowsePetsPage },
  { path: '/signup/', component: UserSignupPage },
  { path: '/login/', component: UserLoginPage },
];

const adminRoutes = [
  { path: '/admin/dashboard', component: AdminPage },
  { path: '/admin/create-pet-profile', component: CreatePetProfilePage },
  { path: '/admin/pet-profiles', component: ManagePetProfilesPage },
  { path: '/admin/users', component: ManageUsersPage },
];

export { publicRoutes, adminRoutes };
