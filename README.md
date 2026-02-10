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

## Render Deployment (Step-by-Step)

This section provides a full Render deployment flow for the backend, user store frontend, and admin dashboard frontend.

### 1) Backend API (Render Web Service)

1. Create a **new Web Service** in Render and connect this repository.
2. **Root Directory:** `backend`
3. **Environment:** `Node`
4. **Build Command:** `npm install`
5. **Start Command:** `npm start`
6. **Environment Variables (Backend):**
   - `MONGO_URI` = your MongoDB connection string (MongoDB Atlas recommended)
   - `JWT_SECRET` = a strong secret (e.g. `openssl rand -base64 32`)
   - `NODE_ENV` = `production`
   - `PORT` = `4000` (Render sets `PORT` automatically, but keeping it explicit is OK)
7. Deploy. After it boots, note your backend URL, e.g. `https://ember-api.onrender.com`.

### 2) User Store Frontend (Render Static Site)

1. Create a **new Static Site** in Render and connect this repository.
2. **Root Directory:** `user-frontend`
3. **Build Command:** `npm install && npm run build`
4. **Publish Directory:** `dist`
5. **Environment Variables (User Store):**
   - `VITE_API_URL` = `https://ember-api.onrender.com/api`
   - `VITE_ADMIN_URL` = `https://ember-admin.onrender.com`
6. Deploy. Note your user store URL, e.g. `https://ember-store.onrender.com`.

### 3) Admin Dashboard Frontend (Render Static Site)

1. Create a **new Static Site** in Render and connect this repository.
2. **Root Directory:** `admin-frontend`
3. **Build Command:** `npm install && npm run build`
4. **Publish Directory:** `dist`
5. **Environment Variables (Admin Dashboard):**
   - `VITE_API_URL` = `https://ember-api.onrender.com/api`
6. Deploy. Note your admin dashboard URL, e.g. `https://ember-admin.onrender.com`.

### 4) Render .env Reference (Copy/Paste)

**Backend (Render Web Service)**
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/ember-commerce
JWT_SECRET=replace-with-strong-secret
NODE_ENV=production
PORT=4000
```

**User Store Frontend (Render Static Site)**
```
VITE_API_URL=https://ember-api.onrender.com/api
VITE_ADMIN_URL=https://ember-admin.onrender.com
```

**Admin Dashboard Frontend (Render Static Site)**
```
VITE_API_URL=https://ember-api.onrender.com/api
```

### 5) Post-Deploy Checklist

- Confirm backend is reachable: `https://ember-api.onrender.com/`
- Create an admin user or set an existing user’s `role: admin` in MongoDB.
- Log in to the admin dashboard and manage branding, theme, categories, and products.
- Verify the user storefront loads categories, products, and the admin redirect link for admin users.

## API Collections

- Users
- Products
- Categories
- Orders
- AdminSettings
- BrandingSettings
- PaymentSettings
- ThemeSettings
