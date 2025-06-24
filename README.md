# Transaction Manager App

Full-stack transaction management application for interview demonstration.

## Quick Start

**Containers (Recommended):**
```bash
npm run container:build
# Visit: http://localhost:4173
```

**Development:**
```bash
npm run install-all
npm run dev
# Frontend: http://localhost:5173
# Backend: http://localhost:3002
```

## Authentication
- **Default Login:** admin / 1234
- **Registration:** Create new accounts with username, email, and password
- Users can toggle between login and registration modes in the UI

## Tech Stack
- **Backend:** Node.js + Express + TypeScript
- **Frontend:** React + TypeScript + Material-UI  
- **Data:** In-memory storage
- **Containers:** Podman

## Features
- JWT-based user authentication with secure session management
- User registration with email validation and password hashing
- Create transactions
- List and search transactions
- Update transaction status
- Sort by date/amount/contractor
- Protected API routes with token validation

## API Endpoints
- `POST /api/login` - Authentication (returns JWT token)
- `POST /api/register` - User registration (returns JWT token)
- `GET /api/transactions` - List transactions (requires JWT)
- `POST /api/transactions` - Create transaction (requires JWT)
- `GET /api/transactions/:id` - Get transaction (requires JWT)
- `PATCH /api/transactions/:id/status` - Update status (requires JWT)

## Authentication
The application uses JWT (JSON Web Tokens) for authentication:
- Login and registration endpoints return a JWT token valid for 24 hours
- Passwords are securely hashed using bcrypt
- All transaction endpoints require a valid JWT token in the Authorization header
- Token format: `Bearer <token>`
- Tokens are automatically stored and managed by the frontend client
- Registration requires username, email, and password with client-side email validation