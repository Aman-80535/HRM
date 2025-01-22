// App.js
import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUsers } from '../redux/actions/userActions';
import { logoutUser } from "../redux/slices/userSlice";
import ModalForm from "./ModalForm";




const Dashboard = () => {
	const { loading, error, user } = useSelector((state) => state.user);
	const [usersList, setUsersList] = useState([]);
	const [errorr, setErrorr] = useState(null);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [filteredData, setFilteredData] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const openModal = (user) => {
		setSelectedUser(user);
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	}



	useEffect(() => {
		if (searchKeyword === "") {
			setFilteredData(usersList);
		} else {
			if (usersList.length > 0) {
				console.log(Object.values(usersList[0]));
			}


			const filtereduserslist = usersList.filter((item) => {
				if (searchKeyword === "") {
					return item;
				} else if (
					item.firstName
						.toLocaleLowerCase()
						.includes(searchKeyword.toLocaleLowerCase()) ||
					item.email
						.toLocaleLowerCase()
						.includes(searchKeyword.toLocaleLowerCase())
				) {
					return item;
				}
			})

			setFilteredData(filtereduserslist)

		}
	}, [searchKeyword, usersList]);


	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const data = await dispatch(GetAllUsers());
				if (data) {
					setUsersList(data.payload.data);
				}
			} catch (err) {
				setErrorr('Failed to fetch users. Please try again later.');
				console.error('Error fetching users:', err);
			}
		};
		if(!showModal){
		fetchUsers();
		}
	}, [showModal]);

	const handleLogout = async () => {
		await localStorage.removeItem("authToken");
		dispatch(logoutUser())

		return navigate("/");
	};

	return (
		<>
			<div className="dashboard-container">
				<div className="sidebar">
					<ul>
						<li>User List</li>
						<li>Transaction List</li>
						<li>Video Management</li>
						<li>Top Receivers List</li>
						<li className="logout" onClick={handleLogout}>Logout</li>
					</ul>
				</div>
				<div className="main-content">
					<header>
						<h1>Dashboard</h1>
						<p>01 - 25 March, 2023</p>
						<div className="chart-placeholder"></div>
					</header>
					<section className="user-list">
						{error && <div className="error-message">{error}</div>}
						<h2>User List</h2>
						<div className="search-bar">
							<input type="text" placeholder="Search..." value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
							<button>🔍</button>
						</div>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Status</th>
									<th>View</th>
								</tr>
							</thead>
							<tbody>
								{usersList && (usersList.length > 0) ? (
									(searchKeyword?.length > 0 ? filteredData : usersList).map((user, index) => (
										<tr key={index}> {/* Always add a unique key to each element */}
											<td>{user.firstName}</td>
											<td>{user.email}</td>
											<td>{user.contactNumber}</td>
											<td>{user.paymentStatus ? "Accept" : "Reject"}</td>
											<td><button className="view-button" onClick={() => openModal(user)}>View</button></td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan="5" style={{ textAlign: 'center' }}>No users found</td>
									</tr>
								)}
							</tbody>
						</table>
					</section>
				</div>
				<div>
					<ModalForm
						showModal={showModal}
						closeModal={closeModal}
						userData={selectedUser}
						setShowModal ={setShowModal}
					/>
				</div>

			</div>
		</>

	);
};

export default Dashboard;
