# Blogging Platform (Full-Stack)

## Quick Start

### Backend
1. `cd server && npm install`
2. Copy `.env.example` to `.env` and fill values
3. `npm run dev`

### Frontend
1. `cd client && npm install`
2. `npm run dev` – open the printed URL

Default frontend expects backend at `http://localhost:5000`.

## Environment
- Copy `server/.env.example` to `server/.env` and set:
  - MONGO_URI (e.g., mongodb://127.0.0.1:27017/blog_platform)
  - JWT_SECRET (any strong string)
  - CLIENT_URL (http://localhost:5173)
- Optionally set `client/.env` from `.env.example` to point to server.

## Run Locally
Open two terminals.

### Terminal A (Backend)
```
cd server
npm install
cp .env.example .env   # set values if needed
npm run dev
```

### Terminal B (Frontend)
```
cd client
npm install
cp .env.example .env
npm run dev
```
