## 📌 Project Objectives

- Build a secure, scalable backend
- Integrate backend APIs with a React + TypeScript frontend
- Implement real-world collaboration features
- Follow production-grade architecture and best practices

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- Axios
- Context API (Auth & Global State)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.IO (WebRTC signaling)
- Multer (File uploads)

### Tools
- Hoppscotch (API testing)
- Git & GitHub

---

## 🔐 Core Features

### 1. Authentication & Authorization
- User Registration & Login
- JWT-based authentication
- Secure password hashing (bcrypt)
- Role-based access:
  - Investor
  - Entrepreneur
- Protected routes
- `/users/me` profile endpoint

---

### 2. User Profiles
- Basic profile information:
  - Name
  - Email
  - Role
  - Bio
- Role-specific profile extensions:
  - Entrepreneur profile
  - Investor profile
- Profile update support

---

### 3. Meeting Scheduling System
- Investors can schedule meetings with Entrepreneurs
- Entrepreneurs can:
  - Accept meetings
  - Reject meetings
- Meeting states:
  - Pending
  - Accepted
  - Rejected
- Conflict detection to prevent double booking
- Meetings stored in database and fetched via API

---

### 4. Video Calling (Basic)
- WebRTC-based video calling
- Socket.IO signaling server
- Features:
  - Join room
  - Toggle audio/video
  - End call

---

### 5. Document Processing Chamber
- Document upload API
- File storage handling
- Document preview support
- Metadata stored in database:
  - Uploaded by
  - Version
  - Status
- E-signature storage (signature linked to document)

---

### 6. Payment Module (Mock Integration)
- Payment simulation using sandbox logic
- Transaction APIs:
  - Deposit
  - Withdraw
  - Transfer
- Transaction status tracking:
  - Pending
  - Completed
  - Failed
- Transaction history view in dashboard

---

### 7. Security Enhancements
- Input validation and sanitization
- Protection against XSS & injection attacks
- Secure JWT handling
- Password hashing
- Role-based authorization
- Mock 2FA (OTP / Email)

---

## 📂 Project Structure

### Frontend
```

frontend/
├── src/
│   ├── components/
│   │   ├── chat/
│   │   ├── collaboration/
│   │   ├── entrepreneur/
│   │   ├── investor/
│   │   ├── layout/
│   │   └── ui/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── meetings/
│   │   ├── profile/
│   │   └── settings/
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── meeting.service.ts
│   │   ├── document.service.ts
│   │   └── payment.service.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx

```

### Backend
```

backend/
├── controllers/
├── routes/
├── models/
├── middlewares/
├── utils/
├── sockets/
├── server.js
└── app.js

```

---

## 🔄 Frontend–Backend Integration Status

| Feature | Status |
|------|------|
| Authentication | ✅ Integrated |
| Profile APIs | ✅ Integrated |
| Meetings | ✅ Integrated |
| Video Calling | ✅ Backend Ready |
| Documents | ✅ Backend Ready |
| Payments | ✅ Mock Integrated |
| Security | ✅ Implemented |

---

## 🧪 API Testing

All backend APIs have been tested using **Hoppscotch** before frontend integration to ensure correctness and stability.

---

## 📑 Documentation

- API endpoints documented via Postman / Swagger
- Weekly progress documented as part of internship requirements
- Code structured for maintainability and scalability

---

## 🎯 Internship Deliverables Covered

- Full Stack Application (MERN)
- Backend API Development
- Frontend Integration (React + TypeScript)
- Role-based Authentication
- Real-world features (Meetings, Docs, Payments)
- Security best practices

---

## 👨‍💻 Author

**Mehtab Ali**  
Full Stack Development Intern  
MERN Stack Developer

---

## 📜 License

This project is developed for educational and internship purposes.

