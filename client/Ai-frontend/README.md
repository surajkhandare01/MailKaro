# 🤖 AI Email Generator

A full-stack AI-powered email generation application built with **React, Node.js, Express.js, MongoDB, and Google Gemini AI**.

The application allows users to register and securely log in, generate professional emails from a simple topic, save generated emails, view email history, update emails, delete emails, and copy generated content.

---

## 🚀 Features

### 🔐 Authentication

* User registration and login
* Password hashing using **bcrypt**
* JWT-based token authentication
* Protected backend API routes
* Protected frontend routes
* Authentication state using **React Context API**
* Logout functionality
* User-specific email data

### 🤖 AI Email Generation

* Generate professional emails using Google Gemini AI
* Generate emails from a simple topic
* AI-generated subject, greeting, body, and closing
* Save generated emails to MongoDB

### 📧 Email Management

* Generate emails
* View email history
* Update generated emails
* Delete generated emails
* Copy generated emails

### 🎨 Frontend

* React
* Vite
* React Router
* Axios
* React Hooks
* Context API
* Protected Routes
* Component-based architecture

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Middleware
* Controllers
* Services
* Request validation
* Global error handling

---

# 🏗️ System Architecture

```text
                         USER
                           │
                           ▼
                    React Frontend
                           │
                         Axios
                           │
                           ▼
                   Express REST API
                           │
                           ▼
                    Express Routes
                           │
                           ▼
                    Auth Middleware
                           │
                    JWT Verification
                           │
                           ▼
                      Controllers
                       /        \
                      /          \
                     ▼            ▼
              AI Service        Models
                  │                │
                  ▼                ▼
              Gemini API        MongoDB
                  │                │
                  └───────┬────────┘
                          ▼
                     Controller
                          │
                          ▼
                    Axios Response
                          │
                          ▼
                    React Frontend
```

---

# 🔄 Complete Application Flow

## Authentication Flow

```text
User
  ↓
React Login/Register Form
  ↓
Axios Request
  ↓
Express Auth Route
  ↓
Auth Controller
  ↓
MongoDB User
  ↓
bcrypt Password Verification
  ↓
JWT Token Generated
  ↓
Token Returned to React
  ↓
AuthContext Stores Authentication State
  ↓
Protected Routes Become Available
```

For protected requests:

```text
React
  ↓
Axios
  ↓
Authorization: Bearer <JWT>
  ↓
Express
  ↓
Auth Middleware
  ↓
JWT Verification
  ↓
req.user
  ↓
Controller
```

If the token is invalid or missing:

```text
401 Unauthorized
```

---

# 🤖 AI Email Generation Flow

```text
User enters email topic
        ↓
React Generate Email Page
        ↓
Axios POST request
        ↓
JWT Authentication
        ↓
Express Route
        ↓
Auth Middleware
        ↓
Email Controller
        ↓
AI Service
        ↓
Google Gemini API
        ↓
Generated Email
        ↓
MongoDB
        ↓
Response
        ↓
React
        ↓
Generated Email displayed
```

---

# 📂 Project Structure

