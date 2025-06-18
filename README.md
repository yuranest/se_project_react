# WTWR (What to Wear?) — Project 14

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

1. Clone the repo & install dependencies

```bash
git clone https://github.com/yuranest/se_project_react.git
cd se_project_react
npm install
```

2. Start the frontend (React app)

```bash
npm run dev
```

3. Start the backend (Express API — Project 12/13, se_project_express):

```bash
npm start
```

> ⚠️ Make sure your MongoDB is running (`mongod`) and `.env` is configured.

## 📊 API Endpoints (Express backend)

### Items:

- GET /items
- POST /items (auth required)
- DELETE /items/\:id (auth required)
- PUT /items/\:id/likes (auth required)
- DELETE /items/\:id/likes (auth required)

### User:

- POST /signup
- POST /signin
- GET /users/me (auth required)
- PATCH /users/me (auth required)

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
