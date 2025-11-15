import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onClick }) => {
  const completedSubtasks = task.subtasks?.filter(st => st.isCompleted).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;

  return (
    <div className="task-card" onClick={onClick}>
      <h4 className="task-card-title">{task.title}</h4>
      {totalSubtasks > 0 && (
        <p className="task-card-subtasks">
          {completedSubtasks} of {totalSubtasks} subtasks
        </p>
      )}
    </div>
  );
};

export default TaskCard;
