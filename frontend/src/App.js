import './App.css';
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Signup';
import LogIn from './components/Login';
// import PrivateRoute from './PrivateRoute';
import Dashboard from './components/Dashboard';


const PublicRoute = ({ Component }) => {
  const token = localStorage.getItem("authToken");
  return token ? <Navigate to="/dashboard" replace /> : <Component />;
};

const PrivateRoute = ({ Component }) => {
  const token = localStorage.getItem("authToken");
  return token ? <Component /> : <LogIn />;
};





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute Component={Home} />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<PublicRoute Component={LogIn} />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} />} />
      </Routes>
    </Router>
  );
}

export default App;
