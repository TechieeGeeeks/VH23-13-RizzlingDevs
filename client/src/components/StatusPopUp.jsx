import React from "react";

const StatusPopup = ({ isVisible, onClose, status }) => {
  return isVisible ? (
    <div className="">
      <div className="status-content flex justify-between">
        <p>Status: {status}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default StatusPopup;