```text
AI-Email-Generator/
 │ ├── client/ 
 │ └── Ai-frontend/ 
 │  ├── public/ 
 │  ├── src/ 
 │  ├── assets/ 
 │ 
 │ 
 │ 
 │ 
 │ 
 ├── components/ 
 │ 
 │ 
 │ 
 ├── EmailCard.jsx 
 │ 
 │ 
 │ 
 ├── Footer.jsx 
 │ 
 │ 
 │ 
 ├── Loader.jsx 
 │ 
 │ 
 │ 
 ├── Navbar.jsx 
 │ 
 │ 
 │ └── ProtectedRoute.jsx 
 │ 
 │ 
 │ 
 │ 
 │ 
 ├── context/ 
 │ 
 │ 
 │ └── AuthContext.jsx 
 │ 
 │ 
 │ 
 │ 
 │ 
 ├── Pages/ 
 │ 
 │ 
 │ 
 ├── Dashboard.jsx 
 │ 
 │ 
 │ 
 ├── GenerateEmail.jsx 
 │ 
 │ 
 │ 
 ├── History.jsx 
 │ 
 │ 
 │ 
 ├── Home.jsx 
 │ 
 │ 
 │ 
 ├── Login.jsx 
 │ 
 │ 
 │ 
 ├── Logout.jsx 
 │ 
 │ 
 │ 
 └── Register.jsx 
 │ 
 │ 
 │ 
 │ 
 │ 
 ├── Services/ 
 │ 
 │ 
 │ 
 └── api.js 
 │ 
 │ 
 │ 
 │ 
 │ 
 ├── App.css 
 │ 
 │ 
 ├── App.jsx 
 │ 
 │ 
 ├── index.css 
 │ 
 │ 
 └── main.jsx 
 │ 
 │ 
 │ 
 ├── .gitignore 
 │ 
 ├── eslint.config.js 
 │ 
 ├── index.html 
 │ 
 ├── package.json 
 │ 
 ├── package-lock.json 
 │ 
 └── vite.config.js 
 │ 
 ├── server/ 
 │ 
 │ 
 │ 
 ├── config/ 
 │ 
 │ 
 └── db.js 
 │ 
 │ 
 │ 
 ├── controllers/ 
 │ 
 │ 
 ├── authController.js 
 │ 
 │ 
 └── emailController.js 
 │ 
 │ 
 │ 
 ├── middleware/ 
 │ 
 │ 
 ├── authMiddleware.js 
 │ 
 │ 
 └── errorMiddleware.js 
 │ 
 │ 
 │ 
 ├── models/ 
 │ 
 │ 
 ├── Email.js 
 │ 
 │ 
 └── User.js 
 │ 
 │ 
 │ 
 ├── routes/ 
 │ 
 │ 
 ├── authRoutes.js 
 │ 
 │ 
 └── emailRoutes.js 
 │ 
 │ 
 │ 
 ├── services/ 
 │ 
 │ 
 └── aiService.js 
 │ 
 │ 
 │ 
 ├── package.json 
 │ 
 ├── package-lock.json 
 │ 
 ├── server.js 
 │ 
 └── .gitignore 
 │ 
 └── README.md
```

---

# 🧠 Backend Architecture

The backend follows a modular structure inspired by the **MVC pattern**, with a separate service layer.

### Routes

Routes define API endpoints and connect incoming requests to controllers.

Example:

```text
POST /api/auth/login
POST /api/auth/register
POST /api/email/generate-email
GET  /api/email/history
PUT  /api/email/:id
DELETE /api/email/:id
```

### Controllers

Controllers contain the request-response logic.

For example:

```text
Request
   ↓
Controller
   ↓
Validate input
   ↓
Call Service / Model
   ↓
Response
```

### Services

Services contain reusable application logic that should be separated from controllers.

In this project:

```text
emailController
      ↓
aiService
      ↓
Google Gemini API
```

This keeps the Gemini integration separate from the HTTP request-response logic.

### Models

Mongoose models define the structure of MongoDB documents and provide methods for database operations.

Models:

```text
User
Email
```

### Middleware

Middleware runs between the incoming request and the controller.

This project uses middleware for:

* JWT authentication
* Global error handling
* Request processing

---

# ⚛️ Frontend Architecture

The frontend uses a component-based React architecture.

### State

`useState()` is used for component-level state such as:

```text
Email
Password
Topic
Generated Email
Loading State
Editing State
```

When state changes, React re-renders the component.

### Effects

`useEffect()` is used for side effects such as loading email history when the History page is opened.

```text
History Page
     ↓
useEffect()
     ↓
Axios GET
     ↓
Backend
     ↓
MongoDB
     ↓
Email History
```

### Context API

`AuthContext` provides shared authentication state to components without passing authentication data through multiple levels of props.

This prevents **prop drilling**.

### Protected Routes

`ProtectedRoute` prevents unauthenticated users from accessing protected frontend pages.

```text
/dashboard
/history
/generate
```

Flow:

```text
User
  ↓
ProtectedRoute
  ↓
Token exists?
  ├── Yes → Page
  └── No  → Login
```

---

# 🔌 API Endpoints

## Authentication

| Method | Endpoint             | Description     | Protected |
| ------ | -------------------- | --------------- | --------- |
| POST   | `/api/auth/register` | Register a user | No        |
| POST   | `/api/auth/login`    | Login user      | No        |

## Email

