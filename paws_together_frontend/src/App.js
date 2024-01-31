import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
