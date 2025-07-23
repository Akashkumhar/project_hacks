# BatterTrack Backend

This is the backend API for the BatterTrack application, built with Node.js, Express, and MongoDB.

## Features

- User registration with email OTP verification
- Secure login with JWT authentication
- Refresh token support
- Profile management (view, update, delete)
- Email notifications via Gmail
- CORS support for development and production

## Project Structure

```
.
├── config/
│   └── db.js
├── src/
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   └── utils/
│       ├── pendingSignups.js
│       └── sendEmail.js
├── server.js
├── package.json
├── .env
└── README.md
```

## Setup

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Configure environment variables**

   Create a `.env` file in the root directory with the following:

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   GMAIL_USER=your_gmail_address
   GMAIL_PASS=your_gmail_app_password
   ```

4. **Run the server**
   ```sh
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/signup` — Register a new user (OTP sent to email)
- `POST /api/auth/verify-otp` — Verify OTP and complete registration
- `POST /api/auth/login` — Login and receive tokens
- `POST /api/auth/refresh-token` — Get new access token using refresh token
- `POST /api/auth/logout` — Logout
- `GET /api/auth/profile` — Get user profile (protected)
- `PUT /api/auth/profile` — Update user profile (protected)
- `DELETE /api/auth/account` — Delete user account (protected)