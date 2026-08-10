# Smart Expense Tracker

A full-stack Expense Tracker web application built using the MERN Stack that helps users manage their personal finances efficiently. The application allows users to track income and expenses, manage monthly budgets, visualize financial data through charts, and export transaction records.

---

# Project Overview

Smart Expense Tracker is a Final Year BCA project developed to simplify personal finance management. It provides a secure platform where users can record daily financial transactions, monitor spending habits, and manage budgets effectively through an intuitive and responsive interface.

---

# Features

## User Authentication
- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Password Encryption using bcrypt

## Income Management
- Add Income
- Edit Income
- Delete Income
- View Income History

## Expense Management
- Add Expense
- Edit Expense
- Delete Expense
- Categorize Expenses
- Track Monthly Expenses

## Dashboard
- Financial Summary
- Total Income
- Total Expenses
- Current Balance
- Recent Transactions
- Interactive Charts

## Budget Management
- Create Monthly Budgets
- Category-wise Budget Limits
- Budget Monitoring
- Overspending Alerts

## Reports
- Expense Analytics
- Monthly Statistics
- Graphical Reports
- Export Transactions to Excel

## Responsive Design
- Desktop Support
- Tablet Support
- Mobile Friendly

---

# Technology Stack

## Frontend
- React.js
- Vite
- React Router DOM
- Axios
- Recharts
- Framer Motion
- React Hot Toast
- Lucide React
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- XLSX
- dotenv

---

# Project Structure

```
Smart-Expense-Tracker/
│
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/Wali-Hamid/Smart-Expense-Tracker.git
```

## Navigate to the Project

```bash
cd Smart-Expense-Tracker
```

## Install Frontend Dependencies

```bash
cd client
npm install
```

## Install Backend Dependencies

```bash
cd ../server
npm install
```

---

# Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=4000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# Run the Application

## Start Backend

```bash
cd server
npm run dev
```

## Start Frontend

```bash
cd client
npm run dev
```

---

# Screenshots

Add screenshots of:

- Login Page
- Register Page
- Dashboard
- Income Page
- Expense Page
- Budget Management
- Analytics Dashboard
- Mobile View

---

# Security Features

- JWT Authentication
- Password Hashing
- Protected API Routes
- Environment Variables
- Input Validation
- Secure MongoDB Connection

---

# Future Enhancements

- Google Authentication
- Forgot Password
- Email Verification
- Dark Mode
- AI-Based Expense Insights
- Multi-Currency Support
- Recurring Transactions
- Push Notifications
- Progressive Web App (PWA)

---

# Learning Outcomes

This project helped in gaining practical experience with:

- MERN Stack Development
- REST API Development
- Authentication and Authorization
- MongoDB Database Design
- CRUD Operations
- Responsive Web Design
- Data Visualization
- Git and GitHub Version Control

---



---

# License

This project is developed for educational and learning purposes.

---

If you found this project useful, consider giving it a star on GitHub.
