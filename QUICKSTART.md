# 🚀 Quick Start Guide

Follow these steps to get the Kanban application running:

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v16+) installed: `node --version`
- ✅ PostgreSQL (v12+) installed: `psql --version`
- ✅ npm or yarn installed: `npm --version`

## Step-by-Step Setup

### 1. PostgreSQL Setup (REQUIRED)

```bash
# Start PostgreSQL (macOS with Homebrew)
brew services start postgresql@14

# OR if using different installation, ensure PostgreSQL is running
# Then create the database:

psql -U postgres

# In psql prompt:
CREATE DATABASE kanban_db;
\q
```

If you don't have PostgreSQL installed:
```bash
# macOS
brew install postgresql@14
brew services start postgresql@14

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd aragon-backend

# Install dependencies
npm install

# Configure environment
# Update the DATABASE_URL in .env.example with your PostgreSQL credentials
# Default is: postgresql://postgres:password@localhost:5432/kanban_db

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed database with sample data
node prisma/seed.js

# Start the backend server
npm run dev
```

✅ Backend should now be running at `http://localhost:5100`
✅ You should see: "Server running on port 5100 in development mode"

### 3. Frontend Setup

Open a **new terminal** (keep backend running):

```bash
# Navigate to frontend directory
cd aragon-frontend

# Install dependencies
npm install

# Start the development server
npm start
```

✅ Frontend should automatically open at `http://localhost:3000`
✅ Your browser should launch with the Kanban application

## Verification

1. **Backend Health Check**: Visit `http://localhost:5100/health`
   - Should show: `{"status":"OK","timestamp":"..."}`

2. **Frontend**: Visit `http://localhost:3000`
   - You should see the Kanban board interface
   - If you ran the seed script, you'll see 3 sample boards

## Common Issues & Solutions

### Issue: "Port 5000 already in use"
```bash
# Find and kill the process using port 5000
lsof -ti:5000 | xargs kill -9

# Then restart the backend
npm run dev
```

### Issue: "Database connection failed"
```bash
# Check if PostgreSQL is running
brew services list  # macOS
# OR
sudo service postgresql status  # Linux

# Verify database exists
psql -U postgres -c "\l" | grep kanban_db

# If database doesn't exist, create it:
psql -U postgres -c "CREATE DATABASE kanban_db;"
```

### Issue: "Prisma Client did not initialize yet"
```bash
cd aragon-backend
npm run prisma:generate
npm run prisma:migrate
```

### Issue: "Frontend won't start"
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

## Development Workflow

### Adding Sample Data
```bash
cd aragon-backend
node prisma/seed.js
```

### Viewing Database
```bash
cd aragon-backend
npm run prisma:studio
# Opens Prisma Studio at http://localhost:5555
```

### Resetting Database
```bash
cd aragon-backend
npx prisma migrate reset
# This will delete all data and re-run migrations
# Then optionally: node prisma/seed.js
```

### Viewing Logs
Backend logs are stored in:
- `aragon-backend/logs/combined.log` - All logs
- `aragon-backend/logs/error.log` - Error logs only

## Production Build

### Backend
```bash
cd aragon-backend
npm start
```

### Frontend
```bash
cd aragon-frontend
npm run build
# Serves the optimized production build
```

## Testing the Application

1. **Create a Board**
   - Click "+ Create New Board" in the sidebar
   - Enter board name and columns (e.g., TODO, DOING, DONE)
   - Click "Create New Board"

2. **Create a Task**
   - Click "+ Add New Task" in header
   - Fill in task details and subtasks
   - Select a status column
   - Click "Create Task"

3. **View Task Details**
   - Click on any task card
   - Check/uncheck subtasks
   - Change status using dropdown
   - Edit or delete using the menu (three dots)

4. **Edit/Delete Board**
   - Click the three dots in header
   - Choose "Edit Board" or "Delete Board"

## API Testing with cURL

```bash
# Get all boards
curl http://localhost:5000/api/boards

# Create a board
curl -X POST http://localhost:5000/api/boards \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Board",
    "columns": [
      {"name": "TODO", "color": "#49C4E5"},
      {"name": "DONE", "color": "#67E2AE"}
    ]
  }'

# Health check
curl http://localhost:5000/health
```

## Tech Stack Reference

**Frontend**: React 18, Context API, Custom CSS
**Backend**: Node.js, Express, Prisma ORM
**Database**: PostgreSQL
**Logging**: Winston, Morgan
**Validation**: express-validator

## Need Help?

1. Check the main README.md for detailed documentation
2. Check backend/README.md for API documentation
3. Ensure all prerequisites are installed correctly
4. Verify PostgreSQL is running and database is created
5. Check that both servers are running (backend on 5000, frontend on 3000)

## Success Indicators

✅ Backend: Console shows "Server running on port 5000"
✅ Database: Connection established successfully
✅ Frontend: Opens automatically in browser at localhost:3000
✅ Health Check: `http://localhost:5000/health` returns OK
✅ UI: You can see the kanban interface and interact with it

---

**Ready to code!** 🎉 If everything is running, you're all set to use the Kanban application.
