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
npm run dev
# Frontend: http://localhost:5173
# Backend: http://localhost:3002
```

## Login
- **Username:** admin
- **Password:** 1234

## Tech Stack
- **Backend:** Node.js + Express + TypeScript
- **Frontend:** React + TypeScript + Material-UI  
- **Data:** In-memory storage
- **Containers:** Podman

## Features
- User authentication
- Create transactions
- List and search transactions
- Update transaction status
- Sort by date/amount/contractor

## API Endpoints
- `POST /api/login` - Authentication
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/:id` - Get transaction
- `PATCH /api/transactions/:id/status` - Update status