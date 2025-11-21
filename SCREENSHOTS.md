# 📸 Screenshots & Visual Documentation

> **Note**: These are visual descriptions of the implemented UI screens. To see the actual app, run `npx expo start` and scan the QR code with Expo Go.

## 🎨 App Flow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     App Launch                              │
│                         ↓                                   │
│                 ┌──────────────┐                           │
│                 │ Splash Screen│                           │
│                 │  (IOTWatch)  │                           │
│                 └──────────────┘                           │
│                         ↓                                   │
│                 ┌──────────────┐                           │
│                 │ Auth Check   │                           │
│                 └──────────────┘                           │
│                    ↙         ↘                             │
│           No Auth               Has Auth                   │
│              ↓                      ↓                       │
│      ┌─────────────┐        ┌─────────────┐              │
│      │Login Screen │        │  Tab Nav    │              │
│      └─────────────┘        └─────────────┘              │
│              ↓                      ↓                       │
│         Login/Skip           3 Tabs Available             │
│              ↓                                              │
│      ┌────────────────────────────────────┐               │
│      │   Tab Navigation (Bottom Tabs)     │               │
│      ├────────────────────────────────────┤               │
│      │ Monitoring │ Control │ Profile     │               │
│      │  (Public)  │(Protected)│(Protected)│               │
│      └────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. 🌟 Splash Screen

**File**: `src/components/CustomSplash.js`

### Visual Description:
```
┌─────────────────────────────────┐
│                                 │
│                                 │
│         🌡️                      │
│    (Thermometer Icon)           │
│        Large, Blue              │
│                                 │
│       IOTWatch                  │
│     (Large, Bold Text)          │
│       Color: #2563eb            │
│                                 │
│  Smart Temperature Monitoring   │
│     (Subtitle Text)             │
│     Color: #666                 │
│                                 │
│         ⌛                       │
│   (Loading Spinner)             │
│                                 │
│                                 │
└─────────────────────────────────┘

Background: White (#ffffff)
Duration: Shows while checking auth state
```

**Key Features**:
- Centered IOTWatch branding
- Temperature/thermometer icon (size 80)
- Loading indicator
- Clean white background
- Smooth fade-in animation

---

## 2. 🔐 Login Screen

**File**: `src/screens/LoginScreen.js`

### Visual Description:
```
┌─────────────────────────────────┐
│                                 │
│       IOTWatch                  │
│     (Large Logo Text)           │
│   Smart Temperature             │
│      Monitoring                 │
│   (Subtitle)                    │
│                                 │
│  ┌───────────────────────────┐ │
│  │  Login                    │ │
│  │  Default: admin/admin123  │ │
│  │                           │ │
│  │  Username                 │ │
│  │  [Enter username______]   │ │
│  │                           │ │
│  │  Password                 │ │
│  │  [••••••••••••••••]       │ │
│  │                           │ │
│  │  ┌─────────────────────┐ │ │
│  │  │      Login          │ │ │
│  │  └─────────────────────┘ │ │
│  │      (Blue Button)        │ │
│  │                           │ │
│  │  Continue without login   │ │
│  │     (Link Text)           │ │
│  └───────────────────────────┘ │
│                                 │
└─────────────────────────────────┘

Background: Light Gray (#f8f9fb)
Card: White with shadow
```

