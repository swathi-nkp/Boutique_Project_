import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import new1Img from '../assets/new1.jfif';
import new4Img from '../assets/new4.jfif';

export default function AccountDetails() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    address: '',
  });

  const orders = [
    {
      id: 1,
      boutique: 'The Silk Road',
      status: 'In Transit',
      statusColor: '#2E7D32',
      statusIcon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ),
      price: '$420',
      image: new1Img,
      actionLabel: 'Track Order',
    },
    {
      id: 2,
      boutique: 'Maison Noir',
      status: 'Delivered',
      statusColor: '#1B5E20',
      statusIcon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ),
      price: '$1,250',
      image: new4Img,
      actionLabel: 'View Receipt',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans text-[#333333]">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <div
            className="text-2xl font-bold text-[#E91E63] tracking-tight uppercase cursor-pointer"
            onClick={() => navigate('/home')}
          >
            Maison
          </div>
        </div>
        <div className="flex items-center space-x-6 text-gray-600">
          {/* Wishlist */}
          <button className="hover:text-[#E91E63] transition-colors relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </button>
          {/* Bag */}
          <button className="hover:text-[#E91E63] transition-colors relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </button>
          {/* Chat */}
          <button className="hover:text-[#E91E63] transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
          </button>
          {/* Account — active/highlighted */}
          <button className="text-[#E91E63] transition-colors" onClick={() => navigate('/account')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Page Body */}
      <div className="max-w-5xl mx-auto px-6 py-10 flex gap-8">

        {/* Sidebar */}
        <aside className="w-52 shrink-0">
          <h2 className="text-xl font-bold mb-6 text-[#333]">Account</h2>
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#FCE4EC] text-[#E91E63]'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-[#E91E63]'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              My Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-[#FCE4EC] text-[#E91E63]'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-[#E91E63]'
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              Orders
            </button>

            <div className="my-3 border-t border-gray-100" />

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-[#E91E63] transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">

          {/* Profile Header Card */}
          <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="relative w-20 h-20 shrink-0">
                <div className="w-20 h-20 rounded-full bg-[#FCE4EC] overflow-hidden border-2 border-[#E91E63]/20 flex items-center justify-center">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
                  </svg>
                </button>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#333]">{form.fullName}</h3>
                <p className="text-sm text-gray-400 mt-0.5">{form.email}</p>
              </div>
            </div>
            <button className="border border-[#E91E63] text-[#E91E63] px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#FCE4EC] transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Personal Information Form */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <h4 className="text-lg font-bold text-[#333] mb-1">Personal Information</h4>
            <p className="text-sm text-gray-400 mb-7">Update your details for a personalized shopping experience.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E91E63]/20 focus:border-[#E91E63]/40 transition-all"
                />
              </div>
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E91E63]/20 focus:border-[#E91E63]/40 transition-all"
                />
              </div>
              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E91E63]/20 focus:border-[#E91E63]/40 transition-all"
                />
              </div>
              {/* Gender */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Gender</label>
                <select
                  value={form.gender}
                  onChange={e => setForm({ ...form, gender: e.target.value })}
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E91E63]/20 focus:border-[#E91E63]/40 transition-all bg-white appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Address — full width */}
            <div className="flex flex-col gap-1.5 mb-8">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#E91E63]/20 focus:border-[#E91E63]/40 transition-all"
              />
            </div>

            <button className="bg-[#E91E63] hover:bg-[#D81B60] text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#E91E63]/20 active:scale-95">
              Save Changes
            </button>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-bold text-[#333]">Order History</h4>
              <button className="text-[#E91E63] text-sm font-semibold hover:underline">View All Orders</button>
            </div>
            <p className="text-sm text-gray-400 mb-8">Track your recent purchases from our partner boutiques.</p>

            <div className="flex flex-col gap-5">
              {orders.map(order => (
                <div key={order.id} className="flex items-center gap-5 p-4 rounded-xl border border-gray-100 hover:border-[#E91E63]/20 hover:shadow-sm transition-all">
                  {/* Order Image */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                    <img src={order.image} alt={order.boutique} className="w-full h-full object-cover" />
                  </div>

                  {/* Boutique */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Boutique</p>
                    <p className="text-sm font-bold text-[#333] truncate">{order.boutique}</p>
                  </div>

                  {/* Status */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center gap-1.5" style={{ color: order.statusColor }}>
                      {order.statusIcon}
                      <p className="text-sm font-semibold">{order.status}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Price</p>
                    <p className="text-sm font-bold text-[#333]">{order.price}</p>
                  </div>

                  {/* Action */}
                  <button className="shrink-0 border border-gray-200 text-gray-600 text-xs font-semibold px-4 py-2.5 rounded-xl hover:border-[#E91E63] hover:text-[#E91E63] transition-all">
                    {order.actionLabel}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#FDF2F4] px-12 py-16 mt-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="text-2xl font-bold text-[#E91E63] mb-4 tracking-tight uppercase">Maison</div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              © 2024 MAISON Boutique. Editorial curation for the discerning eye.
            </p>
            <div className="flex items-center gap-4 text-[#E91E63]">
              {/* Dribbble-like */}
              <button className="hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
                </svg>
              </button>
              {/* Instagram */}
              <button className="hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </button>
              {/* Play */}
              <button className="hover:opacity-70 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-5 text-xs uppercase tracking-widest text-[#E91E63]">The Collection</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-[#E91E63] cursor-pointer transition-colors">New Arrivals</li>
              <li className="hover:text-[#E91E63] cursor-pointer transition-colors">Boutique Directory</li>
              <li className="hover:text-[#E91E63] cursor-pointer transition-colors">Customization Services</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-5 text-xs uppercase tracking-widest text-[#E91E63]">Maison</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-[#E91E63] cursor-pointer transition-colors">Sustainability</li>
              <li className="hover:text-[#E91E63] cursor-pointer transition-colors">Our Story</li>
              <li className="hover:text-[#E91E63] cursor-pointer transition-colors">Editorial</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-5 text-xs uppercase tracking-widest text-[#E91E63]">Support</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-[#E91E63] cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-[#E91E63] cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-[#E91E63] cursor-pointer transition-colors">Shipping & Returns</li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
}
