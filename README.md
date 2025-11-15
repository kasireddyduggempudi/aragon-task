# Aragon Task Management - Kanban Board Application

A full-stack Kanban task management application built with React, Node.js, Express, Prisma, and PostgreSQL.

![Kanban Board](./screenshot.png)

## Features

### Frontend
- ✅ Create, read, update, and delete boards and tasks
- ✅ Frontend form validations for boards and tasks
- ✅ State management using React Context and Hooks
- ✅ Hover states for all interactive elements
- ✅ Fully responsive layout for all device sizes
- ✅ Custom React components (no external component libraries)
- ✅ High-fidelity UI matching the design specification
- ✅ Dark theme with purple accent colors

### Backend
- ✅ RESTful API using Node.js and Express
- ✅ PostgreSQL database with Prisma ORM
- ✅ Proper system design with separated concerns
- ✅ Input validation using express-validator
- ✅ Error handling and logging with Winston
- ✅ Optimized database queries with proper indexing
- ✅ Monitoring and debugging capabilities

## Tech Stack

**Frontend:**
- React 18
- React Context API (State Management)
- Custom CSS (No component libraries)
- Fetch API

**Backend:**
- Node.js
- Express.js
- Prisma (ORM)
- PostgreSQL
- express-validator
- Winston (Logging)
- Morgan (HTTP logging)

## Project Structure

```
aragon-task/
├── aragon-backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── logger.js
│   │   ├── controllers/
│   │   │   ├── boardController.js
│   │   │   ├── columnController.js
│   │   │   ├── taskController.js
│   │   │   └── subtaskController.js
│   │   ├── middleware/
│   │   │   ├── errorHandler.js
│   │   │   └── validators.js
│   │   ├── routes/
│   │   │   ├── boardRoutes.js
│   │   │   ├── columnRoutes.js
│   │   │   ├── taskRoutes.js
│   │   │   └── subtaskRoutes.js
│   │   └── server.js
│   ├── package.json
│   └── README.md
└── aragon-frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Button.js
    │   │   │   ├── Input.js
    │   │   │   ├── Textarea.js
    │   │   │   ├── Modal.js
    │   │   │   └── Dropdown.js
    │   │   ├── Header/
    │   │   │   ├── Header.js
    │   │   │   └── Header.css
    │   │   ├── Sidebar/
    │   │   │   ├── Sidebar.js
    │   │   │   └── Sidebar.css
    │   │   ├── Board/
    │   │   │   ├── Board.js
    │   │   │   └── Board.css
    │   │   ├── Task/
    │   │   │   ├── TaskCard.js
    │   │   │   └── TaskCard.css
    │   │   └── Modals/
    │   │       ├── BoardModal.js
    │   │       ├── TaskModal.js
    │   │       ├── TaskDetailModal.js
    │   │       └── DeleteModal.js
    │   ├── context/
    │   │   └── BoardContext.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── index.css
    │   │   └── App.css
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation & Setup

### 1. Clone the repository

```bash
cd /Users/kasi.reddy/learning-projects/aragon-task
```

### 2. Setup PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE kanban_db;

# Exit psql
\q
```

### 3. Backend Setup

```bash
cd aragon-backend

# Install dependencies
npm install

# Create .env file (if not exists)
# Copy from .env.example and update with your PostgreSQL credentials
cp .env.example .env

# Update DATABASE_URL in .env:
# DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/kanban_db?schema=public"

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 4. Frontend Setup

Open a new terminal:

```bash
cd aragon-frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Create a Board**: Click "+ Create New Board" in the sidebar
2. **Add Columns**: When creating a board, add columns (e.g., TODO, DOING, DONE)
3. **Create Tasks**: Click "+ Add New Task" in the header or "+ Add Task" in a column
4. **Add Subtasks**: When creating a task, add subtasks to break down work
5. **View Task Details**: Click on any task card to view details
6. **Update Task Status**: Change task status using the dropdown in task details
7. **Complete Subtasks**: Check off subtasks as you complete them
8. **Edit/Delete**: Use the three-dot menu on boards and tasks to edit or delete

## API Endpoints

