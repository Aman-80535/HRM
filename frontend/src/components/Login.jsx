import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/SignUp.css';
import { Header } from './Header';
import Footer from './Footer';
import { useDispatch, useSelector, } from 'react-redux';
import { LogInUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';





const LogIn = () => {
	const navigate = useNavigate();
	const { loading, error, user } = useSelector((state) => state.user);
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const dispatch = useDispatch();


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	useEffect(() => {
    if (user && !error) {
      navigate('/dashboard');
    }
  }, [user, error]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(LogInUser(formData));
	};


	return (
		<>
			<Header />
			<div className="signup-container">
				<div className="signup-image">
					<img
						src="https://s3-alpha-sig.figma.com/img/b446/e426/c9c67cae79ae3b23cea34e2f1f7c067a?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=l24ma70MoiGdC9Spg9~3s9LQQlTdKYUl83b2SZrK5DSC5NBcYGhgDjRFpVVYsasN3mU8RX8G8H0ybeftRcOPvYHa4IqMZNsJHIwD9hseEsIPQahbck1yznUhzWtFEoXuWCu7KfYkjAS55DaqbFy-n46ClRCTo8ZicBB5D7su4AJEmo66RfS8UzxehsqFdcbZOaHcBQSCvYKPTW~jHDWcwcj9Bfsxs4g~gABToNCMIIeOH-kz-BLx8eIxFMU89spnrFoVrdJdj~c5mZ-zriI1s4QBH91JcJLY8h0zXh2dHOxnX3WIkIcNTvJVPzJodpriUh1Aus4ABS6Bfyr0ceyTiQ__"
						alt="Signup Visual"
					/>
				</div>
				<div className="signup-form">
					<h2>Login</h2>
					<p>Fill in your credentials and click on the Login button</p>
					<form onSubmit={handleSubmit}>
						<input
							type="email"
							name="email"
							placeholder="Email address"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							required
						/>


						<div className="form-buttons">
							<button type="submit" className="register-button" >{loading ? 'Loggingin...' : 'Login'}</button>
							{error && <div className="error">{error}</div>}
							{user && <div>Login successfully !</div>}
						</div>
					</form>
				</div >
			</div >
			<Footer />
		</>

	);
};

export default LogIn;