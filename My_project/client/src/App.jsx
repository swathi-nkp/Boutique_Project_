import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import CustomerHome from './pages/CustomerHome';
import VendorHome from './pages/VendorHome';
import AccountDetails from './components/AccountDetails';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
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
      </Routes>
    </AuthProvider>
  );
}
