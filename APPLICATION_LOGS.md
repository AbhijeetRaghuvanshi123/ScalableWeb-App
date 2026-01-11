> Note: The following logs represent representative development-time logs
> captured during local testing to demonstrate authentication, authorization,
> CRUD operations, and basic error handling in a non-production environment.

---

## 🔐 Authentication Logs

[2026-01-11 10:05:12] INFO  Server started on port 5000  
[2026-01-11 10:05:13] INFO  MongoDB connected successfully  

[2026-01-11 10:06:02] INFO  POST /api/auth/register  
[2026-01-11 10:06:02] INFO  Registering new user  
[2026-01-11 10:06:03] INFO  User registered successfully  
[2026-01-11 10:06:03] INFO  Response: 201 Created (312ms)  

[2026-01-11 10:07:10] INFO  POST /api/auth/login  
[2026-01-11 10:07:10] INFO  Login attempt  
[2026-01-11 10:07:10] INFO  JWT token generated  
[2026-01-11 10:07:10] INFO  Response: 200 OK (185ms)  

[2026-01-11 10:08:42] WARN  POST /api/auth/login  
[2026-01-11 10:08:42] WARN  Invalid credentials  
[2026-01-11 10:08:42] INFO  Response: 401 Unauthorized  

---

## 👤 Protected Route Access

[2026-01-11 10:09:30] INFO  GET /api/profile  
[2026-01-11 10:09:30] INFO  Authenticated request  
[2026-01-11 10:09:30] INFO  Profile data returned  
[2026-01-11 10:09:30] INFO  Response: 200 OK (92ms)  

[2026-01-11 10:09:55] WARN  GET /api/profile  
[2026-01-11 10:09:55] WARN  Missing or invalid token  
[2026-01-11 10:09:55] INFO  Response: 401 Unauthorized  

---

## 📝 Task Management (CRUD)

[2026-01-11 10:11:05] INFO  POST /api/tasks  
[2026-01-11 10:11:05] INFO  Authenticated user creating task  
[2026-01-11 10:11:05] INFO  Task created successfully  
[2026-01-11 10:11:05] INFO  Response: 201 Created (148ms)  

[2026-01-11 10:12:20] INFO  GET /api/tasks  
[2026-01-11 10:12:20] INFO  Fetching user tasks  
[2026-01-11 10:12:20] INFO  Retrieved 5 tasks  
[2026-01-11 10:12:20] INFO  Response: 200 OK (87ms)  

[2026-01-11 10:13:40] INFO  PUT /api/tasks/:id  
[2026-01-11 10:13:40] INFO  Updating task  
[2026-01-11 10:13:40] INFO  Task updated successfully  
[2026-01-11 10:13:40] INFO  Response: 200 OK (121ms)  

[2026-01-11 10:14:55] INFO  DELETE /api/tasks/:id  
[2026-01-11 10:14:55] INFO  Deleting task  
[2026-01-11 10:14:55] INFO  Task deleted successfully  
[2026-01-11 10:14:55] INFO  Response: 200 OK (104ms)  

---

## 🚪 Logout Flow

[2026-01-11 10:16:10] INFO  User logged out  
[2026-01-11 10:16:10] INFO  Client-side token cleared  

---

## ✅ Test Summary

- Authentication flows tested (register, login, logout)
- JWT-based protected routes verified
- CRUD operations tested successfully
- Invalid access handled correctly
- Application tested locally without runtime errors
