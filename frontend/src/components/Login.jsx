import React from 'react';
import { useState, useEffect } from 'react';
import '../styles/Login.css';
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
		await dispatch(LogInUser(formData));
		if (user) {
			navigate('/dashboard');
		}
		console.log("dwdwqd",error)
	};


	return (
		<>

			<div className="container py-5">
				<div className="row shadow rounded overflow-hidden main-login">
					{/* Left Section */}
					<div className="col-md-6 left-section d-flex flex-column justify-content-center text-white p-4" style={{ backgroundColor: "#4B0082", borderRadius: "15px 0 0 15px" }}>
						<img
							src="https://via.placeholder.com/400x250.png?text=Dashboard+Image"
							alt="Dashboard preview"
							className="img-fluid rounded"
						/>
						<h5 className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h5>
						<p className="mt-2">
							Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
						</p>
						<div className="d-flex gap-2 mt-2">
							<span className="bg-white rounded-circle" style={{ width: "10px", height: "10px" }}></span>
							<span className="bg-light rounded-circle" style={{ width: "10px", height: "10px" }}></span>
							<span className="bg-light rounded-circle" style={{ width: "10px", height: "10px" }}></span>
						</div>
					</div>

					<div className="col-md-6 right-section bg-white p-4 px-5" style={{ borderRadius: "0 15px 15px 0" }}>
						<h4 className="mb-4">Welcome to Dashboard</h4>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label className="form-label" >Email Address*</label>
								<input value={formData.email}
									onChange={handleChange}
									required type="email" className="form-control" name="email" placeholder="Email address" />
							</div>
							<div className="mb-3">
								<label className="form-label"

									required>Password*</label>
								<input type="password" className="form-control" value={formData.password} name="password"
									onChange={handleChange} placeholder="Password" />
							</div>
							<button type="submit" className="btn text-white rgr-btn" style={{ backgroundColor: "#4B0082", borderRadius: "20px", }}>
								{loading ? 'Logging...' : 'Login'}
							</button>
							<p style={{color: "grey", cursor:"pointer"}} className='mt-2'>Forgot Password</p>
							{error && <div className="error" style={{ color: "red" }}>{error}</div>}
							<p className="text-center mt-3">
								Not having any account? <a href="user/signup" className='lgn-btn'><span style={{color: "#4D007D"}}>Register</span></a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>

	);
};

export default LogIn;