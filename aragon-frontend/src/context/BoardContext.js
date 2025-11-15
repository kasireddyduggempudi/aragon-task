import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { boardAPI } from '../services/api';

const BoardContext = createContext();

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within a BoardProvider');
  }
  return context;
};

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Fetch all boards
  const fetchBoards = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await boardAPI.getAll();
      setBoards(data);
      
      // Set first board as current if none selected
      if (!currentBoard && data.length > 0) {
        setCurrentBoard(data[0]);
      } else if (currentBoard) {
        // Update current board data
        const updatedBoard = data.find(b => b.id === currentBoard.id);
        if (updatedBoard) {
          setCurrentBoard(updatedBoard);
        }
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching boards:', err);
    } finally {
      setLoading(false);
    }
  }, [currentBoard]);

  // Initial fetch
  useEffect(() => {
    fetchBoards();
  }, []);

  // Select board
  const selectBoard = useCallback((board) => {
    setCurrentBoard(board);
  }, []);

  // Create board
  const createBoard = useCallback(async (boardData) => {
    try {
      const newBoard = await boardAPI.create(boardData);
      setBoards(prev => [...prev, newBoard]);
      setCurrentBoard(newBoard);
      return newBoard;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update board
  const updateBoard = useCallback(async (id, boardData) => {
    try {
      const updatedBoard = await boardAPI.update(id, boardData);
      setBoards(prev => prev.map(b => b.id === id ? updatedBoard : b));
      if (currentBoard?.id === id) {
        setCurrentBoard(updatedBoard);
      }
      return updatedBoard;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [currentBoard]);

  // Delete board
  const deleteBoard = useCallback(async (id) => {
    try {
      await boardAPI.delete(id);
      setBoards(prev => prev.filter(b => b.id !== id));
      
      if (currentBoard?.id === id) {
        const remainingBoards = boards.filter(b => b.id !== id);
        setCurrentBoard(remainingBoards[0] || null);
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [boards, currentBoard]);

  // Refresh current board
  const refreshBoard = useCallback(async () => {
    if (currentBoard) {
      try {
        const updatedBoard = await boardAPI.getById(currentBoard.id);
        setCurrentBoard(updatedBoard);
        setBoards(prev => prev.map(b => b.id === currentBoard.id ? updatedBoard : b));
      } catch (err) {
        console.error('Error refreshing board:', err);
      }
    }
  }, [currentBoard]);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const value = {
    boards,
    currentBoard,
    loading,
    error,
    sidebarOpen,
    fetchBoards,
    selectBoard,
    createBoard,
    updateBoard,
    deleteBoard,
    refreshBoard,
    toggleSidebar,
  };

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};
