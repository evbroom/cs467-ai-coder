import HomePage from './pages/public/HomePage';
import BrowsePetsPage from './pages/public/BrowsePetsPage';
import SignupPage from './pages/auth/SignupPage';
import LoginPage from './pages/auth/LoginPage';
import ManagePetProfilesPage from './pages/admin/ManagePetProfilesPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';

const routes = [
  { path: '/', exact: true, component: HomePage },
  { path: '/browse-pets', component: BrowsePetsPage },
  { path: '/signup/', component: SignupPage },
  { path: '/login/', component: LoginPage },
  { path: '/admin/pet-profiles', component: ManagePetProfilesPage },
  { path: '/admin/users', component: ManageUsersPage },
];

export default routes;
// Path: paws_together_frontend/src/App.js
