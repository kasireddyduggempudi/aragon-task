# 🚀 5-Minute Quick Start

Get the Kanban app running in 5 minutes:

## Prerequisites (Must Have)
- Node.js 16+ installed
- PostgreSQL 12+ installed and running
- npm installed

## Setup Steps

### 1. Create Database (30 seconds)
```bash
psql -U postgres
CREATE DATABASE kanban_db;
\q
```

### 2. Backend Setup (2 minutes)
```bash
cd aragon-backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run seed              # Optional: adds sample data
npm run dev               # Keep this running
```

### 3. Frontend Setup (2 minutes)
**Open a NEW terminal:**
```bash
cd aragon-frontend
npm install
npm start                 # Opens browser automatically
```

## ✅ Done!
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## 🔧 If Something Breaks

**PostgreSQL not found?**
```bash
# macOS
brew install postgresql@14 && brew services start postgresql@14

# Ubuntu
sudo apt-get install postgresql && sudo service postgresql start
```

**Port already in use?**
```bash
lsof -ti:5000 | xargs kill -9    # Kill backend port
lsof -ti:3000 | xargs kill -9    # Kill frontend port
```

**Database connection error?**
```bash
cd aragon-backend
# Edit .env file, update DATABASE_URL with your PostgreSQL password
```

**More help?** Read [QUICKSTART.md](QUICKSTART.md) for detailed instructions.

---

**That's it!** Start creating boards and tasks! 🎉
