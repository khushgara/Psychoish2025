# Psychoish - Mental Health Assessment Platform

A comprehensive mental health assessment platform built with React and Node.js, providing personalized mental health evaluations, self-help resources, and professional consultation booking.

## 🌟 Features

### Core Functionality
- **5 Clinical Assessment Types**
  - Mood Assessment (Depression Screening)
  - Drug Abuse Screening Test (DAST-10)
  - Anxiety Assessment
  - Psychological Well-Being (Ryff Scales)
  - Obsessive-Compulsive Symptoms (Y-BOCS)

- **User Authentication**
  - Secure signup and login with JWT
  - Password hashing with bcrypt
  - Protected routes for authenticated users

- **Personalized Dashboard**
  - Assessment history and statistics
  - Recent results overview
  - Quick access to all assessments

- **Results & Recommendations**
  - Automatic scoring based on clinical standards
  - Severity-based interpretations
  - Personalized recommendations
  - Crisis helpline information when needed

- **Professional Consultation**
  - Book consultations with mental health professionals
  - Multiple consultation types (therapy, counseling, assessment review)

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- React Router DOM 6.22.3
- Axios 1.13.1
- Context API for state management

### Backend
- Node.js with Express 4.18.2
- MySQL 2 (mysql2 3.15.3)
- JWT for authentication (jsonwebtoken 9.0.2)
- Bcrypt for password hashing (6.0.0)
- CORS enabled

## 📁 Project Structure

```
psychoish/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Navbar/
│       │   ├── Footer/
│       │   ├── Loader/
│       │   └── ProtectedRoute/
│       ├── context/
│       │   ├── AuthContext.js
│       │   └── ThemeContext.js
│       ├── pages/
│       │   ├── Home/
│       │   ├── Login/
│       │   ├── Signup/
│       │   └── Dashboard/
│       ├── App.js
│       └── index.js
│
└── server/                 # Node.js backend
    ├── config/
    │   ├── db.js
    │   └── database_schema.sql
    ├── controllers/
    │   ├── authController.js
    │   ├── assessmentController.js
    │   ├── resultController.js
    │   ├── profileController.js
    │   └── consultationController.js
    ├── data/
    │   └── assessmentQuestions.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── models/
    │   ├── userModel.js
    │   ├── AssessmentModel.js
    │   └── ResultModel.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── assessmentRoutes.js
    │   ├── resultRoutes.js
    │   ├── profileRoutes.js
    │   └── consultationRoutes.js
    ├── .env.example
    ├── package.json
    └── server.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd psychoish
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Database Setup**
   ```bash
   # Create MySQL database
   mysql -u root -p
   ```
   
   Then run the SQL schema:
   ```sql
   source server/config/database_schema.sql
   ```

4. **Environment Configuration**
   
   Create `.env` file in the `server` directory:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=psychoish_db
   JWT_SECRET=your_super_secret_jwt_key
   PORT=5000
   ```

