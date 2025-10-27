# GIGS Webapp

GIGS is a full-stack platform that connects professionals with customers for on-demand gigs. The project started as a university assignment but ships with a modern architecture, passwordless authentication, and a user experience worth showcasing on a résumé.

## Overview
- **Frontend**: Single Page Application built with React and React Router, local state management, and contextual notifications via React Toastify.
- **Backend**: REST API powered by Node.js/Express with MongoDB persistence (Mongoose), JWT authentication via HttpOnly cookies, and SMS delivery through Vonage.
- **Storage**: Profile images uploaded with Multer and served as static assets from the backend.

## Key features
- **Passwordless authentication with OTP**: phone number verification, expiring OTP generation, Vonage SMS delivery, and server-issued JWT cookies.
- **Gig lifecycle management**: authenticated gig creation, duplicate prevention, and search/filter by city, category, and price range.
- **Customizable profile**: personal details, bio management, phone number updates with double confirmation, and validated profile picture uploads.
- **Customer and provider journeys**: distinct flows for users searching or offering gigs, guided forms, and navigation to rich profile pages.
- **Client-side session state**: authentication tracked in `sessionStorage`, gated access to protected views, and explicit logout handling.

## Project structure
```
GIGS-webapp/
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   └── public/uploads
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── assets/
    │   └── App.js
    └── public/
```

## Requirements
- Node.js 18+
- MongoDB (Atlas or a local instance)
- Vonage SMS credentials for OTP delivery

## Environment variables
Create a `.env` file in `backend/` that mirrors the values used across the configuration and database modules.

```bash
MONGO_URI="mongodb+srv://<user>:<password>@cluster"
MONGO_INITDB_ROOT_USERNAME="<user>"
MONGO_INITDB_ROOT_PASSWORD="<password>"
PORT=4000
FRONTEND_URL="http://localhost:3000"
JWT_SECRET="super-secret-key"
VONAGE_API_KEY="your-api-key"
VONAGE_API_SECRET="your-api-secret"
```

## Local development
1. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   The Express API will be available at `http://localhost:4000` and automatically serve `/uploads` as static assets.

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The React app will run at `http://localhost:3000` and communicate with the REST endpoints exposed by the backend.

## Core API endpoints
| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| `POST` | `/users/verify` | Sends an OTP to the provided number while creating/updating the user. |
| `POST` | `/users/authenticate` | Validates the OTP and issues a JWT cookie for the session. |
| `GET` | `/users/loggedin` | Verifies the token and returns the authenticated state. |
| `POST` | `/users/updateAccount` | Updates profile data, phone number, and profile picture uploads. |
| `POST` | `/annunci/createAnnuncio` | Creates a gig listing associated with the authenticated user. |
| `GET` | `/annunci/listing` | Returns gigs filtered by city and job type. |
| `GET` | `/annunci/filtra` | Filters gigs by price range, city, and category. |

## User journeys
- **Onboarding**: the user enters their phone number, receives an OTP via SMS, and is authenticated with an HttpOnly cookie (mitigating XSS).
- **Offering services**: after logging in, providers complete guided forms, upload profile pictures, and publish gigs visible in filtered listings.
- **Finding gigs**: customers browse by city and category and open detailed provider profiles with bios and contact information.

## Quality and security
- Server-side validation protects against malformed input (price, OTP, phone number).
- HttpOnly cookies and CORS settings constrain authenticated requests to trusted origins.
- Image uploads enforce file type/size limits and are stored in a dedicated backend directory.

## Future enhancements
- Add Jest test coverage for the primary controllers (the backend already ships with the `npm test` script).
- Introduce in-app messaging or reviews to deepen interactions between customers and providers.
- Containerize the stack with Docker for reproducible multi-environment deployments.

## Authors
Crapuzzi Giovanni · Saracino Cristian · Stega Paolo Pio
