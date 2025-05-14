import './App.css';
import '../src/index.css'
import { Home } from './components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Signup';
import LogIn from './components/Login';
// import PrivateRoute from './PrivateRoute';
import Dashboard from './components/Dashboard';
import { useSelector } from 'react-redux';
import Employees from './components/Employees';


const PublicRoute = ({ Component }) => {
  const token = useSelector(state => state.user.token);
  return token ? <Navigate to="/candidates" replace /> : <Component />;
};

const PrivateRoute = ({ Component }) => {
  const token = useSelector(state => state.user.token);
  return token ? <Component /> : <LogIn />;
};





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicRoute Component={LogIn} />} />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<PublicRoute Component={LogIn} />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/candidates" element={<PrivateRoute Component={Dashboard} />} />
        <Route path="/employees" element={<PrivateRoute Component={Employees} />} />
      </Routes>
    </Router>
  );
}

export default App;
