import React, { useState, useEffect } from 'react';
import { useBoard } from '../../context/BoardContext';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import './BoardModal.css';

const BoardModal = ({ isOpen, onClose, board = null }) => {
  const { createBoard, updateBoard } = useBoard();
  const isEdit = !!board;

  const [formData, setFormData] = useState({
    name: '',
    columns: [
      { name: 'TODO', color: '#49C4E5', tempId: 1 },
      { name: 'DOING', color: '#8471F2', tempId: 2 },
      { name: 'DONE', color: '#67E2AE', tempId: 3 },
    ],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (board) {
        setFormData({
          name: board.name,
          columns: board.columns.map((col, idx) => ({
            ...col,
            tempId: idx + 1,
          })),
        });
      } else {
        setFormData({
          name: '',
          columns: [
            { name: 'TODO', color: '#49C4E5', tempId: 1 },
            { name: 'DOING', color: '#8471F2', tempId: 2 },
            { name: 'DONE', color: '#67E2AE', tempId: 3 },
          ],
        });
      }
      setErrors({});
    }
  }, [isOpen, board]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Board name is required';
    }

    formData.columns.forEach((col, index) => {
      if (!col.name.trim()) {
        newErrors[`column_${col.tempId}`] = 'Column name is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (isEdit) {
        await updateBoard(board.id, { name: formData.name });
      } else {
        await createBoard({
          name: formData.name,
          columns: formData.columns.map((col, index) => ({
            name: col.name,
            color: col.color,
            order: index,
          })),
        });
      }
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleColumnChange = (tempId, value) => {
    setFormData(prev => ({
      ...prev,
      columns: prev.columns.map(col =>
        col.tempId === tempId ? { ...col, name: value } : col
      ),
    }));
    if (errors[`column_${tempId}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`column_${tempId}`];
        return newErrors;
      });
    }
  };

  const handleAddColumn = () => {
    const newTempId = Math.max(...formData.columns.map(c => c.tempId), 0) + 1;
    setFormData(prev => ({
      ...prev,
      columns: [
        ...prev.columns,
        { name: '', color: '#635FC7', tempId: newTempId },
      ],
    }));
  };

  const handleRemoveColumn = (tempId) => {
    setFormData(prev => ({
      ...prev,
      columns: prev.columns.filter(col => col.tempId !== tempId),
    }));
    if (errors[`column_${tempId}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`column_${tempId}`];
        return newErrors;
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Board' : 'Add New Board'}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Board Name"
          value={formData.name}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, name: e.target.value }));
            if (errors.name) {
              setErrors(prev => ({ ...prev, name: '' }));
            }
          }}
          placeholder="e.g. Web Design"
          error={errors.name}
          required
        />

        {!isEdit && (
          <>
            <div className="form-section">
              <label className="form-section-label">Board Columns</label>
              <div className="board-columns-list">
                {formData.columns.map((column) => (
                  <div key={column.tempId} className="column-input-row">
                    <Input
                      value={column.name}
                      onChange={(e) => handleColumnChange(column.tempId, e.target.value)}
                      placeholder="e.g. Todo"
                      error={errors[`column_${column.tempId}`]}
                    />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleRemoveColumn(column.tempId)}
                      disabled={formData.columns.length === 1}
                    >
                      <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                        <g fill="#828FA3" fillRule="evenodd">
                          <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/>
                          <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/>
                        </g>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="large"
              onClick={handleAddColumn}
            >
              + Add New Column
            </Button>
          </>
        )}

        {errors.submit && (
          <div className="error-message submit-error">{errors.submit}</div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="large"
          disabled={loading}
        >
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create New Board'}
        </Button>
      </form>
    </Modal>
  );
};

export default BoardModal;
