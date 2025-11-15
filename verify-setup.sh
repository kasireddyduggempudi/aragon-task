#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Verifying Aragon Task Management Application Setup..."
echo ""

# Check Node.js
echo -n "Checking Node.js... "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✓${NC} Found $NODE_VERSION"
else
    echo -e "${RED}✗${NC} Node.js not found. Please install Node.js v16 or higher"
    exit 1
fi

# Check npm
echo -n "Checking npm... "
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✓${NC} Found v$NPM_VERSION"
else
    echo -e "${RED}✗${NC} npm not found"
    exit 1
fi

# Check PostgreSQL
echo -n "Checking PostgreSQL... "
if command -v psql &> /dev/null; then
    PSQL_VERSION=$(psql --version | awk '{print $3}')
    echo -e "${GREEN}✓${NC} Found v$PSQL_VERSION"
else
    echo -e "${YELLOW}⚠${NC} PostgreSQL not found. Please install PostgreSQL v12 or higher"
    echo "  macOS: brew install postgresql@14"
    echo "  Ubuntu: sudo apt-get install postgresql"
fi

echo ""
echo "📁 Checking project structure..."

# Check backend directory
if [ -d "aragon-backend" ]; then
    echo -e "${GREEN}✓${NC} Backend directory exists"
    
    # Check backend files
    BACKEND_FILES=(
        "aragon-backend/package.json"
        "aragon-backend/prisma/schema.prisma"
        "aragon-backend/src/server.js"
    )
    
    for file in "${BACKEND_FILES[@]}"; do
        if [ -f "$file" ]; then
            echo -e "  ${GREEN}✓${NC} $file"
        else
            echo -e "  ${RED}✗${NC} $file missing"
        fi
    done
else
    echo -e "${RED}✗${NC} Backend directory not found"
fi

# Check frontend directory
if [ -d "aragon-frontend" ]; then
    echo -e "${GREEN}✓${NC} Frontend directory exists"
    
    # Check frontend files
    FRONTEND_FILES=(
        "aragon-frontend/package.json"
        "aragon-frontend/src/App.js"
        "aragon-frontend/public/index.html"
    )
    
    for file in "${FRONTEND_FILES[@]}"; do
        if [ -f "$file" ]; then
            echo -e "  ${GREEN}✓${NC} $file"
        else
            echo -e "  ${RED}✗${NC} $file missing"
        fi
    done
else
    echo -e "${RED}✗${NC} Frontend directory not found"
fi

echo ""
echo "📦 Checking dependencies..."

# Check backend dependencies
if [ -d "aragon-backend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Backend dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Backend dependencies not installed"
    echo "  Run: cd aragon-backend && npm install"
fi

# Check frontend dependencies
if [ -d "aragon-frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Frontend dependencies installed"
else
    echo -e "${YELLOW}⚠${NC} Frontend dependencies not installed"
    echo "  Run: cd aragon-frontend && npm install"
fi

echo ""
echo "🗄️  Checking database..."

# Check if database exists
if command -v psql &> /dev/null; then
    DB_EXISTS=$(psql -U postgres -lqt | cut -d \| -f 1 | grep -w kanban_db)
    if [ ! -z "$DB_EXISTS" ]; then
        echo -e "${GREEN}✓${NC} Database 'kanban_db' exists"
    else
        echo -e "${YELLOW}⚠${NC} Database 'kanban_db' not found"
        echo "  Create it with: psql -U postgres -c 'CREATE DATABASE kanban_db;'"
    fi
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "If dependencies are not installed:"
echo "  1. cd aragon-backend && npm install"
echo "  2. cd aragon-frontend && npm install"
echo ""
echo "If database doesn't exist:"
echo "  1. psql -U postgres"
echo "  2. CREATE DATABASE kanban_db;"
echo "  3. \\q"
echo ""
echo "To start the application:"
echo "  1. cd aragon-backend && npm run prisma:generate && npm run prisma:migrate"
echo "  2. cd aragon-backend && npm run dev (in one terminal)"
echo "  3. cd aragon-frontend && npm start (in another terminal)"
echo ""
echo "For detailed instructions, see QUICKSTART.md"
echo ""
