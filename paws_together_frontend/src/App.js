import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { routes, adminRoutes } from './routes';
import NavBar from './components/navbar/NavBar';
import { useAuth } from './contexts/AuthContext';

function NavBarOutlet() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

function App() {
  const { isAdmin } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBarOutlet />}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
            {isAdmin &&
              adminRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
