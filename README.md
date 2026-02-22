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
========================================================================================================================================================================================
PART B – FRONTEND DEBUG & OPTIMIZATION (Solution )
Issue 1: No Debouncing (Too Many API Calls)
## The useEffect runs every time term changes.
1.Every keystroke triggers an API call.
2.Causes unnecessary network traffic.
3.Reduces performance.
4.Can overload the backend.

Issue 2: Incorrect Key Usage
This generates a new key on every render.
Problems:
Breaks React reconciliation.
Causes unnecessary re-renders.
Hurts performance.

Issue 3: No Error Handling / No Cleanup
No error handling for failed requests.
No cancellation of previous requests.
Can cause race conditions.
May update state after component unmounts.

Refactored Version
import { useState, useEffect } from "react";

const SearchUsers = () => {
  const [users, setUsers] = useState([]);
  const [term, setTerm] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const debounce = setTimeout(async () => {
      try {
        if (!term.trim()) {
          setUsers([]);
          return;
        }

        const res = await fetch(
          `https://api.example.com/users?q=${term}`,
          { signal: controller.signal }
        );

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching users:", error);
        }
      }
    }, 500); // Debounce 500ms

    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [term]);

  return (
    <div>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search users..."
      />

      {users.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}
    </div>
  );
};

export default SearchUsers;

 How These Fixes Improve Performance & Reliability
1. Debouncing

Reduces number of API calls

Improves backend efficiency

Prevents unnecessary requests

2. Stable Keys (u.id)

Improves React reconciliation

Prevents unnecessary re-renders

Makes UI predictable

3. AbortController & Cleanup

Prevents memory leaks

Avoids race conditions

Stops outdated requests

Improves reliability

PART C – BACKEND DEBUG & SECURITY
1. Identify Security Vulnerabilities & Bad API Practices
This could:
Expose all records
Modify database
Destroy data
Vulnerability 2: No RBAC Enforcement
Bad practice:
Inconsistent API structure
Hard for frontend to handle
Bad API Practice 2: No Input Validation


####Refactored Secure Version
app.get(
  "/api/admin/reports",
  verifyToken,
  verifyAdmin, //  Enforce RBAC
  async (req, res) => {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    try {
      //  Parameterized query prevents SQL Injection
      const query = "SELECT * FROM reports WHERE category = $1";
      const result = await db.query(query, [category]);

      return res.status(200).json({
        success: true,
        count: result.rows.length,
        data: result.rows,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

How This Improves Security
 1. Parameterized Queries

Prevents SQL injection

Treats input as data, not executable SQL

Protects database integrity

 2. RBAC Enforcement

Only admins can access reports

Prevents privilege escalation

Enforces least-privilege principle

 3. Input Validation

Ensures required parameters exist

Prevents undefined behavior

 4. Consistent JSON Responses

Easier frontend handling

Professional API design

Clear success/error states
