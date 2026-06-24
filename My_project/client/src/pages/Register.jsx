import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import heroBg from '../assets/hero_final.png';
import '../App.css';

export default function Register() {
  const navigate = useNavigate();
  const { login, register, user, logout } = useAuth();
  const [role, setRole] = useState('Customer'); // Customer | Vendor
  const [mode, setMode] = useState('Login'); // Login | Register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Clear any existing session when visiting the login page
  // so users always see the login/register form
  useEffect(() => {
    if (user) {
      logout();
    }
  }, []);

  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    if (val.length > 0 && val.length < 8) {
      setPasswordError('Password should be at least 8 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    if (password.length >= 8) {
      if (mode === 'Login') {
        const res = await login(email, password, role);
        if (res.success) {
          navigate(res.role === 'Vendor' ? '/vendor' : '/home');
        } else {
          setAuthError(res.message);
        }
      } else {
        const res = await register(name, email, password, role);
        if (res.success) {
          navigate(res.role === 'Vendor' ? '/vendor' : '/home');
        } else {
          setAuthError(res.message);
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] font-sans text-[#333333]">
      {/* Header */}
      <header className="bg-white px-8 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="text-2xl font-bold tracking-tight text-[#5C457D] uppercase">Maison</div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-[#5C457D] transition-colors">Shop</a>
          <a href="#" className="hover:text-[#5C457D] transition-colors">About</a>
        </nav>
        <div className="flex items-center space-x-5">
          <button className="text-gray-600 hover:text-[#5C457D] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          </button>
          <button className="text-gray-600 hover:text-[#5C457D] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-6xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(176,0,58,0.05)] overflow-hidden flex flex-col md:flex-row min-h-[650px]">
          
          {/* Left Side: Visual Section */}
          <div className="w-full md:w-1/2 relative flex flex-col justify-center p-12 md:p-16 text-white overflow-hidden" style={{background: 'linear-gradient(160deg, #2D1B4E 0%, #5C457D 55%, #8B6AAF 100%)'}}>
            <div className="absolute inset-0 z-0">
              <img
                src={heroBg}
                alt="Fashion Model"
                className="w-full h-full object-cover opacity-30 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2D1B4E]/90 via-[#5C457D]/40 to-transparent"></div>
            </div>

            <div className="relative z-10 space-y-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 uppercase">Maison</h1>
                <div className="w-16 h-1.5 bg-[#C8A96A] rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-medium leading-tight max-w-md">
                  Customize your outfits and explore unique boutiques from around the globe.
                </h2>
                
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3 text-sm font-medium tracking-wide uppercase">
                    <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </div>
                    <span>Curated Designer Collections</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm font-medium tracking-wide uppercase">
                    <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    </div>
                    <span>Bespoke Styling Tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Side: Auth Form */}
          <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-white relative">
            <div className="max-w-md w-full mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold text-gray-900 mb-3">
                  Welcome Back
                </h2>
                <p className="text-gray-500 text-sm">
                  Join the exclusive world of MAISON luxe.
                </p>
              </div>

              {/* Role Toggle */}
              <div className="flex bg-[#F3EBF5] p-1.5 rounded-2xl mb-10">
                <button
                  onClick={() => setRole('Customer')}
                  className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${role === 'Customer'
                    ? 'bg-white text-[#5C457D] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Customer
                </button>
                <button
                  onClick={() => setRole('Vendor')}
                  className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${role === 'Vendor'
                    ? 'bg-white text-[#5C457D] shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Vendor
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 mb-8">
                <button
                  onClick={() => setMode('Login')}
                  className={`flex-1 pb-4 text-sm font-bold tracking-wide transition-all border-b-2 ${mode === 'Login'
                    ? 'border-[#5C457D] text-[#5C457D]'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('Register')}
                  className={`flex-1 pb-4 text-sm font-bold tracking-wide transition-all border-b-2 ${mode === 'Register'
                    ? 'border-[#5C457D] text-[#5C457D]'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                >
                  Register
                </button>
              </div>

              {/* Form */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {authError && (
                  <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg border border-red-100">
                    {authError}
                  </div>
                )}
                
                {mode === 'Register' && (
                  <div>
                    <label className="block text-[13px] font-bold text-gray-800 mb-2 uppercase tracking-tight">Full Name</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      </span>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-4 focus:ring-[#5C457D]/5 focus:border-[#5C457D] outline-none transition-all text-sm"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[13px] font-bold text-gray-800 mb-2 uppercase tracking-tight">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      required
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white focus:ring-4 focus:ring-[#5C457D]/5 focus:border-[#5C457D] outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[13px] font-bold text-gray-800 uppercase tracking-tight">Password</label>
                    {mode === 'Login' && (
                      <a href="#" className="text-[11px] text-[#5C457D] font-bold hover:underline uppercase">
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`w-full pl-12 pr-12 py-3.5 rounded-xl border ${passwordError ? 'border-red-500' : 'border-gray-200'} bg-white focus:ring-4 focus:ring-[#5C457D]/5 focus:border-[#5C457D] outline-none transition-all text-sm`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88 1.45 1.45"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/><path d="M12 12a3 3 0 1 0-3-3"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                      )}
                    </button>
                  </div>
                  {passwordError && <p className="text-[11px] text-red-500 mt-1 font-medium">{passwordError}</p>}
                </div>

                {mode === 'Login' && (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 text-[#5C457D] focus:ring-[#5C457D] border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="remember" className="ml-2 block text-xs text-gray-500 cursor-pointer">
                      Remember me for 30 days
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={password.length < 8}
                  className={`w-full bg-[#5C457D] hover:bg-[#4A3668] text-white font-bold py-4 px-4 rounded-2xl shadow-lg shadow-[#5C457D]/20 transition-all flex items-center justify-center space-x-2 ${password.length < 8 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span>Enter Boutique</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </button>
              </form>

              <div className="mt-8">
                <div className="relative flex items-center mb-8">
                  <div className="flex-grow border-t border-gray-100"></div>
                  <span className="flex-shrink mx-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
                  <div className="flex-grow border-t border-gray-100"></div>
                </div>

                <div className="space-y-4">
                  <button className="w-full flex items-center justify-center space-x-3 py-3.5 px-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 transition-all shadow-sm">
                    <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    <span className="text-sm font-semibold text-gray-700">Continue with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0">
            <span className="text-xs font-bold tracking-widest text-gray-900 uppercase">Maison Luxe</span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">© 2024 Maison Luxe. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-[10px] font-bold text-gray-600 hover:text-[#5C457D] transition-colors uppercase tracking-tight">Terms of Service</a>
            <a href="#" className="text-[10px] font-bold text-gray-600 hover:text-[#5C457D] transition-colors uppercase tracking-tight">Privacy Policy</a>
            <a href="#" className="text-[10px] font-bold text-gray-600 hover:text-[#5C457D] transition-colors uppercase tracking-tight">Cookie Settings</a>
            <a href="#" className="text-[10px] font-bold text-gray-600 hover:text-[#5C457D] transition-colors uppercase tracking-tight">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

