# Farm Plus 🌱

Farm Plus is a comprehensive agricultural platform designed to empower farmers with data, insights, and modern digital tools. Built with a modern tech stack, the platform aims to provide a variety of features spanning from market trends to smart advisory and AI models.

## 🚀 Features

- **Market Dashboard:** Track market trends and agricultural metrics.
- **Government Schemes:** Access details and updates about various public schemes for agriculture.
- **Knowledge Hub:** A curated repository of agricultural best practices and information.
- **Smart Advisory:** Personalized dashboard and insights for better decision-making.
- **Livestock Care:** Targeted resources for handling and caring for livestock.
- **AI Models Page:** State-of-the-art AI-driven insights for modern farming.
- **Authentication:** Secure sign up and log in functionality powered by Firebase.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 + TypeScript + Vite
- **Routing:** React Router v7
- **BaaS:** Firebase v11 (Authentication / Storage)
- **Icons:** React Icons

### Backend
- **Framework:** Express.js (Node.js) built from `server.js`
- **Architecture:** MVC Pattern (using `models/`, `controllers/`, and `routes/`)
- **Database:** MongoDB

## 📁 Project Structure

- **`frontend/`**: The React Vite UI application.
  - `src/components/`: Reusable UI components.
  - `src/pages/`: Routed views and page structures.
- **`backend/`** *(configured typically at the root or app_server level)*: Contains the API logic responding to the frontend.

## 🏃‍♀️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed along with npm.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

*(For backend setup, locate the `server.js` file and run `npm install` followed by `npm start` or the respective backend start command).*
