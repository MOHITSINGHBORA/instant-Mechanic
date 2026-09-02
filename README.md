# Instant Mechanic

Instant Mechanic is a full-stack mechanic service management dashboard built with the MERN stack. It provides an interface for managing bookings, mechanics, and service analytics from a centralized dashboard.

The project was built to demonstrate a real-world service management system with separate frontend and backend applications, REST APIs, MongoDB data storage, and dashboard-based analytics.

## Project Overview

Instant Mechanic provides the following major features:

- Dashboard overview with key statistics
- Booking management
- Mechanic management
- Booking status tracking
- Revenue analytics
- Service analytics
- Booking analytics
- Mechanic availability/status tracking
- Responsive dashboard interface
- Light/dark theme support

## Tech Stack

### Frontend

- React.js
- Vite
- React Router
- JavaScript
- CSS
- Recharts — for dashboard charts and data visualization

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

### Database

- MongoDB Atlas

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## Project Structure

### Backend

```text
backend/
└── src/
    ├── app.js
    │
    ├── config/
    │   └── db.config.js
    │
    ├── controller/
    │   ├── analytics.controller.js
    │   ├── booking.controller.js
    │   ├── mechanic.controller.js
    │   └── overview.controller.js
    │
    ├── models/
    │   ├── Booking.js
    │   ├── Customer.js
    │   └── Mechanic.js
    │
    ├── routes/
    │   ├── analytics.route.js
    │   ├── booking.route.js
    │   ├── mechanic.route.js
    │   └── overview.route.js
    │
    ├── seed/
    │   └── seed.js
    │
    └── services/
        ├── analytics.service.js
        ├── booking.service.js
        ├── mechanic.service.js
        └── overview.service.js
```

### Frontend

```text
frontend/
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    │
    ├── assets/
    │   └── hero.png
    │
    ├── components/
    │   ├── dashboard/
    │   │   ├── BookingChart.jsx
    │   │   ├── RevenueChart.jsx
    │   │   ├── ServiceChart.jsx
    │   │   ├── StatCard.jsx
    │   │   └── StatusChart.jsx
    │   │
    │   └── layout/
    │       ├── DashboardLayout.jsx
    │       ├── Header.jsx
    │       └── Sidebar.jsx
    │
    ├── context/
    │   └── themeContext.jsx
    │
    ├── pages/
    │   ├── Analytics.jsx
    │   ├── Bookings.jsx
    │   ├── Mechanics.jsx
    │   └── Overview.jsx
    │
    └── router/
        └── AppRouter.jsx
```

## Architecture

The application follows a simple client-server architecture:

```text
React Frontend
      ↓
REST API
      ↓
Express Backend
      ↓
Service Layer
      ↓
MongoDB / Mongoose
```

### Frontend

The React frontend provides the dashboard interface and communicates with the backend through REST API requests.

### API

The frontend sends HTTP requests to the Express backend for retrieving and managing application data.

### Backend

The Express backend handles routing, request validation, business logic, and communication with MongoDB.

The backend separates responsibilities into:

- Routes — define API endpoints
- Controllers — handle HTTP requests and responses
- Services — contain business logic
- Models — define MongoDB schemas
- Config — handles database configuration
- Seed — provides sample database data

### Database

MongoDB stores information about:

- Bookings
- Customers
- Mechanics

## Local Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB or a MongoDB Atlas account
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_PROJECT_NAME
```

### 2. Setup the Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Setup the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

## Environment Variables

### Backend

Create a `.env` file inside the backend directory.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
```

--------------------------------------------------------
| Variable     | Description                           |
|--------------|---------------------------------------|
| `PORT`       | Port on which the Express server runs |
| `MONGO_URI`  | MongoDB connection string             |
| `CLIENT_URL` | Frontend URL used for CORS            |
--------------------------------------------------------

### Frontend

Create a `.env` file inside the frontend directory.

```env
VITE_API_URL=http://localhost:5000
```
------------------------------------------------
| Variable       | Description                 |
|----------------|-----------------------------|
| `VITE_API_URL` | Base URL of the backend API |
------------------------------------------------

Do not commit `.env` files or database credentials to GitHub.

## API Documentation

The backend exposes REST APIs for the main dashboard resources.

### Overview

Get dashboard overview statistics.

```http
GET /api/overview
```

### Bookings

Get bookings:

```http
GET /api/bookings
```

Create a booking:

```http
POST /api/bookings
```

Update a booking:

```http
PUT /api/bookings/:id
```

Delete a booking:

```http
DELETE /api/bookings/:id
```

### Mechanics

Get mechanics:

```http
GET /api/mechanics
```

Create a mechanic:

```http
POST /api/mechanics
```

Update a mechanic:

```http
PUT /api/mechanics/:id
```

Delete a mechanic:

```http
DELETE /api/mechanics/:id
```

### Analytics

Get analytics data:

```http
GET /api/analytics
```

The analytics API provides data used by the dashboard charts, including booking, revenue, service, and status information.

> Note: Update the endpoint methods/paths above if your actual route files use different HTTP methods or URLs.

## Database Seeding

The backend includes a seed file for inserting sample data.

From the backend directory, run:

```bash
node src/seed/seed.js
```

This can be used to populate the database with sample bookings, mechanics, and customer data.

## Deployment

### Frontend

The React frontend is deployed using Vercel.

The frontend production environment variable is configured as:

```env
VITE_API_URL=https://YOUR-BACKEND-URL
```

The Vercel deployment builds the Vite application and serves the generated frontend.

### Backend

The Node.js/Express backend is deployed using Render.

The production environment variables include:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=https://YOUR-VERCEL-DOMAIN
```

The backend connects to MongoDB Atlas and exposes the REST API to the deployed frontend.

### Database

MongoDB Atlas is used as the cloud database.

The backend connects to MongoDB Atlas using the `MONGO_URI` environment variable.

## CORS Configuration

Since the frontend and backend are deployed separately, CORS is configured on the Express server to allow requests from the frontend.

Example:

```javascript
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
```

The production `CLIENT_URL` should contain only the frontend domain:

```text
https://your-frontend.vercel.app
```

It should not contain a route such as:

```text
https://your-frontend.vercel.app/overview
```

## AI Usage

AI tools were used as development assistance during the project.

### What AI was used for

AI was used for:

- Understanding technical concepts
- Debugging errors
- Reviewing and improving code
- Getting suggestions for project architecture
- Troubleshooting deployment and configuration issues
- Generating suggestions for UI and component structure

### AI-generated code

AI assistance was used for parts of the implementation, including code suggestions, debugging solutions, and boilerplate examples.
The generated suggestions were reviewed, modified, and integrated according to the requirements of the project.

### My Contribution

I personally implemented and integrated the project features, including:

- React dashboard pages
- Routing
- Dashboard components
- Booking management
- Mechanic management
- Analytics pages and charts
- Express API routes
- Controllers
- Service layer
- MongoDB/Mongoose models
- Database integration
- API integration between frontend and backend
- Deployment configuration
- Testing and debugging

AI was used as a development assistant, while the final implementation, integration, testing, and project decisions were handled by me.

## Author

Developed as a full-stack MERN project demonstrating frontend development, REST API development, database integration, and cloud deployment.