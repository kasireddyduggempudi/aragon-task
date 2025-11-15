const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  
  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

// Board API
export const boardAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/boards`);
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/boards/${id}`);
    return handleResponse(response);
  },

  create: async (boardData) => {
    const response = await fetch(`${API_URL}/boards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(boardData),
    });
    return handleResponse(response);
  },

  update: async (id, boardData) => {
    const response = await fetch(`${API_URL}/boards/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(boardData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/boards/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// Column API
export const columnAPI = {
  create: async (columnData) => {
    const response = await fetch(`${API_URL}/columns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(columnData),
    });
    return handleResponse(response);
  },

  update: async (id, columnData) => {
    const response = await fetch(`${API_URL}/columns/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(columnData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/columns/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// Task API
export const taskAPI = {
  getById: async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`);
    return handleResponse(response);
  },

  create: async (taskData) => {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  update: async (id, taskData) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};

// Subtask API
export const subtaskAPI = {
  update: async (id, subtaskData) => {
    const response = await fetch(`${API_URL}/subtasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subtaskData),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/subtasks/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};
