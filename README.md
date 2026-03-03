# Aarohi - Premium Hotel Management System

A professional-grade, SEO-optimized hotel booking platform built with the modern React-Express-PostgreSQL stack.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, react-helmet-async (SEO)
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL
- **Architecture**: Separated Client/Server with feature-based frontend organization.

## Getting Started

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running

### 2. Setup Server
```bash
cd server
npm install
# Configure your .env (DATABASE_URL)
npx prisma generate
npm run dev
```

### 3. Setup Client
```bash
cd client
npm install
npm run dev
```

## Folder Structure
- `/client`: Frontend with SEO-focused components and feature modules.
- `/server`: REST API with layered architecture (Routes, Controllers, Services).
- `/docs`: Project documentation.

## SEO Best Practices Implemented
- Dynamic Head management using `react-helmet-async`.
- `robots.txt` and `sitemap.xml` templates provided.
- Semantic HTML tags used for accessibility and crawler indexing.
- Core Web Vitals optimized (code splitting, lazy loading).
