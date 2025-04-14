# WTWR (What to Wear?) — Project 11

WTWR is a weather-based clothing recommendation app built with React. Users can view the current weather, toggle between Fahrenheit and Celsius, and manage a personal clothing inventory.

## 🚀 Features

- Real-time weather display using OpenWeather API
- Temperature unit toggle switch (Fahrenheit ↔ Celsius)
- Responsive design (desktop and mobile)
- Profile page with hardcoded user info
- Add/Delete clothing items (connected to json-server)
- Modal forms for item interaction
- Weather-based clothing filtering on main page

## 🛠 Technologies

- React 18
- React Router DOM v6
- Context API for temperature toggle
- Vite for development server and build tool
- json-server for mock backend API
- CSS Modules & normalize.css for styling

## 📁 Project Structure

```
src/
├── components/
│   ├── App/
│   ├── AddItemModal/
│   ├── ClothesSection/
│   ├── DeleteConfirmationModal/
│   ├── Footer/
│   ├── Header/
│   ├── ItemCard/
│   ├── ItemModal/
│   ├── Main/
│   ├── ModalWithForm/
│   ├── Profile/
│   ├── SideBar/
│   └── ToggleSwitch/
├── contexts/
│   └── CurrentTemperatureUnitContext.js
├── utils/
│   ├──constants.js
│   ├── api.js
│   └── weatherApi.js
├── vendor/
│   ├── fonts/
│   └── normalize.css
├── index.css
└── main.jsx
```

## 📦 Setup Instructions

1. Clone the repo & install dependencies

   ```bash
   git clone https://github.com/yourusername/se_project_react.git
   cd se_project_react
   npm install
   ```

2. Start the development server

   ```bash
   npm run dev
   ```

3. Start the mock API server (in another terminal)
   ```bash
   npx json-server --watch db.json --port 3001 --id _id
   ```

## 🧪 API Endpoints (json-server)

- GET /items — fetch clothing items
- POST /items — add new item
- DELETE /items/:\id — delete item

## 📝 Notes

- Ensure all items in `db.json` use `id` as the key.
- The app is fully responsive based on Figma designs.
- Profile data is hardcoded until backend integration.

## ✨ Future Enhancements

- User login & authentication
- Persistent user-specific wardrobe
- Improved error handling & form validation

---

© 2025 WTWR Project | Developed by Yuriy
