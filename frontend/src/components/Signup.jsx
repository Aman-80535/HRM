import React from 'react';
import { useState } from 'react';
import '../styles/SignUp.css';
import { Header } from './Header';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../redux/actions/userActions';




const SignUp = () => {

  const { signUpUserDetail, loading, error } = useSelector((state) => state.user);
  console.log(signUpUserDetail)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		contactNo: '',
		whatsappNo: '',
		email: '',
		state: '',
		referralCode: '',
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
		await dispatch(signUpUser(formData));
    
		// if (!error && user) {
		// 	console.log(user);
		// 	navigate('/user/login');
		// }
	};


	return (
		<>
			<Header />
			<div className="signup-container">
				<div className="signup-image">
					<img
						src="https://s3-alpha-sig.figma.com/img/aa53/f4c5/dadc7a66a246abeed13138d3966972ff?Expires=1738540800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Bogu6ChlVjG5C-jPq5iMRgxvHe9RXpigKwcKSIIq0S3XHoNYjmEhMI4gQ~bRo~PWgIq06XEq24PIlp1RHfOSpk8~bmdvPMDZUT~YdY2-D0njfBKS9yOPV-YIVTvMzwCKit6o0WAAP2jds1cvKGAJF4if6ofEGdb9LX2s1Wo1c3O3ifseFbIY9XIZblH6t3zz~jdjg-VPgezO8sgQwwKQ1RjEU3yVWcodTW0pwfsK7ocZY7ZmXu~Lb2Lmr0htcDknZT0O8knIrrG2RKH2JyhVuod1FXs1qeMoH7y4xKcoJbdFst~Qp-zbU3O6zu7pHeJ~ysF5kQ8MYJYlPtMi~DQz6w__"
						alt="Signup Visual"
					/>
				</div>
				<div className="signup-form">
					<h2>Sign up</h2>
					<p>Fill in your credentials and click on the Sign up button</p>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<input
								type="text"
								name="firstName"
								placeholder="First Name"
								value={formData.firstName}
								onChange={handleChange}
								required
							/>
							<input
								type="text"
								name="lastName"
								placeholder="Last Name"
								value={formData.lastName}
								onChange={handleChange}
								required
							/>
						</div>
						<input
							type="text"
							name="contactNo"
							placeholder="Contact No"
							value={formData.contactNo}
							onChange={handleChange}
						/>
						<input
							type="text"
							name="whatsappNo"
							placeholder="WhatsApp No"
							value={formData.whatsappNo}
							onChange={handleChange}
						/>
						<input
							type="email"
							name="email"
							placeholder="Email address"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<input
							type="text"
							name="state"
							placeholder="State"
							value={formData.state}
							onChange={handleChange}
						/>
						<input
							type="text"
							name="referralCode"
							placeholder="Referral Code"
							value={formData.referralCode}
							onChange={handleChange}
						/>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<input
							type="password"
							name="confirmPassword"
							placeholder="Confirm Password"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
						<div className="terms">
							<input type="checkbox" id="terms" required />
							<label htmlFor="terms" style={{
								marginLeft: "-61px",
								color: "white"
							}}>
								I agree to the <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
							</label>
						</div>
						<div className="form-buttons">
							<button type="submit" className="register-button" >{loading ? 'Registering...' : 'Register'}</button>
							{error && <div className="error">{error}</div>}
							{signUpUserDetail && <div>Signup successfully !</div>}

						</div>
					</form>
				</div >
			</div >
			<Footer />
		</>

	);
};

export default SignUp;