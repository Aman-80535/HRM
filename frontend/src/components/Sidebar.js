import React, { useState } from 'react'
import { ReactComponent as Employees } from '../assets/svgs/Employees.svg';
import { ReactComponent as Attendance } from '../assets/svgs/attendance.svg';
import { ReactComponent as Candidates } from '../assets/svgs/candidates.svg';
import { ReactComponent as Leaves } from '../assets/svgs/leaves.svg';
import { ReactComponent as Logo } from '../assets/svgs/logo.svg';
import { ReactComponent as Logout } from '../assets/svgs/logout.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { persistor } from "../redux/store";
import { logoutUser } from "../redux/slices/userSlice";
import "../styles/Dashboard.css";
import "../styles/Modal.css";
import LogoutModal from './Modals/Logout';


const Sidebar = () => {
	const [showModal, setShowModal] = useState(false);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleLogout = async () => {
		dispatch(logoutUser());
		persistor.purge();

		return navigate("/");
	};

	return (
		<>
			<LogoutModal
				show={showModal}
				onClose={() => setShowModal(false)}
				onLogout={handleLogout}
			/>

			<div className="sidebar bg-white border-end p-3">
				<div className="mb-4">
					<Logo /> <strong>LOGO</strong>
				</div>
				<ul className="list-unstyled" >
					<li className="mb-2" style={{ color: "grey" }} >Recruitment</li>
					<Link to="/candidates" className='sidebar-link'><li className="mb-2 ms-3  tabs-label d-flex gap-2"><Candidates />Candidates</li></Link>
					<li className="mb-2" style={{ color: "grey" }}>Organization</li>
					<Link to='/employees' className='sidebar-link'>
						<li className="mb-2 tabs-label  ms-3 d-flex gap-2"><Employees />Employees</li>
					</Link>
					<Link className='sidebar-link' to='/Attendance'>
						<li className="mb-2 tabs-label ms-3 d-flex gap-2"><Attendance />Attendance</li>
					</Link>
					<Link to='/leaves' className='sidebar-link'>
						<li className="mb-2 tabs-label  ms-3 d-flex gap-2"><Leaves />Leaves</li>
					</Link>

					<li className="mb-2" style={{ color: "grey" }}>Others</li>

					<li className="mt-4 d-flex gap-2  ms-3" onClick={()=>setShowModal(true)}><Logout />Logout</li>
				</ul>
			</div>
		</>)

}

export default Sidebar