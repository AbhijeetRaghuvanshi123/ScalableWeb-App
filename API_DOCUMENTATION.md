# API Documentation

Complete API reference for the Task Manager application.

**Base URL**: `http://localhost:5000/api` (Development)

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 🔐 Authentication

#### Register User
Create a new user account.

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Validation Rules**:
- `name`: Required, minimum 2 characters
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

**Success Response** (201):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (400):
```json
{
  "message": "User already exists"
}
```

---

#### Login User
Authenticate and receive JWT token.

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response** (401):
```json
{
  "message": "Invalid email or password"
}
```

---

### 👤 User Profile

#### Get User Profile
Retrieve authenticated user's profile.

**Endpoint**: `GET /user/profile`

**Headers**:
```
Authorization: Bearer <token>
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Error Response** (401):
```json
{
  "message": "Not authorized, no token"
}
```

---

#### Update User Profile
Update user information.

**Endpoint**: `PUT /user/profile`

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body** (all fields optional):
```json
{
  "name": "John Updated",
  "email": "john.new@example.com",
  "password": "newPassword123"
}
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Updated",
  "email": "john.new@example.com"
}
```

---

### ✅ Tasks

#### Get All Tasks
Retrieve all tasks for authenticated user with optional filtering.

**Endpoint**: `GET /tasks`

**Headers**:
```
Authorization: Bearer <token>
```

**Query Parameters** (optional):
- `keyword`: Search by title (case-insensitive)
- `status`: Filter by status (`todo`, `in-progress`, `done`)

**Examples**:
```
GET /tasks
GET /tasks?keyword=meeting
GET /tasks?status=in-progress
GET /tasks?keyword=project&status=todo
```

**Success Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "status": "in-progress",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-11T10:30:00.000Z",
    "updatedAt": "2024-01-11T14:20:00.000Z"
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Team meeting",
    "description": "Discuss Q1 goals",
    "status": "todo",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-11T09:00:00.000Z",
    "updatedAt": "2024-01-11T09:00:00.000Z"
  }
]
```

---

#### Create Task
Create a new task.

**Endpoint**: `POST /tasks`

**Headers**:
```
Authorization: Bearer <token>
```

**Request Body**:
```json
{
  "title": "New Task",
  "description": "Task description here",
  "status": "todo"
}
```

**Validation Rules**:
- `title`: Required
- `description`: Optional
- `status`: Optional, defaults to `todo`, must be one of: `todo`, `in-progress`, `done`

**Success Response** (201):
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "title": "New Task",
  "description": "Task description here",
  "status": "todo",
  "user": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-11T15:00:00.000Z",
  "updatedAt": "2024-01-11T15:00:00.000Z"
}
```

**Error Response** (400):
```json
{
  "message": "Missing required fields: title"
}
```

---

#### Update Task
Update an existing task.

**Endpoint**: `PUT /tasks/:id`

**Headers**:
```
Authorization: Bearer <token>
```

**URL Parameters**:
- `id`: Task ID

**Request Body** (all fields optional):
```json
{
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "done"
}
```

**Success Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "title": "Updated Task Title",
  "description": "Updated description",
  "status": "done",
  "user": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-11T15:00:00.000Z",
  "updatedAt": "2024-01-11T16:00:00.000Z"
}
```

**Error Responses**:
- **404**: Task not found
- **401**: User not authorized (not task owner)

---

#### Delete Task
Delete a task.

**Endpoint**: `DELETE /tasks/:id`

**Headers**:
```
Authorization: Bearer <token>
```

**URL Parameters**:
- `id`: Task ID

**Success Response** (200):
```json
{
  "message": "Task removed"
}
```

**Error Responses**:
- **404**: Task not found
- **401**: User not authorized (not task owner)

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Error Response Format

All errors follow this structure:
```json
{
  "message": "Error description",
  "stack": "Stack trace (development only)"
}
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider:
- 100 requests per 15 minutes per IP
- Stricter limits on auth endpoints (5 login attempts per 15 minutes)

---

## Postman Collection

To test these endpoints in Postman:

1. **Create Environment**:
   - Variable: `baseUrl` = `http://localhost:5000/api`
   - Variable: `token` = (will be set after login)

2. **Register/Login**:
   - Use register or login endpoint
   - Copy the `token` from response
   - Set it in your environment

3. **Protected Endpoints**:
   - Add to Headers: `Authorization: Bearer {{token}}`

### Sample Postman Workflow:
```
1. POST {{baseUrl}}/auth/register
   → Save token to environment

2. GET {{baseUrl}}/user/profile
   → Verify authentication works

3. POST {{baseUrl}}/tasks
   → Create a task

4. GET {{baseUrl}}/tasks
   → View all tasks

5. PUT {{baseUrl}}/tasks/:id
   → Update task status

6. DELETE {{baseUrl}}/tasks/:id
   → Delete task
```

---

## cURL Examples

### Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get Tasks:
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Task:
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task details","status":"todo"}'
```

---

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Task Model
```javascript
{
  title: String (required),
  description: String,
  status: String (enum: ['todo', 'in-progress', 'done'], default: 'todo'),
  user: ObjectId (ref: 'User', required),
  timestamps: true
}
```

---

## Security Notes

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens expire in 30 days
- Tokens are stored in localStorage on client
- All task operations verify ownership
- CORS enabled for frontend origin
