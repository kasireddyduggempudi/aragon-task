import React, { useState } from 'react';
import { useBoard } from '../../context/BoardContext';
import Button from '../common/Button';
import BoardModal from '../Modals/BoardModal';
import TaskModal from '../Modals/TaskModal';
import DeleteModal from '../Modals/DeleteModal';
import './Header.css';

const Header = () => {
  const { currentBoard, deleteBoard, toggleSidebar } = useBoard();
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleDeleteBoard = async () => {
    if (currentBoard) {
      await deleteBoard(currentBoard.id);
      setShowDeleteModal(false);
      setShowMenu(false);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-logo" onClick={toggleSidebar}>
          <svg width="24" height="25" xmlns="http://www.w3.org/2000/svg">
            <g fill="#635FC7" fillRule="evenodd">
              <rect width="6" height="25" rx="2"/>
              <rect opacity=".75" x="9" width="6" height="25" rx="2"/>
              <rect opacity=".5" x="18" width="6" height="25" rx="2"/>
            </g>
          </svg>
          <h1 className="header-logo-text">kanban</h1>
        </button>
        {currentBoard && (
          <h2 className="header-board-name">{currentBoard.name}</h2>
        )}
      </div>

      <div className="header-right">
        <Button
          variant="primary"
          size="large"
          onClick={() => setShowTaskModal(true)}
          disabled={!currentBoard || !currentBoard.columns?.length}
        >
          + Add New Task
        </Button>

        {currentBoard && (
          <div className="header-menu-container">
            <button
              className="header-menu-button"
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
              <div className="header-dropdown">
                <button
                  className="header-dropdown-item"
                  onClick={() => {
                    setShowBoardModal(true);
                    setShowMenu(false);
                  }}
                >
                  Edit Board
                </button>
                <button
                  className="header-dropdown-item delete"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setShowMenu(false);
                  }}
                >
                  Delete Board
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <BoardModal
        isOpen={showBoardModal}
        onClose={() => setShowBoardModal(false)}
        board={currentBoard}
      />

      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleDeleteBoard}
        title="Delete this board?"
        message={`Are you sure you want to delete the '${currentBoard?.name}' board? This action will remove all columns and tasks and cannot be reversed.`}
      />
    </header>
  );
};

export default Header;
