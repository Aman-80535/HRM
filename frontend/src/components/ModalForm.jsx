import React, { useState, useEffect } from "react";
import "../styles/Modal.css";
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser } from '../redux/actions/userActions';



const ModalForm = ({ showModal, closeModal, userData, setShowModal }) => {

  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    firstName: "",
    email: "",
    contactNumber: "",
    referrelCode: "",
    businessPromoters: "",
    businessIncome: "",
    status: false,
    paymentStatus: false,
  });

  // Sync formValues with userData when the modal opens or userData changes
  useEffect(() => {
    console.log(userData ,"dew")
    if (userData) {
      setFormValues({
        firstName: userData.firstName || "",
        email: userData.email || "",
        contactNumber: userData.contactNumber || "",
        referrelCode: userData.referrelCode || "",
        businessPromoters: "2",
        businessIncome: "504546",
        status: false,
        paymentStatus: userData.paymentStatus || false,
      });
    }
  }, [userData]);

  // Handle input changes
  const handleChange = (e) => {
    console.log("changed", e.target.name);
    let { name, value } = e.target;
    if(name === 'paymentStatus'){
      value = (value === 'true' ? true : false)
    }
      setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = userData._id;
    dispatch(UpdateUser({ userId, userData: formValues }))
      .unwrap()
      .then((response) => {
        setShowModal(!showModal)
        console.log('User updated successfully:', response);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>View & Edit List</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="contactNumber"
                value={formValues.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Referred By</label>
              <input
                type="text"
                name="referrelCode"
                value={formValues.referrelCode}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Business Promoters</label>
              <input
                type="text"
                name="businessPromoters"
                value={formValues.businessPromoters}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Business Income</label>
              <input
                type="text"
                name="businessIncome"
                value={formValues.businessIncome}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formValues.status}
                onChange={handleChange}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label>Receive Payment</label>
              <select
                name="paymentStatus"
                value={formValues.paymentStatus}
                onChange={handleChange}
              >
                <option value={true}>Accept</option>
                <option value={false}>Reject</option>
              </select>
            </div>
          </div>
          <p className="info-text">
            To resolve a payment issue (472, 590 and 1180)
          </p>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalForm;
