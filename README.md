# CareSync - Hospital Staff Management System

A full-stack web application for managing hospital staff operations including attendance tracking, leave management, payslip generation, and automated email reminders via background jobs.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-CareSync-eosin.vercel.app-brightblue?style=for-the-badge)](https://care-sync-frontend-pi.vercel.app/login)
[![GitHub](https://img.shields.io/badge/GitHub-nikitatale-black?style=for-the-badge&logo=github)](https://github.com/nikitatale/ApnaStay)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Nikita_Tale-0077B5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/nikita-tale)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Background Jobs (Inngest)](#background-jobs-inngest)
- [Roles & Permissions](#roles--permissions)
- [Deployment](#deployment)

---

## Overview

**CareSync** is a role-based Hospital Staff Management System designed to streamline HR operations for hospitals. It supports two user roles — **Admin** and **Staff** — each with a dedicated dashboard. The system automates critical workflows like attendance reminders, checkout alerts, and leave approval notifications using Inngest background jobs.

---

## ✨ Features

### 👩‍💼 Admin
- View overview dashboard: total staff, departments, today's attendance, pending leaves
- Add, edit, soft-delete staff members
- Manage staff across 10 hospital departments
- Approve or reject leave applications
- Generate and view payslips for any staff member
- Monitor all attendance records

### 👤 Staff
- Personal dashboard with monthly attendance count, pending leaves, and latest payslip
- Check in / Check out for daily attendance (with late detection)
- Apply for leave with date validation
- View personal attendance history and leave history
- View and print payslips
- Update profile and change password

### 🤖 Automated Background Jobs
- **Auto Check-Out**: If a staff member forgets to check out, a reminder email is sent after 9 hours; attendance is auto-closed as Half Day after 10 hours
- **Leave Reminder**: Admin is notified by email if a leave application remains pending for more than 24 hours
- **Daily Attendance Cron**: Runs at 11:30 AM IST every day — identifies absent staff (excluding those on approved leave) and sends reminder emails

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **React Router DOM v7** | Client-side routing |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |
| **React Hot Toast** | Toast notifications |
| **date-fns** | Date formatting utilities |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT (jsonwebtoken)** | Authentication |
| **bcrypt** | Password hashing |
| **Inngest** | Background jobs & cron scheduling |
| **Nodemailer** | Email notifications |
| **Multer** | Multipart form handling |
| **dotenv** | Environment config |
| **cors** | Cross-origin resource sharing |

### Deployment
| Platform | Service |
|---|---|
| **Vercel** | Frontend & Backend deployment |
| **MongoDB Atlas** | Cloud database |
| **Brevo (Sendinblue)** | SMTP email service |
| **Inngest Cloud** | Background job orchestration |

---

## 📁 Project Structure

```
caresync/
├── backend/
│   ├── config/
│   │   ├── db.js                   # MongoDB connection
│   │   └── nodemailer.js           # Email transport config
│   ├── constants/
│   │   └── departments.js          # 10 hospital departments
│   ├── controllers/
│   │   ├── authController.js       # Login/logout
│   │   ├── StaffController.js      # CRUD for staff
│   │   ├── attendanceController.js # Clock in/out, history
│   │   ├── leaveController.js      # Apply, view, update leave
│   │   ├── paySlipController.js    # Generate & view payslips
│   │   ├── dashboardController.js  # Role-based dashboard data
│   │   └── profileController.js   # Profile update
│   ├── inngest/
│   │   └── index.js               # Background jobs & cron
│   ├── middleware/
│   │   └── auth.js                # JWT protect & protectAdmin
│   ├── models/
│   │   ├── User.js                # Auth user (email, password, role)
│   │   ├── Staff.js               # Staff profile & salary info
│   │   ├── Attendance.js          # Daily attendance records
│   │   ├── LeaveApplication.js    # Leave requests
│   │   └── PaySlip.js             # Monthly payslips
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── staffRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── leaveRoutes.js
│   │   ├── payslipRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── profileRoutes.js
│   ├── seed.js                    # Database seeder
│   ├── server.js                  # Express app entry point
│   └── vercel.json
│
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── axios.js           # Axios instance with base URL + token
    │   ├── components/
    │   │   ├── AdminDashboard.jsx
    │   │   ├── StaffDashboard.jsx
    │   │   ├── StaffForm.jsx
    │   │   ├── StaffCard.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── LoginForm.jsx
    │   │   ├── ProfileForm.jsx
    │   │   ├── ChangePasswordModel.jsx
    │   │   ├── attendance/
    │   │   │   ├── CheckInButton.jsx
    │   │   │   ├── AttendanceHistory.jsx
    │   │   │   └── AttendanceStats.jsx
    │   │   ├── leave/
    │   │   │   ├── ApplyLeaveModel.jsx
    │   │   │   └── LeaveHistory.jsx
    │   │   └── payslip/
    │   │       ├── GeneratePayslipForm.jsx
    │   │       └── PayslipList.jsx
    │   ├── context/
    │   │   └── authContext.jsx    # Auth state context
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Staff.jsx
    │   │   ├── Attendance.jsx
    │   │   ├── Leave.jsx
    │   │   ├── Payslip.jsx
    │   │   ├── Settings.jsx
    │   │   ├── PrintPayslip.jsx   # Print-ready payslip view
    │   │   ├── Layout.jsx
    │   │   └── LandingPage.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── vercel.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Inngest account
- SMTP credentials (Brevo / Gmail)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/caresync.git
cd caresync
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend` (see [Environment Variables](#environment-variables)).

```bash
# Seed initial admin user (optional)
npm run seed

# Start development server
npm run server
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `/frontend`:

```env
VITE_BASE_URL=http://localhost:8080/api
```

```bash
npm run dev
```

---

## 🔐 Environment Variables

### Backend (`/backend/.env`)

```env
# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/caresync

# JWT
JWT_SECRET=your_jwt_secret_key

# Admin Email (receives leave reminders)
ADMIN_EMAIL=admin@yourhospital.com

# Inngest (background jobs)
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# SMTP (email sending via Brevo or other provider)
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
SENDER_EMAIL=noreply@yourhospital.com
```

### Frontend (`/frontend/.env`)

```env
VITE_BASE_URL=https://your-backend-url.vercel.app/api
```

---

## 📡 API Endpoints

All protected routes require `Authorization: Bearer <token>` header.

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Login (Admin or Staff) |
| POST | `/api/auth/logout` | Protected | Logout |

### Staff
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/staffs` | Admin | Get all staff (filter by dept) |
| POST | `/api/staffs` | Admin | Create new staff |
| PUT | `/api/staffs/:id` | Admin | Update staff |
| DELETE | `/api/staffs/:id` | Admin | Soft delete staff |

### Attendance
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/attendance/clock` | Staff | Check in / Check out |
| GET | `/api/attendance` | Staff | Get own attendance history |

### Leave
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/leave` | Staff | Apply for leave |
| GET | `/api/leave` | Admin / Staff | Get leaves (role-based) |
| PATCH | `/api/leave/:id` | Admin | Approve / Reject leave |

### Payslip
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/payslips` | Admin | Generate payslip |
| GET | `/api/payslips` | Admin / Staff | Get payslips (role-based) |
| GET | `/api/payslips/:id` | Protected | Get payslip by ID |

### Dashboard
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/dashboard` | Protected | Role-based dashboard data |

### Profile
| Method | Endpoint | Access | Description |
|---|---|---|---|
| PUT | `/api/profile` | Protected | Update profile |
| PUT | `/api/profile/password` | Protected | Change password |

---

## ⚙️ Background Jobs (Inngest)

CareSync uses **Inngest** for durable background workflows:

### 1. `auto-check-out`
- **Trigger**: `staff/check-out` event (fires on every check-in)
- **Flow**:
  1. Waits 9 hours after check-in
  2. If no checkout found → sends reminder email to staff
  3. Waits 1 more hour
  4. If still no checkout → auto-closes attendance as **Half Day (4 hrs, LATE)**

### 2. `leave-application-remainder`
- **Trigger**: `leave/pending` event (fires on new leave application)
- **Flow**:
  1. Waits 24 hours
  2. If leave is still `PENDING` → sends reminder email to Admin

### 3. `attendance-remainder-cron`
- **Trigger**: Cron — every day at **11:30 AM IST**
- **Flow**:
  1. Fetches all active staff
  2. Excludes staff on approved leave
  3. Excludes staff who already checked in
  4. Sends attendance reminder emails to absent staff

---

## 🔑 Roles & Permissions

| Feature | Admin | Staff |
|---|---|---|
| View all staff | ✅ | ❌ |
| Add / Edit / Delete staff | ✅ | ❌ |
| View all leave applications | ✅ | ❌ |
| Approve / Reject leaves | ✅ | ❌ |
| Generate payslips | ✅ | ❌ |
| View all payslips | ✅ | ❌ |
| Clock in / Clock out | ❌ | ✅ |
| Apply for leave | ❌ | ✅ |
| View own attendance | ❌ | ✅ |
| View own payslips | ❌ | ✅ |
| Update profile | ✅ | ✅ |
| Change password | ✅ | ✅ |

---

## 🏥 Hospital Departments

CareSync supports 10 departments out of the box:

`Cardiology` · `Neurology` · `Orthopedics` · `Pediatrics` · `Emergency` · `Radiology` · `Oncology` · `Pharmacy` · `ICU` · `General Medicine`

---

## 🌐 Deployment

### Vercel (Recommended)

Both frontend and backend are configured for Vercel deployment with `vercel.json`.

**Backend** — deploy the `/backend` folder; all routes are forwarded to `server.js`.

**Frontend** — deploy the `/frontend` folder; all routes are rewritten to `/` for SPA support.

Make sure to add all environment variables in the Vercel project settings dashboard.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 👩‍💻 About the Developer

**Nikita Tale** - Full-Stack Developer specializing in MERN Stack  
Open to work! Let's connect →  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?logo=linkedin)](https://www.linkedin.com/in/nikita-tale)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?logo=github)](https://github.com/nikitatale)

---

> ⭐ If you found this project interesting, please star it - it helps a lot!
