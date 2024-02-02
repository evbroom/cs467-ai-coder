import HomePage from './pages/public/HomePage';
import UserLoginPage from './pages/public/UserLoginPage.js';
import UserSignupPage from './pages/public/UserSignupPage.js';
import BrowsePetsPage from './pages/public/BrowsePetsPage.js';
import AdminLoginPage from './pages/admin/AdminLoginPage.js';
import AdminPage from './pages/admin/AdminPage.js';
import CreatePetProfilePage from './pages/admin/CreatePetProfilePage.js';
import ManagePetProfilesPage from './pages/admin/ManagePetProfilesPage.js';
import ManageUsersPage from './pages/admin/ManageUsersPage.js';

const publicRoutes = [
  { path: '/', exact: true, component: HomePage },
  { path: '/browse-pets', component: BrowsePetsPage },
];

const userRoutes = [
  { path: '/signup', component: UserSignupPage },
  { path: '/login', component: UserLoginPage },
];

const adminRoutes = [
  { path: '/admin-login', component: AdminLoginPage },
  { path: '/admin', component: AdminPage },
  { path: '/create-pet-profile', component: CreatePetProfilePage },
  { path: '/manage-pet-profiles', component: ManagePetProfilesPage },
  { path: '/manage-users', component: ManageUsersPage },
];

export { publicRoutes, userRoutes, adminRoutes };
