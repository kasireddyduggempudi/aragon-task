import React, { useState, useEffect } from 'react';
import { useBoard } from '../../context/BoardContext';
import { taskAPI } from '../../services/api';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Textarea from '../common/Textarea';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';
import '../Modals/BoardModal.css';

const TaskModal = ({ isOpen, onClose, task = null, columnId = null }) => {
  const { currentBoard, refreshBoard } = useBoard();
  const isEdit = !!task;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    columnId: columnId || '',
    subtasks: [
      { title: '', tempId: 1 },
      { title: '', tempId: 2 },
    ],
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (task) {
        setFormData({
          title: task.title,
          description: task.description || '',
          columnId: task.columnId,
          subtasks: task.subtasks?.length > 0
            ? task.subtasks.map((st, idx) => ({
                ...st,
                tempId: idx + 1,
              }))
            : [
                { title: '', tempId: 1 },
                { title: '', tempId: 2 },
              ],
        });
      } else {
        setFormData({
          title: '',
          description: '',
          columnId: columnId || currentBoard?.columns[0]?.id || '',
          subtasks: [
            { title: '', tempId: 1 },
            { title: '', tempId: 2 },
          ],
        });
      }
      setErrors({});
    }
  }, [isOpen, task, columnId, currentBoard]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.columnId) {
      newErrors.columnId = 'Status is required';
    }

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
      const taskData = {
        title: formData.title,
        description: formData.description,
        columnId: formData.columnId,
      };

      if (isEdit) {
        await taskAPI.update(task.id, taskData);
      } else {
        taskData.subtasks = formData.subtasks
          .filter(st => st.title.trim())
          .map((st, index) => ({
            title: st.title,
            order: index,
          }));
        await taskAPI.create(taskData);
      }

      await refreshBoard();
      onClose();
    } catch (error) {
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleSubtaskChange = (tempId, value) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(st =>
        st.tempId === tempId ? { ...st, title: value } : st
      ),
    }));
  };

  const handleAddSubtask = () => {
    const newTempId = Math.max(...formData.subtasks.map(s => s.tempId), 0) + 1;
    setFormData(prev => ({
      ...prev,
      subtasks: [...prev.subtasks, { title: '', tempId: newTempId }],
    }));
  };

  const handleRemoveSubtask = (tempId) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(st => st.tempId !== tempId),
    }));
  };

  const columnOptions = currentBoard?.columns?.map(col => ({
    value: col.id,
    label: col.name,
  })) || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Task' : 'Add New Task'}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Title"
          value={formData.title}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, title: e.target.value }));
            if (errors.title) {
              setErrors(prev => ({ ...prev, title: '' }));
            }
          }}
          placeholder="e.g. Take coffee break"
          error={errors.title}
          required
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
          rows={4}
        />

        {!isEdit && (
          <>
            <div className="form-section">
              <label className="form-section-label">Subtasks</label>
              <div className="board-columns-list">
                {formData.subtasks.map((subtask) => (
                  <div key={subtask.tempId} className="subtask-input-row">
                    <Input
                      value={subtask.title}
                      onChange={(e) => handleSubtaskChange(subtask.tempId, e.target.value)}
                      placeholder="e.g. Make coffee"
                    />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleRemoveSubtask(subtask.tempId)}
                      disabled={formData.subtasks.length === 1}
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
              onClick={handleAddSubtask}
            >
              + Add New Subtask
            </Button>
          </>
        )}

        <div className="form-section">
          <label className="form-section-label">Status</label>
          <Dropdown
            value={formData.columnId}
            onChange={(value) => {
              setFormData(prev => ({ ...prev, columnId: value }));
              if (errors.columnId) {
                setErrors(prev => ({ ...prev, columnId: '' }));
              }
            }}
            options={columnOptions}
            placeholder="Select status"
          />
          {errors.columnId && (
            <span className="error-message">{errors.columnId}</span>
          )}
        </div>

        {errors.submit && (
          <div className="error-message submit-error">{errors.submit}</div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="large"
          disabled={loading}
        >
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Task'}
        </Button>
      </form>
    </Modal>
  );
};

export default TaskModal;