| Method | Endpoint                    | Description                | Protected |
| ------ | --------------------------- | -------------------------- | --------- |
| POST   | `/api/email/generate-email` | Generate and save AI email | Yes       |
| GET    | `/api/email/history`        | Get user's email history   | Yes       |
| PUT    | `/api/email/:id`            | Update an email            | Yes       |
| DELETE | `/api/email/:id`            | Delete an email            | Yes       |

---

# 🔐 Security

The application includes:

### Password Security

Passwords are never stored as plain text.

```text
User Password
      ↓
bcrypt.hash()
      ↓
Hashed Password
      ↓
MongoDB
```

During login:

```text
Entered Password
      ↓
bcrypt.compare()
      ↓
Stored Hash
      ↓
Match?
```

### JWT Authentication

After successful login:

```text
User Credentials
      ↓
Validation
      ↓
JWT Generated
      ↓
Frontend
```

Protected requests send:

```text
Authorization: Bearer <JWT>
```

The backend verifies the token using authentication middleware.

### Environment Variables

Sensitive values such as:

```text
MONGODB_URI
JWT_SECRET
GEMINI_API_KEY
```

are stored in environment variables instead of source code.

`.env` is excluded from Git using `.gitignore`.

---

# 🧩 Why These Technologies?

### Why React?

React provides:

* Reusable components
* State management
* Efficient UI updates
* Component-based architecture

### Authentication Testing

```text
Register
   ↓
Login
   ↓
Receive JWT
   ↓
Copy JWT
   ↓
Use Bearer Token
   ↓
Access Protected APIs
```

### Email Testing

```text
Generate Email
      ↓
View History
      ↓
Update Email
      ↓
Delete Email
```

---

# ⚙️ Environment Variables

Create:

```text
server/.env
```

Add:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Never commit real credentials to GitHub.

Recommended `.gitignore`:

```text
node_modules/
.env
```

---

# 🛠️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/reshmarajendran84-alt/AI-Email-Generator-

cd AI-Email-Generator
```

## 2. Install Backend Dependencies

```bash
cd server
npm install
```

## 3. Configure Environment Variables

Create:

```text
server/.env
```

and add the required variables.

## 4. Start Backend

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

## 5. Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

## 6. Start Frontend

```bash
npm run dev
```

Vite will provide the frontend development URL in the terminal.

---

# 🧭 Complete Request Flow Example

For generating an email:

```text
1. User enters topic
        ↓
2. React stores topic using useState
        ↓
3. User clicks Generate
        ↓
4. Axios sends POST request
        ↓
5. Express receives request
        ↓
6. Route directs request to controller
        ↓
7. Auth middleware verifies JWT
        ↓
8. Controller validates topic
        ↓
9. Controller calls AI Service
        ↓
10. AI Service calls Gemini
        ↓
11. Gemini generates email
        ↓
12. Controller saves email using Mongoose
        ↓
13. MongoDB stores email
        ↓
14. Backend returns response
        ↓
15. Axios receives response
        ↓
16. React updates state
        ↓
17. Generated email appears in UI
```

---

# 💡 Important Concepts Demonstrated

This project demonstrates practical knowledge of:

* React components
* JSX
* Props
* State
* Hooks
* `useState`
* `useEffect`
* Context API
* React Router
* Protected Routes
* Axios
* REST APIs
* Express Routes
* Controllers
* Middleware
* Services
* Mongoose Models
* MongoDB
* JWT authentication
* bcrypt password hashing
* API validation
* Error handling
* Third-party API integration
* AI API integration
* CRUD operations
* Git and GitHub

---

# 🔮 Future Improvements

Possible future improvements include:

* Responsive and polished UI
* Multiple AI writing tones
* Email templates
* Search and filtering
* Pagination
* Rich text editor
* User profile
* Dark mode
* Email export/download
* Production deployment
* Automated testing
* Refresh-token authentication
* Axios authentication interceptor

---

# 👩‍💻 Author

**Reshma Rajendran**

Full-Stack AI Email Generator built with:

```text
React
Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
Axios
Google Gemini AI
```

---

## ⭐ Project Summary

This project demonstrates a complete full-stack workflow:

```text
Frontend
   ↓
Authentication
   ↓
REST API
   ↓
Middleware
   ↓
Controllers
   ↓
Services
   ↓
AI Integration
   ↓
Database
   ↓
Response
   ↓
Frontend UI
```

The project combines **full-stack development, authentication, database management, REST APIs, and generative AI** into a single application.
