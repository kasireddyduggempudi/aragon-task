import React from 'react';
import { BoardProvider } from './context/BoardContext';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Board from './components/Board/Board';
import './styles/App.css';

function App() {
  return (
    <BoardProvider>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <Board />
        </div>
      </div>
    </BoardProvider>
  );
}

export default App;
