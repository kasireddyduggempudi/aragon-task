import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import './DeleteModal.css';

const DeleteModal = ({ isOpen, onClose, onDelete, title, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="delete-modal-title">{title}</h2>
      <p className="delete-modal-message">{message}</p>
      <div className="delete-modal-actions">
        <Button variant="destructive" size="large" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="secondary" size="large" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
