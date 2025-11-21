# IOTWatch - Smart Temperature Monitoring

A React Native mobile application for real-time temperature monitoring using MQTT protocol with authentication and gesture navigation.

## Features

### ✅ 1. Token-Based Authentication
- Login with username and password
- JWT token authentication
- Persistent authentication with AsyncStorage
- Users can browse monitoring data without login
- Login required for control panel and profile access

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

### ✅ 2. Protected Routes
- **Monitoring Screen**: Available to all users (authenticated and non-authenticated)
- **Control Screen**: Requires authentication (protected)
- **Profile Screen**: Requires authentication (protected)
- Backend API routes protected with JWT middleware

### ✅ 3. Pagination
- Monitoring screen includes pagination for historical data
- "Berikutnya" (Next) and "Sebelumnya" (Previous) buttons
- Shows current page and total pages

### ✅ 4. Profile Screen
- Displays user information (name, username, email)
- Account status indicator
- About section with app information
- Logout functionality

### ✅ 5. Custom Splash Screen
- Custom loading screen with IOTWatch branding
- Shows while authentication state is being loaded
- Smooth transition to main app

### ✅ 6. Gesture Handler
- Swipe left/right to navigate between tabs
- Works on all authenticated screens
- Smooth gesture-based navigation

## Project Structure

```
TUGAS-MODUL-6-PPB/
├── App.js                          # Main app component with navigation
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
├── index.js                        # MQTT simulator
├── src/
│   ├── index.js                    # Backend Express server
│   ├── components/
│   │   ├── CustomSplash.js         # Custom splash screen
│   │   ├── DataTable.js            # Table component
│   │   └── SwipeableScreen.js      # Gesture wrapper
│   ├── context/
│   │   └── AuthContext.js          # Authentication context
│   ├── controllers/
│   │   ├── authController.js       # Auth endpoints
│   │   ├── readingsController.js   # Readings endpoints
│   │   └── thresholdsController.js # Thresholds endpoints
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js           # Auth routes
│   │   ├── readingsRoutes.js       # Readings routes
│   │   └── thresholdsRoutes.js     # Thresholds routes
│   ├── screens/
│   │   ├── MonitoringScreen.js     # Real-time monitoring
│   │   ├── ControlScreen.js        # Threshold control (protected)
│   │   ├── ProfileScreen.js        # User profile (protected)
│   │   └── LoginScreen.js          # Login screen
│   ├── services/
│   │   ├── api.js                  # API service with auth
│   │   └── config.js               # Configuration
│   └── hooks/
│       └── useMqttSensor.js        # MQTT hook
```

## Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI
- Supabase account (for database)

### Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
PORT=3000
JWT_SECRET=your-secret-key
DATABASE_URL=your-supabase-url
```

3. Run the backend server:
```bash
npm run backend
```

### Mobile App Setup

1. Install Expo CLI:
```bash
npm install -g expo-cli
```

2. Install dependencies (Expo handles this):
```bash
npx expo install
```

3. Start the app:
```bash
npx expo start
```

4. Scan QR code with Expo Go app (iOS/Android)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with username/password
- `GET /api/auth/verify` - Verify token (requires auth)

### Readings
- `GET /api/readings?page=1&limit=10` - Get sensor readings (paginated)
- `POST /api/readings` - Create reading (internal)
- `GET /api/readings/latest` - Get latest reading

### Thresholds
- `GET /api/thresholds` - Get threshold history
- `POST /api/thresholds` - Create threshold (requires auth) ⚠️
- `GET /api/thresholds/latest` - Get latest threshold

⚠️ = Protected route (requires JWT token)

## Usage

### As Non-Authenticated User:
1. Open the app
2. Tap "Continue without login"
3. View real-time temperature monitoring
4. Browse paginated historical data

### As Authenticated User:
1. Open the app
2. Login with credentials
3. Access all features:
   - Monitoring (with pagination)
   - Control panel (set thresholds)
   - Profile (view account info, logout)
4. Use swipe gestures to navigate between tabs

### Gesture Navigation:
- Swipe left: Move to next tab
- Swipe right: Move to previous tab
- Works on Monitoring, Control, and Profile screens

## Technical Stack

**Mobile:**
- React Native with Expo
- React Navigation (Stack + Bottom Tabs)
- React Native Gesture Handler
- AsyncStorage for persistence
- MQTT.js for real-time data

**Backend:**
- Node.js + Express
- JWT for authentication
- bcryptjs for password hashing
- Supabase for database
- CORS enabled

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes with middleware
- Token stored securely in AsyncStorage
- Auto-logout on invalid token
- HTTPS ready

## Contributing

This is a university project for PPB Module 6.

## License

ISC
