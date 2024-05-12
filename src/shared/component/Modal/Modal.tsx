import React from "react";
import "./Modal.css";

interface ConfirmModalProps {
  isOpen: boolean; // Whether the modal is open or not
  onClose: () => void; // Function to close the modal
  onConfirm: () => void; // Function to confirm the action
  message?: string; // Optional message to display in the modal
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this item?", // Default message if props is not provided
}) => {
  // If the modal is not open, return null (don't render anything)
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmation</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