5. **Run the Application**

   **Option 1: Run separately**
   ```bash
   # Terminal 1 - Start backend
   cd server
   npm start

   # Terminal 2 - Start frontend
   cd client
   npm start
   ```

   **Option 2: Run concurrently (from root)**
   ```bash
   npm start
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📊 Assessment Scoring

### Mood Assessment (Depression)
- **Range**: 0-40+
- **Scoring**: Sum of all responses (0-3 each)
- **Interpretations**:
  - 1-10: Normal
  - 11-16: Mild mood disturbance
  - 17-20: Borderline clinical depression
  - 21-30: Moderate depression
  - 31-40: Severe depression
  - 40+: Extreme depression

### DAST-10 (Drug Abuse)
- **Range**: 0-10
- **Scoring**: Count of "yes" answers (with reversed questions)
- **Interpretations**:
  - 0: None reported
  - 1-2: Low level
  - 3-5: Moderate level
  - 6-8: Substantial level
  - 9-10: Severe level

### Anxiety Assessment
- **Range**: 0-36+
- **Scoring**: Sum of all responses (0-3 each)
- **Interpretations**:
  - 0-21: Low anxiety
  - 22-35: Moderate anxiety
  - 36+: Potentially concerning levels

### Psychological Well-Being (Ryff Scales)
- **Range**: 18-108
- **Scoring**: Sum of all responses (1-6 each, with reversals)
- **Interpretations**:
  - 18-33: Very low
  - 34-48: Low
  - 49-63: Normal
  - 64-78: Mild
  - 79-93: Moderate
  - 94-108: High state of well-being

### Y-BOCS (OCD)
- **Range**: 0-40
- **Scoring**: Sum of all responses (0-4 each)
- **Interpretations**:
  - 0-13: Mild symptoms or lower
  - 14-25: Moderate symptoms
  - 26-34: Moderate-severe symptoms
  - 35-40: Severe symptoms

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Assessments
- `GET /api/assessments/types` - Get all assessment types
- `GET /api/assessments/questions/:type` - Get questions for assessment
- `POST /api/assessments/submit` - Submit assessment (protected)
- `GET /api/assessments/history` - Get user's assessment history (protected)
- `GET /api/assessments/stats` - Get assessment statistics (protected)
- `GET /api/assessments/:id` - Get specific assessment (protected)
- `DELETE /api/assessments/:id` - Delete assessment (protected)

### Results
- `GET /api/results/dashboard` - Get dashboard summary (protected)
- `GET /api/results/all` - Get all results (protected)
- `GET /api/results/:assessmentId` - Get specific result (protected)

### Profile
- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile` - Update user profile (protected)

### Consultations
- `POST /api/consultations/book` - Book consultation
- `GET /api/consultations/my-bookings` - Get user's bookings (protected)

## 🎨 Features in Detail

### Authentication System
- JWT-based authentication with 24-hour token expiration
- Secure password hashing using bcrypt (10 salt rounds)
- Protected routes on both frontend and backend
- Automatic token refresh on page reload

### Dashboard
- Welcome message with user name
- Statistics cards showing total assessments and progress
- Recent assessments list with scores and interpretations
- Assessment cards for all 5 types with completion badges
- Quick action buttons for profile, results, and consultations

### Assessment Flow
1. User selects an assessment from dashboard
2. Questions are displayed one by one or in a form
3. User submits responses
4. Backend calculates score automatically
5. Interpretation and recommendations are generated
6. Results are stored in database
7. User is redirected to results page

### Recommendations System
- Severity-based recommendations (low, moderate, high, critical)
- Specific advice for each assessment type
- Crisis helpline numbers for critical cases
- Professional help suggestions
- Self-help strategies

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- SQL injection prevention with parameterized queries
- CORS configuration
- Input validation and sanitization
- Secure token storage in localStorage

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Mobile navigation menu
- Touch-friendly buttons
- Optimized for all screen sizes

## 🌙 Theme Support

- Light and dark mode
- Persistent theme selection
- Smooth transitions
- Theme toggle in navbar

## 🚧 Future Enhancements

- [ ] Assessment taking interface for all 5 types
- [ ] Results visualization with charts
- [ ] Profile management page
- [ ] About, Therapies, Blog, FAQ, Contact pages
- [ ] Email notifications for consultations
- [ ] Assessment reminders
- [ ] Progress tracking over time
- [ ] Export results as PDF
- [ ] Social sharing of achievements
- [ ] Multi-language support

## 📄 License

This project is part of a BCA dissertation for Jaipur National University.

## 👥 Authors

- Khushagra Sharma (R30341)
- Yash Sharma (R30974)

## 🙏 Acknowledgments

- Mr. Shish Dubey - Project Guide
- School of Computer & Systems Science, JNU
- Clinical assessment tools: BDI, DAST-10, BAI, Ryff Scales, Y-BOCS

## 📞 Support

For support or queries, please contact through the consultation booking system or reach out to the development team.

---

**Note**: This is an educational project for mental health awareness. For serious mental health concerns, please consult with qualified mental health professionals.
