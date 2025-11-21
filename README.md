# Dish Manager — Full Stack Application

A full-stack web application that manages dishes, allows toggling their **published/unpublished** status, and provides **real-time UI updates** using polling or MongoDB Change Streams.

This project includes:

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Socket.IO  
- **Frontend:** React.js (Vite), Axios, Socket.IO client  
- **Database:** MongoDB (Docker)  
- **Extra:** Real-time UI updates, clean folder structure, reusable components

---

## 🚀 Features

### 🟢 Backend (Node.js + Express + MongoDB)
- REST API endpoints:
  - `GET /api/dishes` — fetch all dishes  
  - `PATCH /api/dishes/:id/toggle` — toggle publish state  
- MongoDB with Mongoose schema  
- Real-time updates using:
  - MongoDB Change Streams (if `USE_CHANGE_STREAMS=true`)
  - OR fallback polling every 5 seconds  
- Socket.IO for event-based communication  
- Clean MVC structure:
  - controllers  
  - routes  
  - models  
  - config  
  - seed data  

---

### 🔵 Frontend (React + Vite)
- Displays all dishes (name, image, publish status)
- Toggle publish/unpublish button
- Live UI updates when:
  - User toggles a dish  
  - Backend updates happen externally  
- Well-structured components:
  - `DishCard`
  - `DishList`
- Axios for API calls  
- Socket.IO for live updates  
- Modern UI layout  

---

### 🟡 Database (MongoDB via Docker)
Simple Docker command used:

```bash
docker run -d --name mongodb -p 27017:27017 -v mongodbdata:/data/db mongo




dish-manager/
│
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/db.js
│   │   ├── socket.js
│   │   ├── controllers/dishController.js
│   │   ├── routes/dishRoutes.js
│   │   ├── models/Dish.js
│   │   └── seed/
│   │       ├── seed.js
│   │       └── dishes.json
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── DishCard.jsx
│   │   │   └── DishList.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── socket.js
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md






