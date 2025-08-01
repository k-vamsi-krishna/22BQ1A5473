# 🔗 URL Shortener - Afford Medical Technologies Frontend Evaluation

This is a fully functional, responsive React-based URL Shortener web application built as part of the Campus Hiring Evaluation for Afford Medical Technologies.

## 🚀 Features

- 🔒 Client-side short URL generation with custom or auto-generated shortcode
- ⏳ URL expiry based on user-defined validity (defaults to 30 minutes)
- 📊 Real-time click tracking with timestamp, location (mocked), and source
- 🧾 Local session-based data persistence using `localStorage`
- 🔁 Redirection handling via React Router
- 📋 Logging middleware (custom) for all major app actions (no `console.log`)
- 🎨 Built with Material UI for modern, clean UI/UX

---

## 🏗️ Tech Stack

- ⚛️ React (with functional components & hooks)
- 🌐 React Router (for dynamic URL redirection)
- 🧱 Material UI (component styling)
- 📦 localStorage (for persistence and stats)
- 🧰 Custom middleware for logging

---

## 📄 Project Structure

afford-url-shortener/
├── public/
├── src/
│ ├── pages/
│ │ ├── UrlShortener.js
│ │ ├── Statistics.js
│ │ └── Redirector.js
│ ├── utils/
│ │ └── generateShortcode.js
│ ├── middleware/
│ │ └── logger.js
│ ├── App.js
│ └── index.js
└── README.md
