import React from 'react';

const LogoutModal = ({ show, onClose, onLogout }) => {
  if (!show) return null; // Don't render if not shown

  return (
    <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          
          {/* Header */}
          <div className="modal-header" style={{ backgroundColor: '#4D007D' }}>
            <h5 className="modal-title text-white">Confirm Logout</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body" style={{    alignSelf: 'center'}}>
            Are you sure you want to logout?
          </div>

          {/* Footer */}
          <div className="modal-foote gap-2 d-flex mb-3" style={{    alignSelf: 'center'}} >
            <button className="btn" onClick={onClose} style={{  color: 'white', background: "#4D007D", borderRadius: "19px" }}>Cancel</button>
            <button
              className="btn lg-out-btn"
              style={{  color: 'red' }}
              onClick={onLogout}
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
