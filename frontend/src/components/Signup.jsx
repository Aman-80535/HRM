import React from 'react';
import { useState } from 'react';
import '../styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../redux/actions/userActions';
import { Link } from 'react-router-dom';




const SignUp = () => {

	const { signUpUserDetail, loading, error } = useSelector((state) => state.user);
	console.log(signUpUserDetail)
	const [formData, setFormData] = useState({
		fullName: "",
		email: '',
		password: '',
		confirmPassword: ''
	});

	const dispatch = useDispatch();


	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.confirmPassword) {
			alert('confirm password must be same as password')
			return;
		}
		await dispatch(signUpUser(formData));

		// if (!error && user) {
		// 	console.log(user);
		// 	navigate('/user/login');
		// }
	};


	return (
		<>

			<div className="container py-5">
				<div className="row shadow rounded overflow-hidden">
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
								<label className="form-label" >Full name*</label>
								<input type="text" value={formData.fullName}
									onChange={handleChange}
									required className="form-control" name="fullName" placeholder="Full name" />
							</div>
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
							<div className="mb-3">
								<label className="form-label"
									required>Confirm Password*</label>
								<input value={formData.confirmPassword}
									onChange={handleChange} required type="password" name="confirmPassword" className="form-control" placeholder="Confirm password" />
							</div>
							<button type="submit" className="btn text-white rgr-btn" style={{ backgroundColor: "#4B0082", borderRadius: "20px", }}>
								{loading ? 'Registering...' : 'Register'}
							</button>
							{error && <div className="error" style={{ color: "red" }}>{error}</div>}
							{signUpUserDetail && <div>Signup successfully !</div>}
							<p className="text-center mt-3">
								Already have an account? <Link to="/user/login" className='lgn-btn'>Login</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</>

	);
};

export default SignUp;