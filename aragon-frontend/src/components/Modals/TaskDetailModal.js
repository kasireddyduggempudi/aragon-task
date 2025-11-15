import React, { useState, useEffect } from 'react';
import { useBoard } from '../../context/BoardContext';
import { taskAPI, subtaskAPI } from '../../services/api';
import Modal from '../common/Modal';
import Dropdown from '../common/Dropdown';
import TaskModal from './TaskModal';
import DeleteModal from './DeleteModal';
import './TaskDetailModal.css';

const TaskDetailModal = ({ isOpen, onClose, task }) => {
  const { currentBoard, refreshBoard } = useBoard();
  const [localTask, setLocalTask] = useState(task);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (task) {
      setLocalTask(task);
    }
  }, [task]);

  if (!localTask) return null;

  const handleSubtaskToggle = async (subtaskId, isCompleted) => {
    try {
      await subtaskAPI.update(subtaskId, { isCompleted: !isCompleted });
      
      // Update local state immediately for better UX
      setLocalTask(prev => ({
        ...prev,
        subtasks: prev.subtasks.map(st =>
          st.id === subtaskId ? { ...st, isCompleted: !isCompleted } : st
        ),
      }));
      
      // Refresh the board to get updated data
      await refreshBoard();
    } catch (error) {
      console.error('Error updating subtask:', error);
    }
  };

  const handleStatusChange = async (newColumnId) => {
    try {
      await taskAPI.update(localTask.id, { columnId: newColumnId });
      setLocalTask(prev => ({ ...prev, columnId: newColumnId }));
      await refreshBoard();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await taskAPI.delete(localTask.id);
      await refreshBoard();
      setShowDeleteModal(false);
      onClose();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completedSubtasks = localTask.subtasks?.filter(st => st.isCompleted).length || 0;
  const totalSubtasks = localTask.subtasks?.length || 0;

  const columnOptions = currentBoard?.columns?.map(col => ({
    value: col.id,
    label: col.name,
  })) || [];

  return (
    <>
      <Modal isOpen={isOpen && !showEditModal} onClose={onClose}>
        <div className="task-detail-header">
          <h2 className="task-detail-title">{localTask.title}</h2>
          <div className="task-detail-menu-container">
            <button
              className="task-detail-menu-button"
              onClick={() => setShowMenu(!showMenu)}
            >
              <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
                <g fill="#828FA3" fillRule="evenodd">
                  <circle cx="2.308" cy="2.308" r="2.308"/>
                  <circle cx="2.308" cy="10" r="2.308"/>
                  <circle cx="2.308" cy="17.692" r="2.308"/>
                </g>
              </svg>
            </button>

            {showMenu && (
              <div className="task-detail-dropdown">
                <button
                  className="task-detail-dropdown-item"
                  onClick={() => {
                    setShowEditModal(true);
                    setShowMenu(false);
                  }}
                >
                  Edit Task
                </button>
                <button
                  className="task-detail-dropdown-item delete"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setShowMenu(false);
                  }}
                >
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>

        {localTask.description && (
          <p className="task-detail-description">{localTask.description}</p>
        )}

        {totalSubtasks > 0 && (
          <div className="task-detail-subtasks">
            <h3 className="task-detail-subtasks-title">
              Subtasks ({completedSubtasks} of {totalSubtasks})
            </h3>
            <div className="task-detail-subtasks-list">
              {localTask.subtasks.map((subtask) => (
                <label
                  key={subtask.id}
                  className={`subtask-item ${subtask.isCompleted ? 'completed' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={subtask.isCompleted}
                    onChange={() => handleSubtaskToggle(subtask.id, subtask.isCompleted)}
                    className="subtask-checkbox"
                  />
                  <span className="subtask-checkbox-custom"></span>
                  <span className="subtask-title">{subtask.title}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="task-detail-status">
          <label className="task-detail-status-label">Current Status</label>
          <Dropdown
            value={localTask.columnId}
            onChange={handleStatusChange}
            options={columnOptions}
          />
        </div>
      </Modal>

      <TaskModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          refreshBoard();
        }}
        task={localTask}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteTask}
        title="Delete this task?"
        message={`Are you sure you want to delete the '${localTask.title}' task and its subtasks? This action cannot be reversed.`}
      />
    </>
  );
};

export default TaskDetailModal;
