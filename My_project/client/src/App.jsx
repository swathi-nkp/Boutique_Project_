import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Register from './pages/Register';
import CustomerHome from './pages/CustomerHome';
import VendorHome from './pages/VendorHome';
import AccountDetails from './components/AccountDetails';
import CategoryProducts from './pages/CategoryProducts';
import FavoritesPage from './pages/FavoritesPage';
import PlaceOrder from './pages/PlaceOrder';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import ProtectedRoute from './components/ProtectedRoute';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <ScrollToTop />
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
            path="/favorites" 
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/placeorder" 
            element={
              <ProtectedRoute>
                <PlaceOrder />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  );
}
