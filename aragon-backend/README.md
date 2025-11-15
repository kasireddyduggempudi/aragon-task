# Aragon Task Management - Backend

RESTful API for the Kanban task management application built with Node.js, Express, Prisma, and PostgreSQL.

## Features

- CRUD operations for Boards, Columns, Tasks, and Subtasks
- Input validation with express-validator
- Error handling and logging with Winston
- Database ORM with Prisma
- PostgreSQL database
- RESTful API design

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Setup PostgreSQL database:
```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE kanban_db;
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```
PORT=5000
DATABASE_URL="postgresql://postgres:password@localhost:5432/kanban_db?schema=public"
NODE_ENV=development
```

4. Run Prisma migrations:
```bash
npm run prisma:generate
npm run prisma:migrate
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Boards
- `GET /api/boards` - Get all boards
- `GET /api/boards/:id` - Get board by ID
- `POST /api/boards` - Create new board
- `PUT /api/boards/:id` - Update board
- `DELETE /api/boards/:id` - Delete board

### Columns
- `GET /api/columns/:id` - Get column by ID
- `POST /api/columns` - Create new column
- `PUT /api/columns/:id` - Update column
- `DELETE /api/columns/:id` - Delete column

### Tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Subtasks
- `PUT /api/subtasks/:id` - Update subtask
- `DELETE /api/subtasks/:id` - Delete subtask

## Database Schema

```
Board (id, name, createdAt, updatedAt)
  ↓ has many
Column (id, name, color, order, boardId, createdAt, updatedAt)
  ↓ has many
Task (id, title, description, order, columnId, createdAt, updatedAt)
  ↓ has many
Subtask (id, title, isCompleted, order, taskId, createdAt, updatedAt)
```

## Example API Requests

### Create a Board
```bash
POST /api/boards
Content-Type: application/json

{
  "name": "Platform Launch",
  "columns": [
    { "name": "TODO", "color": "#49C4E5" },
    { "name": "DOING", "color": "#8471F2" },
    { "name": "DONE", "color": "#67E2AE" }
  ]
}
```

### Create a Task
```bash
POST /api/tasks
Content-Type: application/json

{
  "title": "Build UI for onboarding flow",
  "description": "Create wireframes and design system",
  "columnId": "uuid-here",
  "subtasks": [
    { "title": "Sign up page" },
    { "title": "Sign in page" },
    { "title": "Welcome page" }
  ]
}
```

## Logging

Logs are stored in the `/logs` directory:
- `combined.log` - All logs
- `error.log` - Error logs only

## Tools Used

- **Express.js** - Web framework
- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **express-validator** - Input validation
- **Winston** - Logging
- **Morgan** - HTTP request logging
- **CORS** - Cross-origin resource sharing
