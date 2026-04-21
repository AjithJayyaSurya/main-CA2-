# CA2 Fitness Tracker App - Deployment Guide

## ✅ App Status
- Build: ✓ Successful
- Local Testing: ✓ Running on http://localhost:5173
- Git: ✓ Initialized and committed

## 📋 Deployment Options

### Option 1: Deploy via Vercel CLI (Fastest)
```bash
npm install -g vercel
vercel
# Follow prompts - select "CA2 exam" folder when asked
```

### Option 2: Deploy via GitHub + Vercel Web UI
1. Create a GitHub repository
   - Go to https://github.com/new
   - Create repo named "ca2-fitness-tracker" (or similar)

2. Push code to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/ca2-fitness-tracker.git
   git branch -M main
   git push -u origin main
   ```

3. Deploy on Vercel:
   - Go to https://vercel.com/new
   - Connect to your GitHub repo "ca2-fitness-tracker"
   - Select the "CA2 exam" folder as root
   - Vercel will auto-detect Vite
   - Click Deploy

## 📊 App Features Implemented

### Routes
- `/activities` - List all activities
- `/activities/:id` - Single activity detail
- `/filter` - Filter activities by name
- `/stats` - Activity statistics

### Test IDs (Required by Assessment)
- `data-testid="activity-item"` - Activity list items
- `data-testid="filter-input"` - Filter input field
- `data-testid="total-activities"` - Total count
- `data-testid="goal-achieved"` - Goal achieved count
- `data-testid="goal-not-achieved"` - Goal not achieved count

### Global State (window.appState)
```javascript
window.appState = {
  totalactivities: number,
  goalachievementcount: number,
  goalnotachivedcount: number
}
```

### Architecture
- React Context for state management
- useReducer for state updates
- React Router for navigation
- Mock data for development (auto-fallback if API fails)

## 🔌 API Authentication
- Student ID: E0323030
- Password: 621780
- Dataset: b
- Endpoint: https://t4e-testserver.onrender.com/api/public/token

**Note:** Currently using mock data as fallback. Update password in src/context/AppContext.jsx once API is fully functioning.

## ✅ Submission
Once deployed to Vercel:
1. Copy your live URL (e.g., https://ca2-fitness-tracker.vercel.app)
2. Submit to: https://forms.gle/R2HyM8hexjAKcuot6
3. Deadline: 8:45 a.m.

## 📁 Key Files Modified
- src/reducer/AppReducer.jsx
- src/router/AppRouter.jsx
- src/pages/Home.jsx
- src/pages/Filter.jsx
- src/pages/Stats.jsx
- src/services/api.js
- src/context/AppContext.jsx
- vercel.json (Vercel config)
