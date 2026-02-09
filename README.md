# Project Ember E-Commerce

## Overview
This repository contains three separate projects that share one backend API and database:

- `user-frontend`: Customer-facing store (React + Vite)
- `admin-frontend`: Standalone admin dashboard (React + Vite)
- `backend`: Shared REST API + MongoDB

## Local Setup

### 1) Backend API

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

The API will run at `http://localhost:4000`.

### 2) User Store Frontend

```bash
cd user-frontend
cp .env.example .env
npm install
npm run dev
```

The store runs at `http://localhost:5173`.

### 3) Admin Dashboard Frontend

```bash
cd admin-frontend
cp .env.example .env
npm install
npm run dev
```

The admin dashboard runs at `http://localhost:5174`.

## Default Data

On the first backend boot, the default categories are seeded:

- Electronics
- Accessories
- Kitchen
- Furniture
- Fashion
- Others

## Authentication

- Users sign up via `/api/auth/signup`.
- Admins must have `role: admin` in MongoDB.
- Admin login uses `/api/admin/login`.

## Build & Deployment

1. Build the frontends:

```bash
cd user-frontend && npm run build
cd ../admin-frontend && npm run build
```

2. Deploy frontends to any static host (Netlify, Vercel, S3).
3. Deploy backend to a Node.js host and point frontends to `VITE_API_URL`.
4. Configure MongoDB connection in `backend/.env`.

## API Collections

- Users
- Products
- Categories
- Orders
- AdminSettings
- BrandingSettings
- PaymentSettings
- ThemeSettings

