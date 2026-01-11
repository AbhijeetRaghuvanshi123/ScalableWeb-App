# Installation Guide

Step-by-step instructions to run the Task Manager application locally.

---

## Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local or Atlas account) - [Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

---

## 🚀 Quick Start (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ScaleableWeb-App.git
cd ScaleableWeb-App

# 2. Install backend dependencies
cd server
npm install

# 3. Install frontend dependencies
cd ../client
npm install

# 4. Set up environment variables (see below)

# 5. Start backend (in server directory)
cd ../server
npm run dev

# 6. Start frontend (in new terminal, in client directory)
cd ../client
npm run dev
```

---

## 📁 Detailed Installation

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/ScaleableWeb-App.git
cd ScaleableWeb-App
```

Or download ZIP and extract.

---

### Step 2: Backend Setup

#### Install Dependencies

```bash
cd server
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `dotenv` - Environment variables
- `cors` - Cross-origin requests
- `nodemon` - Development auto-reload

#### Create Environment File

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

**MongoDB Options:**

**Option A: Local MongoDB**
```env
MONGO_URI=mongodb://localhost:27017/taskmanager
```

**Option B: MongoDB Atlas (Cloud)**
1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Use in `.env`:
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

#### Start Backend

```bash
npm run dev
```

You should see:
```
[nodemon] starting `node src/server.js`
Server running in development mode on port 5000
MongoDB Connected: ...
```

---

### Step 3: Frontend Setup

Open a **new terminal** window.

#### Install Dependencies

```bash
cd client
npm install
```

This installs:
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `react-hook-form` - Form handling
- `yup` - Validation
- `tailwindcss` - Styling
- `react-hot-toast` - Notifications
- `react-icons` - Icons

#### Create Environment File

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

#### Start Frontend

```bash
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

### Step 4: Access Application

Open your browser and go to:
```
http://localhost:5173
```

You should see the login page! 🎉

---

## 🧪 Testing the Installation

### 1. Register a User
- Click "Create Account"
- Fill in name, email, password
- Click "Sign Up"

### 2. Create a Task
- You'll be redirected to Dashboard
- Click "+ New Task"
- Fill in title and description
- Click "Create Task"

### 3. Test Features
- ✅ Search tasks
- ✅ Filter by status
- ✅ Edit task
- ✅ Delete task
- ✅ Update profile
- ✅ Logout

---

## 🔧 Troubleshooting

### Backend Won't Start

**Error: "Cannot find module"**
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

**Error: "MongoDB connection failed"**
- Verify MongoDB is running: `mongod --version`
- Check `MONGO_URI` in `.env`
- For Atlas: Verify IP whitelist and credentials

**Error: "Port 5000 already in use"**
- Change `PORT` in `server/.env` to `5001`
- Update `VITE_API_URL` in `client/.env` to `http://localhost:5001/api`

### Frontend Won't Start

**Error: "Cannot find module"**
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

**Error: "Failed to fetch"**
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `client/.env`
- Verify CORS is enabled in backend

**Error: "Port 5173 already in use"**
- Vite will automatically use next available port
- Or kill the process using port 5173

### Login/Register Not Working

**Check browser console for errors**
- F12 → Console tab

**Verify API calls**
- F12 → Network tab
- Try registering
- Check if POST request to `/api/auth/register` succeeds

**Check backend logs**
- Look at terminal running `npm run dev` in server

---

## 📦 Project Structure

```
ScaleableWeb-App/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API service layer
│   │   ├── components/    # React components
│   │   ├── context/       # Auth context
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── routes/        # Route protection
│   │   └── utils/         # Utilities
│   ├── .env               # Frontend environment variables
│   └── package.json
│
└── server/                # Node.js backend
    ├── src/
    │   ├── config/        # Database & env config
    │   ├── controllers/   # Request handlers
    │   ├── middlewares/   # Auth & validation
    │   ├── models/        # Mongoose models
    │   ├── routes/        # API routes
    │   ├── utils/         # Helper functions
    │   └── server.js      # Entry point
    ├── .env               # Backend environment variables
    └── package.json
```

---

## 🔐 Environment Variables Reference

### Backend (`server/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/taskmanager` |
| `JWT_SECRET` | Secret key for JWT | `mysecretkey123` |
| `NODE_ENV` | Environment | `development` or `production` |

### Frontend (`client/.env`)

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## 🛠️ Development Commands

### Backend
```bash
cd server
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production mode
```

### Frontend
```bash
cd client
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📚 Next Steps

1. ✅ Read [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API details
2. ✅ Read [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to production
3. ✅ Read [SCALING.md](./SCALING.md) for scaling strategies
4. ✅ Explore the codebase and customize!

---

## 💡 Tips

- Use **MongoDB Compass** to view database visually
- Install **React DevTools** browser extension
- Use **Postman** to test API endpoints
- Check **browser console** for frontend errors
- Check **terminal logs** for backend errors

---

## 🆘 Need Help?

- Check existing GitHub issues
- Review error messages carefully
- Verify all environment variables
- Ensure both backend and frontend are running
- Try restarting both servers

---

## ✨ You're All Set!

Your Task Manager application should now be running locally. Happy coding! 🚀
