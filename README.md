# WTWR – What to Wear?

A weather-based wardrobe assistant built with React and Vite. WTWR suggests clothing based on the current weather conditions fetched from the OpenWeather API.

---

## 🌤 Overview

WTWR helps users decide what to wear based on real-time weather data. When a user visits the app, it fetches the current temperature and location and displays suggested clothing cards filtered by temperature range. The user can also preview clothing items and add new garments.

---

## ✨ Features

- 🌡 **Real-time Weather**: Uses OpenWeather API to fetch location, temperature, condition, sunrise and sunset.
- 🧥 **Clothing Cards**: Items are filtered by temperature type: hot, warm, or cold.
- 🎨 **Dynamic Backgrounds**: WeatherCard background changes based on weather condition and time of day.
- 🖼 **Modals**: Click a card to preview it, or add new garments through a responsive modal form.
- 🧠 **React State Management**: Uses hooks (`useState`, `useEffect`) to manage UI and data.
- 💡 **Responsive Design**: Adapts to desktop and smaller screen widths using flexbox layout.

---

## 🗂 File Structure

# src/

├── assets/ # Static images (weather backgrounds)
├── components/ # React components (Header, Main, Footer, etc.)
├── utils/ # API helpers and constants
├── vendor/ # Fonts and normalize.css
├── App.jsx/ # Main app component
└── main.jsx/ # App entry point

---

## 🔧 Tech Stack

- ⚛️ React 18 + Hooks
- ⚡ Vite for fast dev/build
- 📦 CSS Modules & BEM naming
- 🌐 OpenWeather One Call API
- 📱 Fully responsive using Flexbox/Grid

---

## 📦 Installation

```bash
git clone https://github.com/se_project_react/se_project_react.git
cd se_project_react
npm install
npm run dev
```
