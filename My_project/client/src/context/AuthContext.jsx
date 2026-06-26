import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      const { data } = await api.post('/api/auth/login', {
        email,
        password,
        role,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return { success: true, role: data.role };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const { data } = await api.post('/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return { success: true, role: data.role };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const googleLogin = async (credential, role) => {
    try {
      const { data } = await api.post('/api/auth/google', {
        credential,
        role,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return { success: true, role: data.role };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Google Login failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, googleLogin, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
