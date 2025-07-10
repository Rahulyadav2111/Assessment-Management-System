Assessment Management System
A web application for user authentication and PDF report generation from assessment data. Built with Node.js, Express, React (Vite), Tailwind CSS, and Puppeteer.
Setup Instructions
Prerequisites

Node.js (v14 or higher)
npm

Backend Setup

Navigate to the backend folder:cd backend


Install dependencies:npm install


Start the backend server:npm start

The server runs on http://localhost:5000.

Frontend Setup (Vite)

Navigate to the frontend folder:cd frontend


Install dependencies:npm install


Initialize Tailwind CSS:npx tailwindcss init


Start the frontend development server:npm run dev

The app runs on http://localhost:5173.

Testing the System

Open http://localhost:5173 in your browser.
From the home page, click "Sign Up" to create an account.
After signup, you’ll be redirected to the login page.
Log in with your credentials.
Enter a session ID (e.g., session_001 or session_002) in the report generator.
Click "Generate PDF" to create a PDF, then click "Download PDF" to download it.

Configuration System Documentation
The system is designed to be flexible, allowing new assessment types to be added via configuration files without code changes.