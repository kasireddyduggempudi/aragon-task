import React, { useState } from 'react';
import { useBoard } from '../../context/BoardContext';
import TaskCard from '../Task/TaskCard';
import TaskModal from '../Modals/TaskModal';
import TaskDetailModal from '../Modals/TaskDetailModal';
import BoardModal from '../Modals/BoardModal';
import './Board.css';

const Board = () => {
  const { currentBoard, loading } = useBoard();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTaskDetailModal, setShowTaskDetailModal] = useState(false);
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setShowTaskDetailModal(true);
  };

  const handleAddTask = (columnId) => {
    setSelectedColumnId(columnId);
    setShowTaskModal(true);
  };

  if (loading) {
    return (
      <main className="board">
        <div className="board-loading">Loading...</div>
      </main>
    );
  }

  if (!currentBoard) {
    return (
      <main className="board">
        <div className="board-empty">
          <p className="board-empty-text">
            No boards found. Create a new board to get started.
          </p>
          <button
            className="board-empty-button"
            onClick={() => setShowBoardModal(true)}
          >
            + Create New Board
          </button>
        </div>
        <BoardModal
          isOpen={showBoardModal}
          onClose={() => setShowBoardModal(false)}
        />
      </main>
    );
  }

  if (!currentBoard.columns || currentBoard.columns.length === 0) {
    return (
      <main className="board">
        <div className="board-empty">
          <p className="board-empty-text">
            This board is empty. Create a new column to get started.
          </p>
          <button
            className="board-empty-button"
            onClick={() => setShowBoardModal(true)}
          >
            + Edit Board
          </button>
        </div>
        <BoardModal
          isOpen={showBoardModal}
          onClose={() => setShowBoardModal(false)}
          board={currentBoard}
        />
      </main>
    );
  }

  return (
    <main className="board">
      <div className="board-columns">
        {currentBoard.columns.map((column) => (
          <div key={column.id} className="board-column">
            <div className="board-column-header">
              <div className="board-column-indicator" style={{ backgroundColor: column.color }} />
              <h3 className="board-column-title">
                {column.name} ({column.tasks?.length || 0})
              </h3>
            </div>
            <div className="board-column-tasks">
              {column.tasks && column.tasks.length > 0 ? (
                column.tasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onClick={() => handleTaskClick(task)}
                  />
                ))
              ) : (
                <div className="board-column-empty">
                  <button
                    className="board-add-task-button"
                    onClick={() => handleAddTask(column.id)}
                  >
                    + Add Task
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="board-column-new">
          <button
            className="board-new-column-button"
            onClick={() => setShowBoardModal(true)}
          >
            + New Column
          </button>
        </div>
      </div>

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setSelectedColumnId(null);
        }}
        columnId={selectedColumnId}
      />

      <TaskDetailModal
        isOpen={showTaskDetailModal}
        onClose={() => {
          setShowTaskDetailModal(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
      />

      <BoardModal
        isOpen={showBoardModal}
        onClose={() => setShowBoardModal(false)}
        board={currentBoard}
      />
    </main>
  );
};

export default Board;
