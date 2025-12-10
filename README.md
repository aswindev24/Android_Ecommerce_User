# React Native E-commerce Mobile App

A complete, scalable e-commerce mobile application built with React Native, TypeScript, and React Navigation.

## 📱 Features

### Authentication
- **Login** - Email and password authentication
- **Register** - Create new account with name, email, phone, and password
- **JWT Token Storage** - Secure token management with AsyncStorage
- **Auto-login** - Persistent authentication state

### Product Browsing
- **Home Screen** - Featured products, best sellers, and categories
- **Category Browsing** - View all categories and filter products
- **Product Details** - Image carousel, ratings, price, stock info
- **Search & Filter** - Find products easily

### Shopping Cart
- **Add to Cart** - Add products with quantity selection
- **Update Quantity** - Increase/decrease item quantities
- **Remove Items** - Delete items from cart
- **Cart Badge** - Real-time item count on tab bar
- **Live Total Calculation** - Automatic price updates

### Checkout
- **Delivery Address Form** - Complete address collection
- **Order Summary** - Review items and total
- **Payment Method** - UI for payment selection (no actual payment)
- **Order Placement** - Simulated order confirmation

### User Profile
- **View Profile** - Display user information
- **Edit Profile** - Update name, email, and phone
- **Order History** - View past orders with status
- **Logout** - Secure logout functionality

## 🏗️ Tech Stack

- **React Native** - Mobile framework
- **TypeScript** - Type safety
- **React Navigation** - Navigation (Bottom Tabs + Stack)
- **Expo** - Development platform
- **Axios** - HTTP client
- **AsyncStorage** - Local data persistence
- **Context API** - State management
- **Expo Vector Icons** - Icon library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Button, Input, Card, Loading
│   └── product/        # ProductCard, CategoryCard
├── constants/          # Theme, config, and constants
│   ├── theme.ts        # Colors, typography, spacing
│   └── config.ts       # API URLs, storage keys
├── context/            # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── CartContext.tsx # Shopping cart state
├── data/               # Dummy data for testing
│   └── dummyData.ts    # Sample products, categories
├── navigation/         # Navigation configuration
│   ├── AuthStack.tsx   # Login, Register
│   ├── HomeStack.tsx   # Home, Products, Details
│   ├── CartStack.tsx   # Cart, Checkout
│   ├── ProfileStack.tsx # Profile, Edit, Orders
│   ├── BottomTabNavigator.tsx # Main tabs
│   └── RootNavigator.tsx # Root navigation
├── screens/            # Screen components
│   ├── Auth/           # Login, Register
│   ├── Home/           # Home, CategoryList
│   ├── Product/        # ProductList, ProductDetail
│   ├── Cart/           # Cart, Checkout
│   └── Profile/        # Profile, EditProfile, OrderHistory
├── services/           # API services
│   ├── api.ts          # Axios instance
│   ├── auth.service.ts # Authentication APIs
│   ├── product.service.ts # Product APIs
│   └── cart.service.ts # Cart APIs
├── types/              # TypeScript type definitions
│   └── index.ts        # All interfaces and types
├── utils/              # Utility functions
│   ├── storage.ts      # AsyncStorage helpers
│   └── validation.ts   # Form validation
└── App.tsx             # Root component
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio (for Android) or Xcode (for iOS)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Run on Android**
   ```bash
   npm run android
   ```

4. **Run on iOS** (Mac only)
   ```bash
   npm run ios
   ```

## 🔧 Backend Setup

The app is configured to connect to a backend API:

- **Android Emulator**: `http://10.0.2.2:5000/api`
- **iOS Simulator**: `http://localhost:5000/api`

### Expected API Endpoints

#### Authentication
- `POST /auth/login` - Login with email and password
- `POST /auth/register` - Register new user
- `GET /auth/me` - Get current user
- `PUT /auth/profile` - Update user profile

#### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `GET /products/category/:category` - Get products by category
- `GET /categories` - Get all categories
- `GET /products/featured` - Get featured products
- `GET /products/bestsellers` - Get best sellers

#### Cart
- `GET /cart` - Get user's cart
- `POST /cart/add` - Add item to cart
- `PUT /cart/update` - Update cart item quantity
- `DELETE /cart/remove/:itemId` - Remove item from cart
- `DELETE /cart/clear` - Clear cart

## 🧪 Testing Without Backend

The app includes dummy data for testing without a backend:

- Sample products with images from Unsplash
- Sample categories
- Sample user data
- Sample order history

The app will work with this dummy data by default. To enable backend integration, uncomment the API calls in the service files.

## 🎨 Customization

### Theme

Edit `src/constants/theme.ts` to customize:
- Colors
- Typography
- Spacing
- Border radius
- Shadows

### API Configuration

Edit `src/constants/config.ts` to update:
- API base URL
- Storage keys
- App configuration
- Validation rules

## 📱 Navigation Flow

```
Root Navigator
├── Auth Stack (if not authenticated)
│   ├── Login
│   └── Register
└── Main (Bottom Tabs) (if authenticated)
    ├── Home Tab
    │   ├── Home
    │   ├── CategoryList
    │   ├── ProductList
    │   └── ProductDetail
    ├── Cart Tab
    │   ├── Cart
    │   └── Checkout
    └── Profile Tab
        ├── Profile
        ├── EditProfile
        └── OrderHistory
```

## 🔐 Authentication Flow

1. User opens app
2. App checks for stored JWT token
3. If token exists → Navigate to Main (Bottom Tabs)
4. If no token → Navigate to Auth Stack (Login)
5. After login/register → Token saved → Navigate to Main
6. Logout → Token removed → Navigate to Auth Stack

## 🛒 Cart Management

- Cart state managed with Context API
- Items stored in memory (can be persisted to AsyncStorage)
- Real-time updates across all screens
- Badge on Cart tab shows item count
- Automatic total calculation

## 🎯 Key Features

### Modern UI
- Clean and modern design
- Smooth animations
- Responsive layouts
- Custom components

### Type Safety
- Full TypeScript support
- Type definitions for all data models
- Compile-time error checking

### State Management
- Context API for global state
- Separate contexts for Auth and Cart
- Custom hooks for easy access

### Form Validation
- Email validation
- Password strength checking
- Phone number validation
- Real-time error messages

## 📝 Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
npx expo start --clear
```

### Android Build Issues
```bash
cd android && ./gradlew clean && cd ..
npm run android
```

### iOS Build Issues
```bash
cd ios && pod install && cd ..
npm run ios
```

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created as a complete e-commerce mobile app template.

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Expo Vector Icons
- React Navigation team
- Expo team
