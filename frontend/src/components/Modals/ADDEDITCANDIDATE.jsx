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




const resumeSchema = z
  .any()
  .refine((files) => files?.[0] instanceof File, {
    message: "Resume is required",
  })
  .refine((files) => files?.[0]?.type === "application/pdf", {
    message: "Only PDF format is allowed",
  });

const phoneSchema = z
  .string()
  .refine((val) => {
    const phone = parsePhoneNumberFromString(val);
    return phone?.isValid();
  }, {
    message: "Invalid phone number",
  });




const ModalForm = ({ showModal, closeModal, userData, setShowModal, selectedEmployeeId }) => {

  const candidateSchema = z.object({
    fullName: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'e-mail is required' }),
    phoneNumber: phoneSchema,
    position: z.string().min(1, { message: 'position is required' }),
    experience: z.number().min(0, { message: 'experience is required' }),
    dateOfJoining: z
      .string()
      .min(1, { message: "Date is required" })
      .refine((val) => {
        const selectedDate = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Ignore time for today
        return selectedDate >= today;
      }, {
        message: "Date must be in the future",
      }),
    ...(selectedEmployeeId
      ? {
        department: z.string(),
      } // not required in edit
      : {
        resume: resumeSchema,
        terms: z.boolean().refine((val) => val === true, {
          message: "You must accept the terms and conditions",
        }),
      }),
  })


  const [data, setData] = useState(null);
  const [message, setMessage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const { user } = useSelector(u => u.user);
  const queryClient = useQueryClient();

  // api to fetch candidate or employee data
  const {
    data: employeeData,
    isLoading: isFetchingCandidate,
    error: candidateError,
  } = useQuery({
    queryKey: ['candidate', selectedEmployeeId],
    queryFn: () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/candidate/${selectedEmployeeId}`)
        .then((res) => res.data)
        .then(f => setData(f)),
    enabled: !!selectedEmployeeId,
    onSuccess: () => {

    },
    onError: (err) => {
      setMessage({
        type: 'error',
        text: err?.response?.data?.message || 'Failed to fetch candidate details.',
      });
    },
  });



  // Edit Employee
  const EmployeeEditMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/candidate/${selectedEmployeeId}`, data);
      return res.data;
    },
    onSuccess: () => {
      alert('Employee data  updated successfully!');
      closeModal();
      queryClient.invalidateQueries(['candidates']);
    },
    onError: (error) => {
      alert(error?.response?.data?.message || "Candidate Not updated!");
    },
  });


  // Add new candidate
  const Candidatemutation = useMutation({
    mutationFn: (data) => {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("experience", data.experience);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("position", data.position);
      formData.append("resume", data.resume[0]);
      formData.append("createdBy", user._id);

      return axios.post(`${process.env.REACT_APP_API_URL}/candidate/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
    onSuccess: (data) => {
      setMessage('User successfully created!');
      setErrorMsg(null);
      closeModal();
      queryClient.invalidateQueries(['candidates']);
    },
    onError: (error) => {
      setErrorMsg(`Error: ${error.response?.data?.message || error.message}`);
      setMessage(null);
    },
  });
  const { isLoading, error } = Candidatemutation;
  console.log("yyyyyyyyyyyyyyy", data)
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    values: data,
    resolver: zodResolver(candidateSchema),
    mode: "onChange",
  });


  console.log('watchhh', watch())
  // Handle form submission
  const onSubmit = (data) => {
    const { terms, ...formData } = data;
    if (selectedEmployeeId) {
      EmployeeEditMutation.mutate(data)
    }
    else {

      Candidatemutation.mutate(formData);
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header d-flex text-white bg-body"
          style={{ width: '100%' }}>
          <div className="modal-title mb-0  text-center " style={{ fontSize: "18px", fontWeight: "bold" }}>Add New Candidate</div>
          <div className="close-button mb-0 fw-bold" style={{ cursor: "pointer" }} onClick={closeModal}>X</div>
        </div>
        <div>
          <form className="modal-form" style={{ padding: "30px" }} onSubmit={handleSubmit(onSubmit)}>
            <div className="row mt-2" >
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                />
                <br />
                {errors.fullName && (
                  <p style={{ color: "red" }}>{errors.fullName.message}</p>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Email"
                  {...register("email")}
                />
                <br />
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="row mt-3">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Phone Number"
                  {...register("phoneNumber")}
                />
                <br />
                {errors.phoneNumber && (
                  <p style={{ color: "red" }}>{errors.phoneNumber.message}</p>
                )}
              </div>

              <div className="form-group">
                <input type="text" {...register('position')} placeholder="Position" />
                <br />
                {errors.position && (
                  <p style={{ color: "red" }}>{errors.position.message}</p>
                )}

              </div>

            </div>

            <div className="row mt-3">
              {
                !selectedEmployeeId ?
                  <div className="form-group">
                    <input
                      type="number"
                      placeholder="Experience"
                      {...register("experience", { valueAsNumber: true })}
                    />
                    <br />
                    {errors.experience && (
                      <p style={{ color: "red" }}>{errors.experience.message}</p>
                    )}
                  </div>
                  :

                  <div className="form-group">
                    <input
                      type='text'
                      placeholder="department"
                      {...register("department")}
                    />
                    <br />
                    {errors.department && (
                      <p style={{ color: "red" }}>{errors.department.message}</p>
                    )}
                  </div>
              }

              {
                selectedEmployeeId &&

                <div className="form-group">
                  <input type="date" {...register("dateOfJoining")} />

                  {errors.dateOfJoining && (
                    <p style={{ color: "red" }}>{errors.dateOfJoining.message}</p>
                  )}
                </div>

              }

            </div>



            {!selectedEmployeeId && (

              <>
                <div className="form-group">
                  <input type="file" accept="application/pdf" {...register('resume')} placeholder="Resume" />
                  {errors.resume && (
                    <p style={{ color: "red" }}>{errors.resume.message}</p>
                  )}
                </div>
                <div className="row mt-3">
                  <div className="form-group d-flex">
                    <label style={{ fontSize: "15px" }} className="d-flex">
                      <input type="checkbox" {...register('terms')} style={{ maxInlineSize: "max-content" }} className="ms-2" />
                      <span style={{ fontSize: "15px" }} className="ms-2">I accept the Terms and Conditions </span>
                    </label>
                    {errors.terms && (
                      <p style={{ color: "red" }}>{errors.terms.message}</p>
                    )}
                  </div>
                </div>

              </>
            )}
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

export default ModalForm;
