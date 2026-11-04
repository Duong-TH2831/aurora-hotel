# Aurora Hotel — Boutique Luxury Booking Platform

Hệ thống đặt phòng trực tuyến cao cấp (Luxury Boutique Hotel Booking Platform) đạt chuẩn Production Ready: giao diện trực quan, trải nghiệm mượt mà, kiểm soát tình trạng phòng và giá theo thời gian thực, ngăn chặn tình trạng overbooking.

## Tech Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, GSAP Animations, Lenis Smooth Scroll
- **Backend:** Next.js Server Actions & API Routes
- **Database:** PostgreSQL (Neon Serverless) + Prisma ORM
- **Auth:** Auth.js (NextAuth v5)
- **Media & Storage:** Vercel Blob Storage
- **Testing:** Playwright E2E, Vitest, Axe-core Accessibility

## Quick Start

### 1. Cài đặt Dependencies
```bash
npm install
```

### 2. Cấu hình biến môi trường
Sao chép `.env.example` thành `.env` và điền cấu hình Database & Auth:
```bash
cp .env.example .env
```

### 3. Đồng bộ Database
```bash
npx prisma generate
npm run db:migrate
npm run db:seed
```

### 4. Khởi chạy Development Server
```bash
npm run dev
```
Truy cập ứng dụng tại `http://localhost:3000`.

## Tác giả / Developer
- **Họ và tên:** Đỗ Hồng Dương
- **Email:** doduong27032003@gmail.com
- **GitHub:** [@Duong-TH2831](https://github.com/Duong-TH2831)
- **Repository:** [https://github.com/Duong-TH2831/aurora-hotel](https://github.com/Duong-TH2831/aurora-hotel)

## Required verification

Run the declared gates in order: lint, typecheck, test, build, e2e. A pending, skipped, stale, or manually asserted result is not green evidence.

## Ownership

Agent OS managed files are protected by `.agent-os/lock.json`. Project-owned files may be edited after generation.
