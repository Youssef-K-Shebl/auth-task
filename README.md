# Auth Task API

A Node.js/Express API with authentication and profile management functionality.

## Features

- User authentication (signup, login)
- JWT-based authentication
- Profile management
- Profile image upload

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile (protected)
- `POST /auth/refresh-token` - Refresh JWT token

### Profile Management (Protected Routes)

- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `POST /profile/upload-image` - Upload profile image

## Profile Image Upload

The profile image upload endpoint accepts multipart form data with the following specifications:

- **Field name**: `profileImage`
- **File types**: JPEG, JPG, PNG, GIF
- **Maximum file size**: 5MB
- **Authentication**: Required (Bearer token)

### Example Usage

```bash
# Upload profile image
curl -X POST http://localhost:3000/profile/upload-image \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "profileImage=@/path/to/your/image.jpg"
```

### Response Format

```json
{
  "success": true,
  "message": "Profile image uploaded successfully",
  "data": {
    "profileImage": "uploads/profile_123_1234567890.jpg"
  }
}
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with your configuration:

```
PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

3. Run the development server:

```bash
npm run dev
```

## Database

The application uses Sequelize ORM with MySQL. The User model includes:

- id (Primary Key)
- username
- email
- password (hashed)
- profileImage (optional)
- created_at
- updated_at

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- File type and size validation
- Automatic cleanup of old profile images
