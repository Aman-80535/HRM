import { useEffect, useRef, useState } from "react";
import "../../styles/Modal.css";
import { useDispatch, useSelector } from 'react-redux';
// import { UpdateUser } from '../redux/actions/userActions';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';





const doc = z
	.any()
	.refine((files) => files?.[0]?.type === "application/pdf", {
		message: "Only PDF format is allowed",
	});


const leaveSchema = z.object({
	fullName: z.string().min(1, { message: 'Name is required' }),
	designation: z.string().min(1, { message: 'designation is required' }),
	reason: z.string().min(0, { message: 'reson is required' }),
	doc: doc,
	employee: z.string(),
	leaveDate: z.preprocess(
		(val) => val ? new Date(val) : undefined,
		z.date({ required_error: "Date is required" }).refine((val) => {
			const today = new Date();
			today.setHours(0, 0, 0, 0); // remove time part
			return val >= today;
		}, {
			message: "Date must be today or in the future",
		})
	),
})


const ADDLEAVEMODAL = ({ showModal, closeModal, userData, setShowModal, selectedEmployeeId, employeesList }) => {
	const [data, setData] = useState(null);
	const [message, setMessage] = useState(null);
	const [errorMsg, setErrorMsg] = useState(null);

	const { user } = useSelector(u => u.user);
	const queryClient = useQueryClient();


	// Add new leave
	const Leavemutation = useMutation({
		mutationFn: (data) => {
			const formData = new FormData();
			formData.append("fullName", data.fullName);
			formData.append("designation", data.designation);
			formData.append("leaveDate", data.leaveDate);
			formData.append("doc", data.doc);
			formData.append("reason", data.reason);
			formData.append("doc", data.doc[0]);
			formData.append("employee", data.employee);
			formData.append("markedBy", user._id);

			return axios.post(`${process.env.REACT_APP_API_URL}/leave`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		},
		onSuccess: (data) => {
			setMessage('Leave successfully applied!');
			setErrorMsg(null);
			closeModal();
			queryClient.invalidateQueries(['leavesList']);
		},
		onError: (error) => {
			setErrorMsg(`Error: ${error.response?.data?.message || error.message}`);
			setMessage(null);
		},
	});
	const { isLoading, error } = Leavemutation;
	console.log("yyyyyyyyyyyyyyy", data)
	const {
		register,
		handleSubmit,
		control,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		values: data,
		resolver: zodResolver(leaveSchema),
		mode: "onChange",
	});


	console.log('watchhh', watch())
	// Handle form submission
	const onSubmit = (data) => {
		const { terms, ...formData } = data;

		Leavemutation.mutate(formData);
	};

	if (!showModal) return null;
	console.log('employeesList', employeesList)


	const employeeOptions = employeesList?.map(emp => ({
		label: emp.fullName,
		value: emp.fullName,
		id: emp._id
	}));

	console.log('watch', watch())
	return (
		<div className="modal-overlay">
			<div className="modal-container">
				<div className="modal-header d-flex text-white bg-body"
					style={{ width: '100%' }}>
					<div className="modal-title mb-0  text-center " style={{ fontSize: "18px", fontWeight: "bold" }}>Add New Leave</div>
					<div className="close-button mb-0 fw-bold" style={{ cursor: "pointer" }} onClick={closeModal}>X</div>
				</div>
				<div>
					<form className="modal-form" style={{ padding: "30px" }} onSubmit={handleSubmit(onSubmit)}>
						<div className="row mt-2" >
							<div className="form-group">
								<Select
									options={employeeOptions}
									onChange={(selected) => {
										setValue('fullName', selected.value);
										setValue('employee', selected.id);
									}}
									placeholder="Enter name"
									className="basic-single"
									classNamePrefix="select"
									isSearchable
								/>
								<br />
								{errors.fullName && (
									<p style={{ color: "red" }}>{errors.fullName.message}</p>
								)}
							</div>
							<div className="form-group">
								<input
									type="text"
									placeholder="Designation"
									{...register("designation")}
								/>
								<br />
								{errors.designation && (
									<p style={{ color: "red" }}>{errors.designation.message}</p>
								)}
							</div>
						</div>

						<div className="row mt-3">
							<div className="form-group">
								<input type="date" {...register("leaveDate")} />

								{errors.leaveDate && (
									<p style={{ color: "red" }}>{errors.leaveDate.message}</p>
								)}
							</div>


							<div className="form-group">
								<input type="file" accept="application/pdf" {...register('doc')} placeholder="doc" />
								{errors.doc && (
									<p style={{ color: "red" }}>{errors.doc.message}</p>
								)}
							</div>

						</div>

						<div className="row mt-3">

							<div className="form-group">
								<input
									type="reason"
									placeholder="Reason"
									{...register("reason")}
								/>
								<br />
								{errors.reason && (
									<p style={{ color: "red" }}>{errors.reason.message}</p>
								)}
							</div>

						</div>


						{(error || errorMsg) && <p className="text-danger">{error?.message || errorMsg}</p>}
						<div className=" submit-btn text-center mt-4">
							<button type="submit" style={{ backgroundColor: "#c8c9cd", alignSelf: "anchor-center", borderRadius: "2rem" }} className="save-button ">
								{isLoading ? "Saving..." : "Save"}
							</button>
						</div>



					</form>
				</div>
			</div>
		</div>
	);
};

export default ADDLEAVEMODAL;
