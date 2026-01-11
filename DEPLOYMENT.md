# Deployment Guide

Complete guide for deploying the Task Manager application to production.

---

## 🚀 Quick Deployment

### Frontend: Vercel
### Backend: Render (or Railway)
### Database: MongoDB Atlas

---

## Prerequisites

- GitHub account
- Vercel account (free tier)
- Render account (free tier) or Railway
- MongoDB Atlas account (free tier)

---

## 📊 MongoDB Atlas Setup

### 1. Create Database

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up / Log in
3. Create a **New Project** → Name it "TaskManager"
4. Click **Build a Database**
5. Choose **M0 FREE** tier
6. Select a cloud provider and region (closest to you)
7. Click **Create**

### 2. Configure Database Access

1. Go to **Database Access** (left sidebar)
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `taskmanager`
5. **Autogenerate Secure Password** → **Copy it!**
6. Database User Privileges: **Read and write to any database**
7. Click **Add User**

### 3. Configure Network Access

1. Go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
   - ⚠️ For production, restrict to specific IPs
4. Click **Confirm**

### 4. Get Connection String

1. Go to **Database** → Click **Connect**
2. Choose **Connect your application**
3. Driver: **Node.js**, Version: **5.5 or later**
4. Copy the connection string:
   ```
   mongodb+srv://taskmanager:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name before `?`:
   ```
   mongodb+srv://taskmanager:yourpassword@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

---

## 🔧 Backend Deployment (Render)

### 1. Prepare Backend

Ensure your `server/package.json` has:
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

### 2. Push to GitHub

```bash
cd "c:\Dev\Git\Scaleable Web App\ScaleableWeb-App"
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 3. Deploy on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `taskmanager-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. **Environment Variables** (click "Advanced"):
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://taskmanager:yourpassword@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   NODE_ENV=production
   ```

6. Click **Create Web Service**
7. Wait for deployment (~5 minutes)
8. Copy your backend URL: `https://taskmanager-api.onrender.com`

### Alternative: Railway

1. Go to [Railway](https://railway.app/)
2. **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Railway auto-detects Node.js
5. Add environment variables in **Variables** tab
6. Set **Root Directory**: `/server`
7. Deploy automatically starts

---

## 🎨 Frontend Deployment (Vercel)

### 1. Prepare Frontend

Update `client/.env`:
```env
VITE_API_URL=https://taskmanager-api.onrender.com/api
```

Commit the change:
```bash
git add client/.env
git commit -m "Update API URL for production"
git push origin main
```

### 2. Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. **Environment Variables**:
   ```
   VITE_API_URL=https://taskmanager-api.onrender.com/api
   ```

6. Click **Deploy**
7. Wait for deployment (~2 minutes)
8. Your app is live! 🎉

---

## 🔄 Update Backend CORS

After deploying frontend, update backend to allow your Vercel domain.

In `server/src/app.js`:
```javascript
import cors from 'cors';

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

Commit and push:
```bash
git add server/src/app.js
git commit -m "Update CORS for production"
git push origin main
```

Render will auto-redeploy.

---

## ✅ Verify Deployment

### Test Backend:
```bash
curl https://taskmanager-api.onrender.com/api/
```
Should return: `"API is running..."`

### Test Frontend:
1. Open your Vercel URL
2. Register a new account
3. Create a task
4. Verify it saves to database

---

## 🐛 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check Render logs: Dashboard → Your Service → Logs
- Verify MongoDB connection string is correct
- Ensure all environment variables are set

**CORS errors**
- Add your Vercel domain to CORS whitelist
- Redeploy backend after changes

### Frontend Issues

**API calls failing**
- Verify `VITE_API_URL` is correct
- Check browser console for errors
- Ensure backend is running

**Build fails**
- Check Vercel build logs
- Verify all dependencies are in `package.json`
- Test build locally: `npm run build`

---

## 💰 Free Tier Limits

### Render Free Tier:
- ✅ 750 hours/month
- ⚠️ Spins down after 15 min inactivity (cold starts)
- ✅ Automatic HTTPS
- ✅ Auto-deploys from GitHub

### Vercel Free Tier:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Global CDN

### MongoDB Atlas Free Tier:
- ✅ 512 MB storage
- ✅ Shared RAM
- ✅ Good for ~1000 users

---

## 🔐 Production Security Checklist

- [x] Environment variables not in code
- [x] Strong JWT secret (32+ characters)
- [x] HTTPS enabled (automatic on Vercel/Render)
- [x] CORS configured for specific origins
- [x] MongoDB network access restricted
- [ ] Consider adding rate limiting
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Enable database backups

---

## 📈 Scaling Beyond Free Tier

When you outgrow free tiers:

1. **Backend**: Upgrade Render to paid ($7/mo) or use AWS/DigitalOcean
2. **Database**: Upgrade MongoDB Atlas to M10 ($57/mo)
3. **Frontend**: Vercel Pro ($20/mo) for more bandwidth
4. **Add Redis**: For caching and sessions
5. **CDN**: CloudFront for static assets
6. **Monitoring**: New Relic, Datadog

---

## 🔄 CI/CD Pipeline

Your deployments are already automated:
- **Push to GitHub** → Vercel & Render auto-deploy
- **Preview deployments** on pull requests (Vercel)
- **Rollback** available in both platforms

---

## 📱 Custom Domain (Optional)

### Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Render:
1. Go to Service Settings → Custom Domain
2. Add domain and update DNS

---

## 🎯 Post-Deployment

1. **Test all features** in production
2. **Monitor logs** for errors
3. **Set up alerts** for downtime
4. **Share your live URL** with evaluators! 🚀
