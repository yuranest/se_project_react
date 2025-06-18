
# WTWR (What to Wear?) — Project 14 | Sprint 14

WTWR is a full-stack weather-based clothing recommendation app built with React and Express/MongoDB.  
Users can view the current weather, toggle between Fahrenheit and Celsius, register/login, edit their profile, and manage a personal clothing inventory.

## 🚀 Features

- Real-time weather display using OpenWeather API
- JWT-based authentication (register, login, logout)
- Protected routes (Profile page only for authorized users)
- Token persisted in localStorage
- Profile page with avatar & user name (editable)
- Temperature unit toggle switch (Fahrenheit ↔ Celsius)
- Responsive design (desktop and mobile)
- Add/Delete clothing items (connected to backend API)
- Like/unlike clothing items
- Modal forms for item interaction
- "or Register" / "or Log in" switch between modals (UX requirement from Figma)
- Weather-based clothing filtering on main page

## 🛠️ Technologies

- React 18
- React Router DOM v6
- Context API for temperature toggle & user context
- Vite for development server and build tool
- Express.js + MongoDB backend (Project 12/13)
- JWT Authentication
- CSS Modules & normalize.css for styling

## 📦 Setup Instructions

### Frontend (React app)

```bash
git clone https://github.com/yuranest/se_project_react.git
cd se_project_react
npm install
npm run dev
```

### Backend (Express API — Project 12/13)

```bash
git clone https://github.com/yuranest/se_project_express.git
cd se_project_express
npm install
npm run start
```

> ⚠️ Make sure your MongoDB is running (`mongod`) and `.env` is configured.

## 📊 API Endpoints (Express backend)

### Items:

- GET /items — Get all items
- POST /items — Create new item (auth required)
- DELETE /items/:id — Delete item (auth required)
- PUT /items/:id/likes — Like item (auth required)
- DELETE /items/:id/likes — Unlike item (auth required)

### Users:

- POST /signup — Register new user
- POST /signin — Login user
- GET /users/me — Get user profile (auth required)
- PATCH /users/me — Update user profile (auth required)

### Weather API:

- GET OpenWeather API (client-side)

## 📄 Backend Repository

[https://github.com/yuranest/se_project_express.git](https://github.com/yuranest/se_project_express.git)

---

## ✨ Future Enhancements

- Improved form validation
- Better UX for loading/error states
- "My wardrobe" personal filtering
- Edit/Delete own items

---

© 2025 WTWR Project | Developed by Yuriy Nesterenko