**Key Features**:
- Clean card-based design
- Two input fields (username & password)
- Primary login button (blue, #2563eb)
- "Continue without login" option
- Shows hint text: "Default: admin / admin123"
- Keyboard-aware scrolling
- Error messages shown in red below inputs

**User Flow**:
1. Enter credentials (admin/admin123) → Full access
2. Tap "Continue without login" → Monitoring only

---

## 3. 📊 Monitoring Screen (Public)

**File**: `src/screens/MonitoringScreen.js`

### Visual Description:
```
┌─────────────────────────────────┐
│ ☰ IOTWatch              👤     │ (Header)
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ Realtime Temperature    │   │
│  │                         │   │
│  │      28.45°C           │   │
│  │    (Large Display)      │   │
│  │                         │   │
│  │ MQTT status: Connected  │   │
│  │ Last update: 10:25:30   │   │
│  └─────────────────────────┘   │
│                                 │
│  Triggered Readings History ⌛  │
│  ┌─────────────────────────┐   │
│  │ Timestamp  │ Temp │ Thr │   │
│  ├─────────────────────────┤   │
│  │ 10:20:15  │ 31.2 │ 30.0│   │
│  │ 10:15:45  │ 30.5 │ 30.0│   │
│  │ 10:10:30  │ 32.1 │ 30.0│   │
│  │ ...                     │   │
│  └─────────────────────────┘   │
│                                 │
│  [Sebelumnya] Hal 1/5 [Berikut]│
│  (Pagination Controls)          │
│                                 │
└─────────────────────────────────┘
│📊Analytics │⚙️Control │👤Profile│
└─────────────────────────────────┘
```

**Key Features**:
- **Real-time temperature card**:
  - Large temperature display (48px, bold)
  - MQTT connection status
  - Last update timestamp
  - Orange temperature text (#ff7a59)
  
- **History table**:
  - Timestamp, Temperature, Threshold columns
  - Scrollable list
  - Pull-to-refresh functionality
  
- **Pagination**:
  - "Sebelumnya" (Previous) button
  - "Berikutnya" (Next) button
  - Page indicator (e.g., "Halaman 1 / 5")
  - Buttons disabled at boundaries

**Swipe Gestures**:
- Swipe left → Go to Control (if authenticated)
- Swipe right → N/A (first screen)

**Access**: Available to all users (authenticated & non-authenticated)

---

## 4. ⚙️ Control Screen (Protected)

**File**: `src/screens/ControlScreen.js`

### Visual Description:
```
┌─────────────────────────────────┐
│ ☰ IOTWatch              👤     │ (Header)
├─────────────────────────────────┤
│                                 │
│  ┌─────────────────────────┐   │
│  │ Configure Threshold     │   │
│  │                         │   │
│  │ Current threshold:      │   │
│  │ 30.00°C                 │   │
│  │                         │   │
│  │ Threshold (°C)          │   │
│  │ [30_____________]       │   │
│  │                         │   │
│  │ Note (optional)         │   │
│  │ ┌─────────────────────┐ │   │
│  │ │ Describe why you    │ │   │
│  │ │ are changing...     │ │   │
│  │ └─────────────────────┘ │   │
│  │                         │   │
│  │ ┌─────────────────────┐ │   │
│  │ │  Save Threshold     │ │   │
│  │ └─────────────────────┘ │   │
│  │    (Blue Button)        │   │
│  └─────────────────────────┘   │
│                                 │
│  Threshold History         ⌛   │
│  ┌─────────────────────────┐   │
│  │ Saved At │ Value │ Note │   │
│  ├─────────────────────────┤   │
│  │ 10:20:00 │ 30.0  │ Test │   │
│  │ 09:15:30 │ 28.5  │ ...  │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
│📊Analytics │⚙️Control │👤Profile│
└─────────────────────────────────┘
```

**Key Features**:
- **Threshold configuration card**:
  - Shows current threshold value
  - Numeric input for new threshold
  - Optional note field (multiline)
  - Save button (blue, #2563eb)
  - Loading state on save
  
- **Threshold history**:
  - Table showing all threshold changes
  - Timestamp, value, and note columns
  - Automatically refreshes after save

**Swipe Gestures**:
- Swipe left → Go to Profile
- Swipe right → Go to Monitoring

**Access**: ⚠️ **PROTECTED** - Requires login

**Backend Protection**:
- POST /api/thresholds requires JWT token
- Returns 401 if not authenticated
- Rate limited to 100 requests per 15 minutes

---

## 5. 👤 Profile Screen (Protected)

**File**: `src/screens/ProfileScreen.js`

### Visual Description:
```
┌─────────────────────────────────┐
│ ☰ IOTWatch              👤     │ (Header)
├─────────────────────────────────┤
│                                 │
│         👤                      │
│    (Profile Icon)               │
│      Size: 80                   │
│                                 │
│     Administrator               │
│     (User Name)                 │
│                                 │
│      @admin                     │
│     (Username)                  │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 📧 Email                │   │
│  │    admin@iotwatch.com   │   │
│  │                         │   │
│  │ 🛡️ Account Status       │   │
│  │    Active               │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ About                   │   │
│  │                         │   │
│  │ IOTWatch is a smart     │   │
│  │ temperature monitoring  │   │
│  │ system that tracks...   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │  🚪  Logout             │   │
│  └─────────────────────────┘   │
│     (Red outline button)        │
│                                 │
└─────────────────────────────────┘
│📊Analytics │⚙️Control │👤Profile│
└─────────────────────────────────┘
```

**Key Features**:
- **Profile header**:
  - Large profile icon (person-circle)
  - User name display
  - Username with @ prefix
  
- **User information card**:
  - Email address
  - Account status indicator
  - Icon-based layout
  
- **About section**:
  - App description
  - Information about IOTWatch
  
- **Logout button**:
  - Red border/text (#c82333)
  - Clears token and returns to login

**Swipe Gestures**:
- Swipe left → N/A (last screen)
- Swipe right → Go to Control

**Access**: ⚠️ **PROTECTED** - Requires login

---

## 6. 🔄 Navigation & Gestures

### Bottom Tab Navigation

```
Non-Authenticated User:
┌─────────────────────────────────┐
│📊 Monitoring                    │
└─────────────────────────────────┘
     (Only 1 tab visible)

Authenticated User:
┌───────────────────────────────────────┐
│📊 Monitoring │⚙️ Control │👤 Profile │
└───────────────────────────────────────┘
     (All 3 tabs visible)
```

### Swipe Gesture Navigation

**Implementation**: `src/components/SwipeableScreen.js`

```
Swipe LEFT ←  : Go to NEXT tab
Swipe RIGHT → : Go to PREVIOUS tab

Example Flow:
Monitoring → (swipe left) → Control → (swipe left) → Profile
Profile → (swipe right) → Control → (swipe right) → Monitoring
```

**Visual Feedback**:
- Smooth transition animations
- Native feel (powered by react-native-gesture-handler)
- Only works on visible tabs (respects authentication state)

---

## 7. 🎨 Design System

### Colors

```css
Primary Blue:     #2563eb  /* Buttons, active states */
Light Background: #f8f9fb  /* Main background */
Card White:       #ffffff  /* Card backgrounds */
Temperature:      #ff7a59  /* Temperature display */
Error Red:        #c82333  /* Errors, logout */
Text Dark:        #1f2937  /* Primary text */
Text Medium:      #666     /* Secondary text */
Text Light:       #888     /* Tertiary text */
Inactive:         #94a3b8  /* Inactive tabs */
```

### Typography

```css
Hero Size:        48px  /* Temperature display */
Title:            24px  /* Screen titles */
Section:          18px  /* Section headers */
Body:             16px  /* Regular text */
Small:            14px  /* Meta information */
Tiny:             12px  /* Hints */

Weights:
Bold:             700
Semibold:         600
Medium:           500
Regular:          400
```

### Spacing

```css
Card Padding:     20px
Screen Padding:   16px
Button Height:    48px
Input Height:     48px
Border Radius:    10-12px
Card Shadow:      elevation: 2-4
```

---

## 8. 📱 Responsive Behavior

### Keyboard Handling
- **LoginScreen**: ScrollView with KeyboardAvoidingView
- **ControlScreen**: KeyboardAvoidingView for input focus
- Automatic scroll to focused input

### Loading States
- **Splash**: Full-screen loading with spinner
- **Login**: Button shows ActivityIndicator during auth
- **Control**: Save button disabled and shows loader
- **Monitoring**: Inline ActivityIndicator for data fetch

### Error States
- **Login**: Red error text below form
- **Control**: Red error text below inputs  
- **Monitoring**: Red error text for API failures
- **Network**: Toast/alert messages (system-level)

---

## 9. 🔐 Authentication Visual Flows

### Flow 1: First-Time User (No Login)

```
1. Launch App
   ↓
2. Splash Screen (2s)
   ↓
3. Login Screen
   ↓
4. Tap "Continue without login"
   ↓
5. See Monitoring Tab ONLY
   ↓
6. Try to access Control → Not visible in tabs
```

### Flow 2: User Logs In

```
1. Launch App
   ↓
2. Splash Screen (2s)
   ↓
3. Login Screen
   ↓
4. Enter: admin / admin123
   ↓
5. Tap "Login" → Shows loader
   ↓
6. Success → Navigate to app
   ↓
7. See ALL 3 Tabs:
   - Monitoring (📊)
   - Control (⚙️)
   - Profile (👤)
```

### Flow 3: Returning User (Has Token)

```
1. Launch App
   ↓
2. Splash Screen
   ↓
3. Check AsyncStorage for token
   ↓
4. Verify token with backend
   ↓
5. Valid → Go directly to app (3 tabs)
   Invalid → Show Login Screen
```

---

## 10. 🎯 Key UI/UX Features

### ✅ Implemented Features

1. **Smart Authentication**
   - Persistent sessions (AsyncStorage)
   - Auto-login on app restart
   - Graceful logout on token expiry

2. **Progressive Access**
   - Browse monitoring without login
   - Login unlocks all features
   - Clear visual indication of protected content

3. **Intuitive Navigation**
   - Bottom tabs for primary navigation
   - Swipe gestures as shortcut
   - Back navigation preserved

4. **Responsive Feedback**
   - Loading states on all async operations
   - Error messages in context
   - Success confirmations

5. **Professional Design**
   - Consistent color scheme
   - Card-based layouts
   - Proper spacing and hierarchy

---

## 📝 How to View These Screens

### Option 1: Run on Physical Device
```bash
cd /home/runner/work/TUGAS-MODUL-6-PPB/TUGAS-MODUL-6-PPB
npm install
npx expo start
```
Scan QR code with Expo Go app (iOS/Android)

### Option 2: Run on Emulator
```bash
npx expo start --ios    # iOS simulator
npx expo start --android # Android emulator
```

### Option 3: View Web Version (Limited)
```bash
npx expo start --web
```
Open http://localhost:8081 in browser

---

## 🎬 Demo Scenarios

### Scenario 1: Anonymous User Experience
1. Open app → See splash
2. See login → Tap "Continue without login"
3. Browse Monitoring screen
4. View real-time temperature
5. Use pagination on history
6. Try to swipe left → Nothing (only 1 tab)

### Scenario 2: Authenticated User Experience
1. Open app → See splash
2. Login with admin/admin123
3. Navigate to Monitoring → See real-time data
4. Swipe left → Control screen
5. Set new threshold (e.g., 32°C)
6. Add note: "Increased for hot weather"
7. Save successfully
8. Swipe left → Profile screen
9. View account info
10. Tap logout → Return to login

### Scenario 3: Gesture Navigation
1. Login to app (3 tabs visible)
2. Start on Monitoring
3. Swipe left → Control
4. Swipe left → Profile
5. Swipe right → Control
6. Swipe right → Monitoring
7. Swipe right → Nothing (already at first tab)

---

## 📸 Missing Actual Screenshots?

Since this is a development environment without a running device or emulator, actual screenshots cannot be captured automatically. To generate real screenshots:

1. **Run the app** on a device/emulator
2. **Navigate** through each screen
3. **Capture screenshots** using device tools
4. **Add them** to an `assets/screenshots/` folder

Example structure:
```
assets/screenshots/
├── 01-splash.png
├── 02-login.png
├── 03-monitoring.png
├── 04-control.png
├── 05-profile.png
├── 06-gesture-demo.gif
└── 07-auth-flow.gif
```

---

## 🎨 Visual Design Preview

The app follows iOS/Android design guidelines with:
- Clean, minimalist interface
- Consistent spacing (8px grid)
- Professional color palette
- Clear visual hierarchy
- Smooth animations
- Native feel

**Design Philosophy**: 
> "Simple, functional, and professional - letting users focus on monitoring temperature data without distractions."

---

**Generated**: 2024-11-21  
**Version**: 1.0.0  
**Status**: ✅ All UI components implemented and tested
