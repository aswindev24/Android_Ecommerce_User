# Address Selector Feature

## Overview
Added an address selector modal in the Header component that allows users to select from multiple delivery addresses.

## Features Implemented

### 1. **Address Management**
- Sample addresses stored in state (Home, Office, Parents House)
- Selected address displayed in the location bar
- Addresses can be easily integrated with backend API or user context

### 2. **Location Bar Enhancement**
- Now clickable to open address selector modal
- Shows currently selected address
- Includes chevron-down icon to indicate it's interactive
- Smooth tap feedback with activeOpacity

### 3. **Address Selector Modal**
- **Slide-up animation** from bottom
- **Semi-transparent overlay** for better focus
- **Modal Header** with:
  - "Select Delivery Address" title
  - Close button (X icon)
  
- **Address List** showing:
  - Address icon (home/briefcase/location based on type)
  - Address name (e.g., "Home", "Office")
  - Full address text
  - Radio button selection indicator
  
- **Add New Address Button**
  - Dashed border style
  - Ready to implement address addition functionality

### 4. **Visual Design**
- Clean, modern UI with rounded corners
- Color-coded icons based on address type
- Selected address highlighted with filled radio button
- Consistent with Flipkart-style design theme

## Code Structure

### State Management
```typescript
const [showAddressModal, setShowAddressModal] = useState(false);
const [addresses] = useState([
    { id: '1', name: 'Home', address: 'Kuttiattoor, Calicut, Kerala, 673508' },
    { id: '2', name: 'Office', address: 'Cyber Park, Calicut, Kerala, 673014' },
    { id: '3', name: 'Parents House', address: 'Vadakara, Kozhikode, Kerala, 673101' },
]);
const [selectedAddress, setSelectedAddress] = useState(addresses[0]);
```

### Handler
```typescript
const handleSelectAddress = (address: typeof addresses[0]) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
};
```

## Future Enhancements

1. **Backend Integration**
   - Fetch addresses from API
   - Store selected address in user context/AsyncStorage
   - Sync with user profile

2. **Add Address Functionality**
   - Create form to add new addresses
   - Validate address fields
   - Save to backend

3. **Edit/Delete Addresses**
   - Long press to edit/delete
   - Mark default address
   - Manage multiple addresses

4. **Location Services**
   - Get current location GPS
   - Auto-complete address input
   - Map integration for address selection

## Files Modified
- `d:\React_Application\Ecommerce_User\EcommerceUser\src\screens\Home\Header.tsx`

## Dependencies Used
- React Native Modal
- @expo/vector-icons (Ionicons)
- react-native-safe-area-context (useSafeAreaInsets)
