import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import img4 from '../assets/img4.jpeg';
import img5 from '../assets/img5.jpeg';

// ── Dummy Data ─────────────────────────────────────────────────────────────────
const DUMMY_ORDERS = [
  { _id: 'ord001abc', customer: 'Priya Sharma', amount: 4500, status: 'Pending', date: '22 Jun 2026', avatar: 'P' },
  { _id: 'ord002xyz', customer: 'Ananya Reddy', amount: 8200, status: 'Finished', date: '21 Jun 2026', avatar: 'A' },
  { _id: 'ord003def', customer: 'Meera Patel', amount: 3100, status: 'Pending', date: '20 Jun 2026', avatar: 'M' },
  { _id: 'ord004ghi', customer: 'Sana Begum', amount: 6750, status: 'Finished', date: '19 Jun 2026', avatar: 'S' },
  { _id: 'ord005jkl', customer: 'Riya Nair', amount: 2400, status: 'Pending', date: '18 Jun 2026', avatar: 'R' },
];

const DUMMY_MESSAGES = {
  ord001abc: [
    { from: 'customer', text: 'Hi! Can I get my order in silk instead of cotton?', time: '10:23 AM' },
    { from: 'vendor', text: 'Of course! Silk will add ₹500 to the price. Shall I proceed?', time: '10:31 AM' },
    { from: 'customer', text: 'Yes please! That works for me 😊', time: '10:34 AM' },
  ],
  ord002xyz: [
    { from: 'customer', text: "My order was delivered. It's absolutely beautiful, thank you!", time: '2:10 PM' },
    { from: 'vendor', text: 'So glad you loved it! Please leave us a review 🌸', time: '2:45 PM' },
  ],
  ord003def: [
    { from: 'customer', text: 'When will my outfit be ready?', time: '9:00 AM' },
    { from: 'vendor', text: 'It will be dispatched by tomorrow evening!', time: '9:15 AM' },
  ],
};

const DUMMY_CATALOG = [
  { id: 1, name: 'Silk Anarkali Set', price: '₹7,500', tag: 'Bestseller', image: img2 },
  { id: 2, name: 'Embroidered Lehenga', price: '₹12,000', tag: 'New', image: img3 },
  { id: 3, name: 'Chanderi Saree', price: '₹4,200', tag: '', image: img4 },
  { id: 4, name: 'Banarasi Dupatta', price: '₹1,800', tag: 'Popular', image: img5 },
];

// ── Icon Components ─────────────────────────────────────────────────────────────
const Icon = {
  dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  orders: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>,
  catalog: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  chat: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>,
  logout: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>,
  send: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>,
  upload: () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>,
  close: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>,
};

