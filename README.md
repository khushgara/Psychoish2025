# Psychoish - Mental Wellness Platform 🧠

Psychoish is a comprehensive MERN stack application designed to help users track their mental wellness, take specialized psychological assessments, and book consultations with professionals.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/psychoish.git
   cd psychoish
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   - Create a `.env` file in the `server` directory with your database config:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=psychoish_db
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Run the server (this will automatically create database tables):
     ```bash
     npm start
     ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm start
   ```

4. **Access the App**
   - Open [http://localhost:3000](http://localhost:3000) to view the client.
   - The server runs on `http://localhost:5000`.

---

## 📊 Assessment Scoring Formulas

Psychoish implements standard clinical scoring algorithms for various assessments.

### 1. DAST-10 (Drug Abuse Screening Test)
- **Structure**: 10 Yes/No questions.
- **Scoring**:
  - Each "Yes" answer = 1 point.
  - Exception: Question 3 is reversed (No = 1 point).
- **Interpretation**:
  - **0**: None reported (Low)
  - **1-2**: Low level (Low)
  - **3-5**: Moderate level (Moderate)
  - **6-8**: Substantial level (High)
  - **9-10**: Severe level (Critical)

### 2. Mood Assessment (depression-like symptoms)
- **Scoring**: Sum of scale values (1-5) for questions about mood, energy, and outlook.
- **Interpretation**:
  - **0-10**: Normal
  - **11-16**: Mild mood disturbance
  - **17-20**: Borderline clinical depression
  - **21-30**: Moderate depression
  - **31-40**: Severe depression
  - **40+**: Extreme depression

### 3. GAD-7 (Anxiety)
- **Scoring**: Sum of response values (0=Not at all, 1=Several days, 2=More than half, 3=Nearly every day).
- **Interpretation**:
  - **0-21**: Low anxiety
  - **22-35**: Moderate anxiety
  - **36+**: Potentially concerning levels

### 4. Y-BOCS (OCD)
- **Scoring**: Sum of severity ratings for obsession and compulsion questions.
- **Interpretation**:
  - **0-13**: Mild symptoms
  - **14-25**: Moderate symptoms
  - **26-34**: Moderate-severe
  - **35-40**: Severe symptoms

### 5. SBQ-R (Suicide Behaviors Questionnaire-Revised)
- **Structure**: 4 weighted questions.
- **Scoring**: Sum of specific weightings per answer choice.
- **Interpretation**:
  - **0-6**: Low risk
  - **7-11**: Moderate/High risk
  - **12+**: Critical risk

---

## 🛠️ Tech Stack
- **Frontend**: React.js, React Router, Context API
- **Backend**: Node.js, Express.js
- **Database**: MySQL (using `mysql2` driver)
- **Authentication**: JWT (JSON Web Tokens)
