import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import CustomerHome from './pages/CustomerHome';
import VendorHome from './pages/VendorHome';
import AccountDetails from './components/AccountDetails';
import CategoryProducts from './pages/CategoryProducts';
import CartPage from './pages/CartPage'; // Adding CartPage import proactively
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route 
            path="/vendor" 
            element={
              <ProtectedRoute allowedRoles={['Vendor']}>
                <VendorHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <CustomerHome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/account" 
            element={
              <ProtectedRoute>
                <AccountDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/category/:categoryName" 
            element={
              <ProtectedRoute>
                <CategoryProducts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}
