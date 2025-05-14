// App.js
import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllUsers } from '../redux/actions/userActions';

import { ReactComponent as Mails } from '../assets/svgs/mails.svg';
import { ReactComponent as Search } from '../assets/svgs/search.svg';
import { ReactComponent as Notifications } from '../assets/svgs/Notification.svg';
import ADDEDITCANDIDATE from "./Modals/ADDEDITCANDIDATE";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from "axios";
import CommonTable from "./common/Table";
import { useDebounce } from "../hooks/useDebounce ";
import Sidebar from "./Sidebar";




const Employees = () => {
	const { loading, user } = useSelector((state) => state.user);
	const [usersList, setUsersList] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [filters, setFilters] = useState({
		search: '',
		status: '',
		role: '',
	});

	const debouncedFilters = useDebounce(filters);


	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedEmployee(null)
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ['employees', debouncedFilters],
		queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}/candidate/employees/list`, { params: debouncedFilters }).then(res => res.data),
		keepPreviousData: true,
	});

	const queryClient = useQueryClient();

	// delete employee
	const deleteMutation = useMutation({
		mutationFn: async (EmployeeId) => {
			const res = await axios.delete(`${process.env.REACT_APP_API_URL}/candidate/${EmployeeId}`);
			return res.data;
		},
		onSuccess: () => {
			alert('Candidate deleted successfully!');
			queryClient.invalidateQueries(['employees']);
		},
		onError: (error) => {
			alert(error?.response?.data?.message || 'Failed to delete candidate');
		},
	});

	const handleDelete = (EmployeeId) => {
		const confirmed = window.confirm('Are you sure you want to delete this candidate?');
		if (confirmed) {
			deleteMutation.mutate(EmployeeId);
		}
	};





	const columns = [
		{ key: 'srNo', label: 'Sr no.' },
		{ key: 'fullName', label: 'Candidates Name' },
		{ key: 'email', label: 'Email Address' },
		{ key: 'phoneNumber', label: 'Phone Number' },
		{ key: 'position', label: 'Department' },
		{
			key: 'actions',
			label: 'Action',
			renderCell: (_, row) => (
				<div className="dropdown">
					<button className="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown">
						⋮
					</button>
					<ul className="dropdown-menu">
						<li>
							<button className="dropdown-item" onClick={() => {
								setSelectedEmployee(row._id);
								setShowModal(true);
							}
							}>
								Edit
							</button>
						</li>
						<li>
							<button className="dropdown-item text-danger" onClick={() => handleDelete(row._id)} disabled={deleteMutation.isPending} >
								{deleteMutation.isPending ? 'Deleting...' : 'Delete Candidate'}
							</button>
						</li>
					</ul>
				</div>
			),
		},
	];



	return (
		<>
			<ADDEDITCANDIDATE showModal={showModal} closeModal={closeModal} setShowModal={setShowModal} selectedEmployeeId={selectedEmployee} />

			<div className="d-flex dashboard-main">
				{/* Sidebar */}
				<Sidebar />

				<div className="p-4 px-3 w-100">
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h5 className="fw-bold">Employees</h5>
						<div className="border-start-0 gap-3 px-3">

							<Mails />
							<Notifications />
							<img src="" className="border-3" />
						</div>
					</div>

					<div className="d-flex flex-wrap align-items-end justify-content-between mb-3 gap-3">
						<div className="d-flex gap-2">
							<select className="form-select w-auto border-line border-style" onChange={(e) => setFilters(p => ({ ...p, position: e.target.value }))}>
								<option value="" disabled selected>Position</option>
								<option key='all' value=''>All</option>
								{
									[...new Set(data?.data.map(d => d.position))].map((pos, ind) =>
										<option key={ind} value={pos}>{pos}</option>)
								}
							</select>
						</div>
						<div className="d-flex align-items-center gap-3  border-start-0">
							<div className="input-group border-line border-style" style={{ width: "250px" }}>
								<span className="input-group-text bg-white border-line ">
									<Search />
								</span>
								<input
									type="text"
									className="form-control border-line"
									placeholder="Search..."
									onChange={(e) => setFilters(p => ({ ...p, search: e.target.value }))}
								/>
							</div>
						</div>
					</div>

					<div className="table-wrapper border rounded overflow-hidden">
						<CommonTable data={data?.data} columns={columns} />
					</div>
				</div>
			</div>
		</>

	);
};

export default Employees;
