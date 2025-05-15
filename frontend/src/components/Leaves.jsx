// App.js
import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as Mails } from '../assets/svgs/mails.svg';
import { ReactComponent as Search } from '../assets/svgs/search.svg';
import { ReactComponent as DocsIcon } from '../assets/svgs/document-icon.svg';
import { ReactComponent as Notifications } from '../assets/svgs/Notification.svg';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import axios from "axios";
import CommonTable from "./common/Table";
import { useDebounce } from "../hooks/useDebounce ";
import Sidebar from "./Sidebar";
import ADDLEAVEMODAL from "./Modals/ADDLEAVEMODAL";
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';




const Leaves = () => {
	const { loading, user } = useSelector((state) => state.user);
	const [usersList, setUsersList] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedCalenderDate, setselectedCalenderDate] = useState(new Date());


	const [selectedEmployee, setSelectedEmployee] = useState(null);
	const [selectedDateLeaves, setSeletedDateLeaves] = useState([]);
	const [filters, setFilters] = useState({
		search: '',
		status: '',
	});

	const debouncedFilters = useDebounce(filters);


	const { data: employeesList } = useQuery({
		queryKey: ['employees'],
		queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}/candidate/employees/list`, { params: debouncedFilters }).then(res => res.data),
		keepPreviousData: true,
	});

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedEmployee(null)
	}

	const { data: leavesList, isLoading, error } = useQuery({
		queryKey: ['leavesList', debouncedFilters],
		queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}/leave/list`, { params: debouncedFilters }).then(res => res.data),
		keepPreviousData: true,
	});

	// fetch leave counts
	const { data: leavesCountList } = useQuery({
		queryKey: ['leavesCountList', debouncedFilters],
		queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}/leave/counts/list`).then(res => res.data),
		keepPreviousData: true,
	});

	const queryClient = useQueryClient();

	// change leave status
	const changeLeaveStatus = useMutation({
		mutationFn: async ({ LeaveId, data }) => {
			const res = await axios.patch(`${process.env.REACT_APP_API_URL}/leave/updatestatus/${LeaveId}`, data);
			return res.data;
		},
		onSuccess: () => {
			alert('Leave status updated successfully!');
			queryClient.invalidateQueries(['leavesList']);
			queryClient.invalidateQueries(['leavesCountList']);
		},
		onError: (error) => {
			alert(error?.response?.data?.message || 'Failed to update status');
		},
	});

	const handleStatusChange = (LeaveId, status) => {
		const confirmed = window.confirm('Are you sure you want to change status');
		if (confirmed) {
			changeLeaveStatus.mutate(
				{ LeaveId, data: { status: status } });
		}
	};
	const getStatusColor = (status) => {
		switch (status) {
			case 'Approved':
				return 'bg-success text-white'; // Green
			case 'Rejected':
				return 'bg-danger text-white'; // Red
			case 'Pending':
				return 'bg-warning text-dark'; // Yellow
			default:
				return '';
		}
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
	console.log('leavesCountList', leavesCountList)
	useEffect(() => {
		const clickeddate = moment(selectedCalenderDate).format('YYYY-MM-DD')
		if (leavesCountList) {
			const list = leavesCountList?.data?.[clickeddate]
			setSeletedDateLeaves(list)
		}
	}, [selectedCalenderDate, leavesCountList])

	console.log('selectedDateLeaves', selectedDateLeaves)
	const columns = [
		{ key: 'profile', label: 'Profile' },
		{ key: 'fullName', label: 'Candidates Name' },
		{
			key: 'leaveDate', label: 'Date',
			renderCell: (_, row) => (

				moment(row.leaveDate).format('MM-DD-YYYY')
			)
		},
		{ key: 'reason', label: 'Phone Number' },
		{
			key: 'status',
			label: 'Status',
			renderCell: (_, row) => (
				<div className="dropdown pointer" role="button">
					<select
						className={`form-select w-auto border-line border-style text-black ${getStatusColor(row.status)}`}
						value={row.status}
						onChange={(e) => {
							handleStatusChange(row._id, e.target.value);
						}}
					>
						<option className="bg-white  text-secondary" value="Approved">Approved</option>
						<option className="bg-white text-secondary" value="Rejected">Rejected</option>
						<option className="bg-white text-secondary" value="Pending">Pending</option>
					</select>
				</div>
			),
		},
		{
			key: 'doc', label: 'Docs',
			renderCell: (_, row) => (
				<div style={{
					marginTop: "-19px",
					cursor: "pointer"
				}}>
					<DocsIcon onClick={(e) => handleDownload(row.doc, row.fullName + "_leave")} />
				</div >
			)
		},
	];
	const markedDates = leavesCountList?.data || {};


	const tileContent = ({ date, view }) => {
		if (view === 'month') {
			const dateStr = moment(date).format('YYYY-MM-DD');
			if (markedDates[dateStr]) {
				return (
					<div className="marked-date" style={{ borderRadius: "60px" }}>
						<small className="leave-count">{markedDates[dateStr].length}</small>
					</div>
				);
			}
		}
		return null;
	};
	return (
		<>
			<ADDLEAVEMODAL employeesList={employeesList?.data} showModal={showModal} closeModal={closeModal} setShowModal={setShowModal} />

			<div className="d-flex dashboard-main">
				{/* Sidebar */}
				<Sidebar />

				<div className="p-4 px-3 w-100">
					<div className="d-flex justify-content-between align-items-center mb-3">
						<h5 className="fw-bold">Leaves</h5>
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
								<option value="">All</option>
								<option value="Approved">Approved</option>
								<option value="Rejected">Rejected</option>
								<option value="Pending">Pending</option>
							</select>
							<div style={{ background: "#4D007D" }} className=" border-line border-start-0">

								<button className="btn main-theme-color text-white" onClick={openModal}>Add Leave</button>
							</div>
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
					<div className="d-flex">
						<div className="flex-grow-1 p-3">
							<div className="table-wrapper border rounded overflow-hidden">
								<CommonTable data={leavesList?.data} columns={columns} />
							</div>
						</div>
						<div
							className="p-1 table-wrapper mt-3 border rounded"
							style={{ width: "300px", height: "350px" }}
						>
							<div className="rounded-top w-100">
								<div style={{
									backgroundColor: "#4D007D",
									borderTopLeftRadius: "0.375rem", // same as Bootstrap's rounded top-left
									borderTopRightRadius: "0.375rem", // same as rounded top-right
									padding: "0.5rem 1rem",
								}}>
									<p className="text-white m-2">Leave Calendar</p>
								</div>
								<div className="overflow-auto p-2">
									<Calendar
										onChange={setselectedCalenderDate}
										value={selectedCalenderDate}
										tileContent={tileContent}
									/>
								</div>
								<div className="app-leaves mt-3">
									<h4 className="mb-3" style={{color: "#4D007D"}}>Approved Leaves</h4>
									{
										selectedDateLeaves?.map(i =>
											<div className="d-flex justify-content-between">
												<p className="fw-bold">{i.fullName}<p>{i.designation}</p></p>
												
												<p>{moment(i.leaveDate).format('DD/MM/YYYY')}</p>
											</div>
										)
									}
								</div>
							</div>

						</div>
					</div>
				</div>
			</div >
		</>

	);
};

export default Leaves;