export default function VendorHome() {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeChatOrder, setActiveChatOrder] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(DUMMY_MESSAGES);
  const [catalogItems, setCatalogItems] = useState(DUMMY_CATALOG);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [editForm, setEditForm] = useState({ boutiqueName: '', description: '', address: '', contactEmail: '' });
  const [editSuccess, setEditSuccess] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const fileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  // Boutique Registration Form
  const [formData, setFormData] = useState({ boutiqueName: '', description: '', address: '', contactEmail: user?.email || '' });
  const [regError, setRegError] = useState('');

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/vendor/dashboard', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setDashboardData(data);
      setEditForm({ boutiqueName: data.boutique.boutiqueName, description: data.boutique.description, address: data.boutique.address, contactEmail: data.boutique.contactEmail });
    } catch (err) {
      if (err.response?.status === 404) setDashboardData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboard(); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeChatOrder, chatHistory]);

  const handleRegisterBoutique = async (e) => {
    e.preventDefault();
    setRegError('');
    try {
      await axios.post('http://localhost:5000/api/vendor/boutique', formData, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchDashboard();
    } catch (err) {
      setRegError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImgs = files.map(f => ({ name: f.name, url: URL.createObjectURL(f), id: Date.now() + Math.random() }));
    setUploadedImages(prev => [...prev, ...newImgs]);
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim() || !activeChatOrder) return;
    const newMsg = { from: 'vendor', text: chatMessage.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setChatHistory(prev => ({ ...prev, [activeChatOrder]: [...(prev[activeChatOrder] || []), newMsg] }));
    setChatMessage('');
  };

  const handleAddCatalogItem = () => {
    if (!newItemName.trim()) return;
    setCatalogItems(prev => [...prev, { id: Date.now(), name: newItemName, price: newItemPrice || '₹0', tag: 'New' }]);
    setNewItemName(''); setNewItemPrice('');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setEditSuccess('Boutique details updated successfully!');
    setTimeout(() => setEditSuccess(''), 3000);
  };

  const totalRevenue = 24550;
  const pendingCount = DUMMY_ORDERS.filter(o => o.status === 'Pending').length;
  const finishedCount = DUMMY_ORDERS.filter(o => o.status === 'Finished').length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFE]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#4A3668] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your boutique…</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-[#FDFCFE] flex items-center justify-center p-6">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-lg p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#FDF2F4] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#4A3668]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Register Your Boutique</h2>
            <p className="text-gray-500 text-sm">Set up your shop on Maison Luxe to start selling.</p>
          </div>
          {regError && <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl mb-6 border border-red-100">{regError}</div>}
          <form onSubmit={handleRegisterBoutique} className="space-y-5">
            {[
              { label: 'Boutique Name', key: 'boutiqueName', type: 'text', placeholder: 'e.g. Zara\'s Atelier' },
              { label: 'Contact Email', key: 'contactEmail', type: 'email', placeholder: 'you@example.com' },
              { label: 'Business Address', key: 'address', type: 'text', placeholder: 'Shop No. 5, Fashion Street, Mumbai' },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-sm font-bold text-gray-800 mb-2">{label}</label>
                <input type={type} required placeholder={placeholder} value={formData[key]} onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                  className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A3668]/20 focus:border-[#4A3668] outline-none transition-all text-sm" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">Description</label>
              <textarea required rows="3" placeholder="Tell customers about your boutique..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#4A3668]/20 focus:border-[#4A3668] outline-none transition-all text-sm resize-none" />
            </div>
            <button type="submit" className="w-full bg-[#4A3668] text-white font-bold py-4 rounded-2xl hover:bg-[#3D2B5A] transition-colors shadow-lg shadow-[#4A3668]/20">
              Launch My Boutique →
            </button>
          </form>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Icon.dashboard },
    { id: 'orders', label: 'Orders', icon: Icon.orders },
    { id: 'catalog', label: 'Catalog', icon: Icon.catalog },
    { id: 'chat', label: 'Customer Chat', icon: Icon.chat },
  ];

  return (
    <div className="min-h-screen bg-[#F3EBF5] flex">
      {/* ── Sidebar ── */}
      <aside className="w-64 flex flex-col fixed h-full z-10" style={{background: 'linear-gradient(160deg, #2D1B4E 0%, #5C457D 55%, #8B6AAF 100%)'}}>
        <div className="px-6 py-6 border-b border-white/10">
          <div className="text-xl font-bold text-white uppercase tracking-tight">Maison</div>
          <div className="text-xs text-white/50 font-medium mt-0.5">Vendor Portal</div>
        </div>

        {/* Boutique Info */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white font-bold text-sm">
              {dashboardData?.boutique?.boutiqueName?.[0] || 'B'}
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight truncate max-w-[130px]">{dashboardData?.boutique?.boutiqueName}</div>
              <div className="text-xs text-green-300 font-medium">● Active</div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {sidebarItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === item.id
                  ? 'bg-white/20 text-white shadow-sm'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}>
              <item.icon />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Settings & Logout */}
        <div className="px-4 py-4 border-t border-white/10 space-y-1">
          <button onClick={() => setSettingsOpen(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:bg-white/10 hover:text-white transition-all">
            <Icon.settings />
            <span>Settings</span>
          </button>
          <button onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-all">
            <Icon.logout />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold text-gray-900 capitalize">{activeTab === 'dashboard' ? 'Dashboard Overview' : activeTab === 'orders' ? 'Recent Orders' : activeTab === 'catalog' ? 'Catalog Management' : 'Customer Chat'}</h1>
            <p className="text-xs text-gray-400">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-[#4A3668] rounded-xl flex items-center justify-center text-white font-bold text-sm">
              {user.name?.[0]?.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">

          {/* ── DASHBOARD TAB ── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, sub: '+12% this month', color: 'text-green-600', bg: 'bg-green-50', icon: '💰' },
                  { label: 'Pending Orders', value: pendingCount, sub: 'Need attention', color: 'text-amber-600', bg: 'bg-amber-50', icon: '⏳' },
                  { label: 'Completed Orders', value: finishedCount, sub: 'This month', color: 'text-blue-600', bg: 'bg-blue-50', icon: '✅' },
                ].map((card, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center text-2xl`}>{card.icon}</div>
                    </div>
                    <div className={`text-3xl font-bold ${card.color} mb-1`}>{card.value}</div>
                    <div className="text-sm text-gray-500 font-medium">{card.label}</div>
                    <div className="text-xs text-gray-400 mt-1">{card.sub}</div>
                  </div>
                ))}
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-[#4A3668] font-semibold hover:underline">View All →</button>
                </div>
                <div className="space-y-3">
                  {DUMMY_ORDERS.slice(0, 3).map(order => (
                    <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-[#FDF2F4] transition-colors cursor-pointer" onClick={() => { setActiveTab('chat'); setActiveChatOrder(order._id); }}>
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-[#4A3668] rounded-full flex items-center justify-center text-white font-bold text-sm">{order.avatar}</div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{order.customer}</div>
                          <div className="text-xs text-gray-400">{order.date} · #{order._id.slice(0, 8)}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm font-bold">₹{order.amount.toLocaleString()}</div>
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${order.status === 'Finished' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boutique Info */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-4">Boutique Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { label: 'Name', value: dashboardData.boutique.boutiqueName },
                    { label: 'Email', value: dashboardData.boutique.contactEmail },
                    { label: 'Address', value: dashboardData.boutique.address },
                    { label: 'Description', value: dashboardData.boutique.description },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-4 bg-[#FDFCFE] rounded-xl">
                      <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">{label}</div>
                      <div className="text-gray-800 font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ORDERS TAB ── */}
          {activeTab === 'orders' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-6">All Orders</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                      {['Order ID', 'Customer', 'Date', 'Amount', 'Status', 'Action'].map(h => (
                        <th key={h} className="pb-4 pr-6 font-semibold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {DUMMY_ORDERS.map(order => (
                      <tr key={order._id} className="border-b border-gray-50 last:border-0 hover:bg-[#FDFCFE] transition-colors">
                        <td className="py-4 pr-6 text-sm font-mono text-gray-500">#{order._id.slice(0, 8)}</td>
                        <td className="py-4 pr-6">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-[#4A3668] rounded-full flex items-center justify-center text-white font-bold text-xs">{order.avatar}</div>
                            <span className="text-sm font-semibold">{order.customer}</span>
                          </div>
                        </td>
                        <td className="py-4 pr-6 text-sm text-gray-400">{order.date}</td>
                        <td className="py-4 pr-6 text-sm font-bold">₹{order.amount.toLocaleString()}</td>
                        <td className="py-4 pr-6">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${order.status === 'Finished' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{order.status}</span>
                        </td>
                        <td className="py-4">
                          <button onClick={() => { setActiveTab('chat'); setActiveChatOrder(order._id); }}
                            className="text-[#4A3668] text-sm font-semibold hover:underline">Message</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── CATALOG TAB ── */}
          {activeTab === 'catalog' && (
            <div className="space-y-8">
              {/* Upload Section */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-2">Upload Catalog Photos</h3>
                <p className="text-sm text-gray-400 mb-6">Upload model design photos and showcase your collection.</p>
                <div onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center cursor-pointer hover:border-[#4A3668] hover:bg-[#FDFCFE] transition-all group">
                  <div className="text-gray-300 group-hover:text-[#4A3668] transition-colors flex justify-center mb-3"><Icon.upload /></div>
                  <p className="text-sm font-semibold text-gray-500 group-hover:text-[#4A3668]">Click to upload photos</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP – up to 10 MB each</p>
                </div>
                <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                    {uploadedImages.map(img => (
                      <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                        <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                        <button onClick={() => setUploadedImages(prev => prev.filter(i => i.id !== img.id))}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon.close />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Catalog Items */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold text-lg mb-6">Catalog Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {catalogItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-[#FDFCFE] rounded-xl border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#4A3668]/10 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-5 h-5 text-[#4A3668]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900">{item.name}</div>
                          <div className="text-sm text-[#4A3668] font-semibold">{item.price}</div>
                        </div>
                      </div>
                      {item.tag && <span className="px-2 py-0.5 text-xs font-bold bg-[#4A3668] text-white rounded-full">{item.tag}</span>}
                    </div>
                  ))}
                </div>
                {/* Add New Item */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <input placeholder="Item name..." value={newItemName} onChange={e => setNewItemName(e.target.value)}
                    className="flex-1 p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4A3668]/20 focus:border-[#4A3668] outline-none" />
                  <input placeholder="Price (₹)" value={newItemPrice} onChange={e => setNewItemPrice(e.target.value)}
                    className="w-32 p-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4A3668]/20 focus:border-[#4A3668] outline-none" />
                  <button onClick={handleAddCatalogItem} className="bg-[#4A3668] text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-[#900030] transition-colors">+ Add</button>
                </div>
              </div>
            </div>
          )}

          {/* ── CHAT TAB ── */}
          {activeTab === 'chat' && (
            <div className="flex gap-6 h-[calc(100vh-160px)]">
              {/* Customer List */}
              <div className="w-72 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Conversations</h3>
                  <p className="text-xs text-gray-400 mt-0.5">{DUMMY_ORDERS.length} customers</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {DUMMY_ORDERS.map(order => (
                    <button key={order._id} onClick={() => setActiveChatOrder(order._id)}
                      className={`w-full flex items-center space-x-3 px-5 py-4 border-b border-gray-50 hover:bg-[#FDFCFE] transition-colors text-left ${activeChatOrder === order._id ? 'bg-[#FDF2F4] border-l-2 border-l-[#4A3668]' : ''}`}>
                      <div className="w-10 h-10 bg-[#4A3668] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{order.avatar}</div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">{order.customer}</div>
                        <div className="text-xs text-gray-400 truncate">{(chatHistory[order._id] || [])[0]?.text || 'No messages yet'}</div>
                      </div>
                      <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${order.status === 'Finished' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>{order.status === 'Pending' ? '●' : '✓'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="flex-1 bg-white rounded-2xl shadow-sm flex flex-col overflow-hidden">
                {!activeChatOrder ? (
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <div className="text-5xl mb-3">💬</div>
                      <p className="font-medium">Select a customer to start chatting</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Chat Header */}
                    <div className="p-5 border-b border-gray-100 flex items-center space-x-3">
                      {(() => { const o = DUMMY_ORDERS.find(x => x._id === activeChatOrder); return o ? (
                        <>
                          <div className="w-10 h-10 bg-[#4A3668] rounded-full flex items-center justify-center text-white font-bold">{o.avatar}</div>
                          <div>
                            <div className="font-bold text-gray-900">{o.customer}</div>
                            <div className="text-xs text-gray-400">Order #{o._id.slice(0, 8)} · {o.date}</div>
                          </div>
                          <span className={`ml-auto px-3 py-1 text-xs font-bold rounded-full ${o.status === 'Finished' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{o.status}</span>
                        </>
                      ) : null; })()}
                    </div>
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FDFCFE]">
                      {(chatHistory[activeChatOrder] || []).map((msg, i) => (
                        <div key={i} className={`flex ${msg.from === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${msg.from === 'vendor' ? 'bg-[#4A3668] text-white rounded-br-md' : 'bg-white text-gray-800 shadow-sm rounded-bl-md'}`}>
                            <p>{msg.text}</p>
                            <p className={`text-[10px] mt-1 ${msg.from === 'vendor' ? 'text-white/60 text-right' : 'text-gray-400'}`}>{msg.time}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    {/* Input */}
                    <div className="p-4 border-t border-gray-100 flex items-center space-x-3">
                      <input value={chatMessage} onChange={e => setChatMessage(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message…"
                        className="flex-1 p-3.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4A3668]/20 focus:border-[#4A3668] outline-none" />
                      <button onClick={handleSendMessage} className="w-12 h-12 bg-[#4A3668] rounded-xl flex items-center justify-center text-white hover:bg-[#900030] transition-colors">
                        <Icon.send />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Settings Drawer ── */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSettingsOpen(false)} />
          <div className="ml-auto w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col">
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Settings</h2>
                <p className="text-xs text-gray-400">Manage your boutique details</p>
              </div>
              <button onClick={() => setSettingsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><Icon.close /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-8">
              {editSuccess && <div className="bg-green-50 text-green-700 border border-green-200 text-sm p-4 rounded-xl mb-6 font-medium">{editSuccess}</div>}
              <form onSubmit={handleSaveSettings} className="space-y-5">
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider">Edit Boutique Details</h3>
                {[
                  { label: 'Boutique Name', key: 'boutiqueName', type: 'text' },
                  { label: 'Contact Email', key: 'contactEmail', type: 'email' },
                  { label: 'Business Address', key: 'address', type: 'text' },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
                    <input type={type} value={editForm[key]} onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
                      className="w-full p-3.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4A3668]/20 focus:border-[#4A3668] outline-none transition-all" />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea rows="3" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full p-3.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#4A3668]/20 focus:border-[#4A3668] outline-none resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#4A3668] text-white font-bold py-4 rounded-xl hover:bg-[#900030] transition-colors">Save Changes</button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider mb-4">Account</h3>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="text-sm font-bold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.email} · Vendor</div>
                </div>
                <button onClick={() => { setSettingsOpen(false); logout(); }}
                  className="w-full flex items-center justify-center space-x-2 py-3.5 border-2 border-red-200 text-red-500 font-bold rounded-xl hover:bg-red-50 transition-colors">
                  <Icon.logout />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

