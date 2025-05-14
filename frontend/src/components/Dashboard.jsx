// App.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../redux/slices/userSlice";
import { ReactComponent as Mails } from '../assets/svgs/mails.svg';
import { ReactComponent as Search } from '../assets/svgs/search.svg';
import { ReactComponent as Notifications } from '../assets/svgs/Notification.svg';
import ADDEDITCANDIDATE from "./Modals/ADDEDITCANDIDATE";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from "axios";
import { persistor } from "../redux/store";
import CommonTable from "./common/Table";
import { useDebounce } from "../hooks/useDebounce ";
import Sidebar from "./Sidebar";



const StatusArray = [
	{ value: 'scheduled', label: 'Schedule' },
	{ value: 'ongoing', label: 'Ongoing' },
	{ value: 'selected', label: 'Selected' },
	{ value: 'rejected', label: 'Rejected' }
];


const Dashboard = () => {
	const [showModal, setShowModal] = useState(false);
	const [filters, setFilters] = useState({
		search: '',
		status: '',
		role: '',
	});

	const debouncedFilters = useDebounce(filters);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ['candidates', debouncedFilters],
		queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}/candidate/list`, { params: debouncedFilters }).then(res => res.data),
		keepPreviousData: true,
	});

	const queryClient = useQueryClient();

	// update status api
	const mutation = useMutation({
		mutationFn: async ({ candidateId, data }) => {
			const res = await axios.patch(`${process.env.REACT_APP_API_URL}/candidate/updatestatus/${candidateId}`, data);
			return res.data;
		},
		onSuccess: () => {
			alert('Candidate status updated successfully!');
			queryClient.invalidateQueries({ queryKey: ['candidates'] });
			queryClient.invalidateQueries({ queryKey: ['employees'] });
		},
		onError: (error) => {
			alert(error?.response?.data?.message || "Status Not updated!");
		},
	});

	const handleStatusChange = (candidateId, status) => {
		mutation.mutate({ candidateId, data: { status } });
	}

	const deleteMutation = useMutation({
		mutationFn: async (candidateId) => {
			const res = await axios.delete(`${process.env.REACT_APP_API_URL}/candidate/${candidateId}`);
			return res.data;
		},
		onSuccess: () => {
			alert('Candidate deleted successfully!');
			queryClient.invalidateQueries(['candidates']);
		},
		onError: (error) => {
			alert(error?.response?.data?.message || 'Failed to delete candidate');
		},
	});

	const handleDelete = (candidateId) => {
		const confirmed = window.confirm('Are you sure you want to delete this candidate?');
		if (confirmed) {
			deleteMutation.mutate(candidateId);
		}
	};



	const handleLogout = async () => {
		dispatch(logoutUser());
		persistor.purge();

		return navigate("/");
	};

	const handleDownload = (fileUrl) => {
		if (!fileUrl) {
			alert("File URL is missing");
			console.error("Missing fileUrl:", fileUrl);
			return;
		}

		const base = process.env.REACT_APP_API_URL;

		const normalizedUrl = fileUrl.replace(/\\/g, '/');
		const fullUrl = `${base.replace(/\/$/, '')}/${normalizedUrl.replace(/^\//, '')}`;

		window.open(fullUrl, '_blank'); // Open in new tab
	};


	const columns = [
		{ key: 'srNo', label: 'Sr no.' },
		{ key: 'fullName', label: 'Candidates Name' },
		{ key: 'email', label: 'Email Address' },
		{ key: 'phoneNumber', label: 'Phone Number' },
		{ key: 'position', label: 'Position' },
		{
			key: 'status',
			label: 'Status',
			renderCell: (value, row) => (
				<select className="form-select form-select-sm" defaultValue={value} onChange={(e) => handleStatusChange(row._id, e.target.value)}>
					{StatusArray.map(i =>
						<option value={i.value}>{i.label.charAt(0) + i.label.slice(1, i.length)}</option>
					)}
				</select>
			),
		},
		{
			key: 'experience',
			label: 'Experience',
			renderCell: (value) => <>{value}+</>,
		},
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
							<a className="dropdown-item" onClick={(e) => handleDownload(row.resume, row.fullName + "_resume")}>
								Download Resume
							</a>
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

			<ADDEDITCANDIDATE showModal={showModal} closeModal={closeModal} setShowModal={setShowModal} />
			<div className="d-flex dashboard-main">
				{/* Sidebar */}
				<Sidebar />


				<div className="p-4 px-3 w-100">
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h5 className="fw-bold">Candidates</h5>
						<div className="border-start-0 gap-3 px-3">

							<Mails />
							<Notifications />
							<img src="" className="border-3" />
						</div>
					</div>

					<div className="d-flex flex-wrap align-items-end justify-content-between mb-3 gap-3">

						<div className="d-flex gap-2">
							<select className="form-select w-auto border-line border-style" onChange={(e) => setFilters(p => ({ ...p, status: e.target.value }))}>
							<option value="" disabled selected>Status</option>
								<option value=''>All</option>
								{StatusArray.map(i =>
									<option value={i.value}>{i.label.charAt(0) + i.label.slice(1, i.length)}</option>
								)}

							</select>
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
							<div style={{ background: "#4D007D" }} className=" border-line">

								<button className="btn main-theme-color text-white" onClick={openModal}>Add Candidate</button>
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

export default Dashboard;