### Boards
- `GET /api/boards` - Get all boards with columns and tasks
- `GET /api/boards/:id` - Get a specific board
- `POST /api/boards` - Create a new board
- `PUT /api/boards/:id` - Update a board
- `DELETE /api/boards/:id` - Delete a board

### Columns
- `GET /api/columns/:id` - Get a specific column
- `POST /api/columns` - Create a new column
- `PUT /api/columns/:id` - Update a column
- `DELETE /api/columns/:id` - Delete a column

### Tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Subtasks
- `PUT /api/subtasks/:id` - Update a subtask
- `DELETE /api/subtasks/:id` - Delete a subtask

## Database Schema

```
Board
  ├── id (UUID)
  ├── name (String)
  ├── createdAt (DateTime)
  ├── updatedAt (DateTime)
  └── columns (Column[])

Column
  ├── id (UUID)
  ├── name (String)
  ├── color (String)
  ├── order (Int)
  ├── boardId (UUID)
  ├── createdAt (DateTime)
  ├── updatedAt (DateTime)
  └── tasks (Task[])

Task
  ├── id (UUID)
  ├── title (String)
  ├── description (String?)
  ├── order (Int)
  ├── columnId (UUID)
  ├── createdAt (DateTime)
  ├── updatedAt (DateTime)
  └── subtasks (Subtask[])

Subtask
  ├── id (UUID)
  ├── title (String)
  ├── isCompleted (Boolean)
  ├── order (Int)
  ├── taskId (UUID)
  ├── createdAt (DateTime)
  └── updatedAt (DateTime)
```

## Design Decisions

### Frontend Architecture
- **State Management**: React Context API for global state (boards, current board, loading states)
- **Component Structure**: Separated into common/reusable components and feature-specific components
- **Styling**: Custom CSS with BEM-like naming conventions for maintainability
- **API Integration**: Centralized API service layer for all backend communication

### Backend Architecture
- **MVC Pattern**: Controllers handle business logic, routes define endpoints
- **Middleware**: Separate middleware for validation, error handling, and logging
- **ORM**: Prisma for type-safe database queries and migrations
- **Error Handling**: Centralized error handler with proper HTTP status codes

### Database Design
- **Cascading Deletes**: Deleting a board removes all columns, tasks, and subtasks
- **Ordering**: Each entity has an `order` field for custom sorting
- **Indexing**: Foreign keys are indexed for query performance
- **UUID Primary Keys**: For better scalability and security

## Key Features Implemented

✅ **CRUD Operations**: Full create, read, update, delete for all entities
✅ **Form Validation**: Both client-side and server-side validation
✅ **State Management**: React Context with custom hooks
✅ **Responsive Design**: Mobile-first approach with breakpoints
✅ **Hover Effects**: Interactive feedback on all clickable elements
✅ **Error Handling**: User-friendly error messages
✅ **Loading States**: Visual feedback during API calls
✅ **Logging**: Winston for application logs and Morgan for HTTP logs
✅ **Database Optimization**: Proper indexing and query optimization

## Future Enhancements (Not Required)

- Drag and drop for tasks
- User authentication
- Light/Dark mode toggle
- Custom status columns
- Task assignments
- Due dates
- Task filters and search

## Troubleshooting

### Backend won't start
- Check if PostgreSQL is running: `brew services list` (macOS)
- Verify DATABASE_URL in .env is correct
- Run migrations: `npm run prisma:migrate`

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check CORS configuration in backend
- Verify API_URL in frontend .env

### Database connection issues
- Test PostgreSQL connection: `psql -U postgres`
- Create database if missing: `CREATE DATABASE kanban_db;`
- Check PostgreSQL port (default: 5432)

## Development Tools

```bash
# Backend
npm run dev          # Start with nodemon (auto-reload)
npm run prisma:studio # Open Prisma Studio (DB GUI)
npm run prisma:migrate # Run migrations

# Frontend
npm start           # Start development server
npm run build       # Build for production
```

## Performance Considerations

- Database queries include all related data in single queries (eager loading)
- Indexes on foreign keys for faster lookups
- HTTP request logging for debugging
- Optimized bundle size (no heavy component libraries)

## Author

Built as part of the Aragon technical assessment.

## License

This project is for demonstration purposes only.
