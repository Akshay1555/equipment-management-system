# Equipment Management System

##  Project Overview

This is a full-stack Equipment Management System built using:

- Frontend: React + Material UI
- Backend: Node.js + Express
- Database: SQLite
- Authentication: JWT (Role-Based Access Control)

The system allows users to request equipment and admins to manage equipment and approve/reject requests.

---

##  Features

###  Authentication
- JWT-based login
- Role-based access control (Admin/User)
- Protected routes

###  User Features
- View available equipment
- Request equipment

###  Admin Features
- Add new equipment
- View all equipment requests
- Approve or reject requests

---

##  Design Decisions

- Used JWT for stateless authentication
- Implemented RBAC (Role-Based Access Control)
- Used parameterized queries to prevent SQL injection
- Material UI used for modern responsive design
- SQLite chosen for simplicity and lightweight database

---

##  Setup Instructions

### Clone Repository


git clone https://github.com/YOUR_USERNAME/equipment-management.git
cd equipment-management
```

---

###  Backend Setup


cd backend
npm install
node server.js
```

Server runs on:
```
http://localhost:5000
```

---

###  Frontend Setup


cd frontend
npm install
npm start
```

App runs on:
```
http://localhost:3000
```

---

##  Database

SQLite database file is included.

Tables:
- users
- equipment
- requests

---

# Part A – Authentication & Security

- Implemented JWT authentication
- Passwords stored securely
- Token verified on protected routes
- Role-based access enforced on backend
- Parameterized SQL queries prevent SQL injection

---

# Part B – Dashboard & Functionality

- Admin can add equipment
- Users can view equipment
- Users can request equipment
- Admin can view all requests
- Admin can approve or reject requests
- Modern UI built using Material UI

---

# Part C – Security & Improvements

- RBAC enforced on both frontend and backend
- Middleware used for token verification
- Secure route protection
- Prevented unauthorized admin access
- Clean structured project architecture

---

##  Future Improvements

- Equipment image upload
- Search & filtering
- Pagination
- Email notifications
- Deployment to cloud

---

