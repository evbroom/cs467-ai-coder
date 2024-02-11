import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import routes from './routes';
import NavBar from './components/navbar/NavBar';

function NavBarOutlet() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<NavBarOutlet />}>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                element={<route.component />}
              />
            ))}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
