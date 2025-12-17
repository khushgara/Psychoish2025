# Psychoish

A comprehensive mental health assessment platform built with the MERN stack (MySQL, Express, React, Node.js). This application allows users to take various psychological assessments, view interpretations, and track their well-being over time.

## Tech Stack

**Client:**
*   React.js
*   React Router
*   Axios
*   CSS (Custom/Vanilla)

**Server:**
*   Node.js
*   Express.js
*   MySQL2 (Database Driver)
*   JWT (JSON Web Tokens) for Authentication
*   Bcrypt for Password Hashing

**Database:**
*   MySQL

---

## Prerequisites

Before running this project, ensuring you have the following installed:

*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [MySQL](https://www.mysql.com/downloads/)
*   [Git](https://git-scm.com/)

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd psychoish
```

### 2. Database Setup

You need to set up a MySQL database. Open your MySQL client (Workbench, Command Line, etc.) and execute the following SQL commands to create the database and tables:

```sql
-- Create Database
CREATE DATABASE IF NOT EXISTS psychoish_db;
USE psychoish_db;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    user_id INT PRIMARY KEY,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(50),
    bio TEXT,
    avatar_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create Assessments Table
CREATE TABLE IF NOT EXISTS assessments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    assessment_type VARCHAR(50) NOT NULL,
    responses JSON NOT NULL,
    score INT NOT NULL,
    interpretation TEXT,
    recommendations TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. Server Configuration

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory based on the example:
    ```bash
    cp .env.example .env
    ```
    *(Or manually create `.env` and copy the content below)*

4.  Edit `.env` and fill in your MySQL credentials:
    ```env
    # Database Configuration
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password  <-- CHANGE THIS
    DB_NAME=psychoish_db

    # JWT Secret
    JWT_SECRET=some_secure_random_string

    # Server Port
    PORT=5000
    ```

### 4. Client Configuration

1.  Navigate to the client directory:
    ```bash
    cd ../client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

---

## Running the Application

You need to run both the backend server and the frontend client.

### Option 1: Run Separately (Recommended for Debugging)

**Terminal 1 (Server):**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 (Client):**
```bash
cd client
npm start
# Client runs on http://localhost:3000
```

### Option 2: Run Concurrently (If configured)

If you have a configured script in the root package.json:
```bash
npm start
``` 
*(Note: Ensure required `concurrently` scripts are set up in the root package.json if you choose this method.)*

---

## API Endpoints (Overview)

*   **Auth:**
    *   `POST /api/users/register` - Register a new user
    *   `POST /api/users/login` - Login user
*   **User:**
    *   `GET /api/users/profile` - Get user profile
    *   `PUT /api/users/profile` - Update user profile
*   **Assessments:**
    *   `POST /api/assessments` - Save a new assessment
    *   `GET /api/assessments/history` - Get user assessment history
    *   `GET /api/assessments/stats` - Get assessment statistics
