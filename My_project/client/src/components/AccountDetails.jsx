import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─────────────────────── SVG Icons ─────────────────────── */
const UserIcon    = ({s=20,c='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const OrdersIcon  = ({s=20})               => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>;
const LogoutIcon  = ({s=18})               => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const PencilIcon  = ()                     => <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z"/></svg>;
const ChevronIcon = ()                     => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>;
const HeartIcon   = ({s=22})               => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>;
const BagIcon     = ({s=22})               => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
const ChatIcon    = ({s=22})               => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>;
const ArrowIcon   = ({s=13})               => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const CheckIcon   = ({s=13})               => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;

/* ─────────────────── Sidebar Nav Item ──────────────────── */
function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 text-left group ${
        active
          ? 'bg-white/20 text-white shadow-sm'
          : 'text-white/60 hover:bg-white/10 hover:text-white'
      }`}
    >
      <span className={`transition-colors ${active ? 'text-white' : 'text-white/50 group-hover:text-white'}`}>
        {icon}
      </span>
      {label}
      {active && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />
      )}
    </button>
  );
}

/* ─────────────────── Labeled Input ─────────────────────── */
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">
        {label}
      </label>
      {children}
    </div>
  );
}

const inp =
  'w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-700 ' +
  'outline-none focus:bg-white focus:border-[#5C457D]/30 focus:ring-4 focus:ring-[#5C457D]/8 transition-all';

/* ─────────────────── Order Card ─────────────────────────── */
function OrderCard({ image, boutique, status, statusIcon, statusColor, price, action }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl p-4 border border-gray-100 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div className="w-[60px] h-[60px] rounded-xl overflow-hidden shrink-0 shadow-sm">
        <img src={image} alt={boutique} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Boutique</p>
        <p className="text-sm font-bold text-gray-800 truncate">{boutique}</p>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Status</p>
        <div className="flex items-center gap-1.5 font-semibold text-sm" style={{ color: statusColor }}>
          {statusIcon}
          {status}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">Price</p>
        <p className="text-sm font-bold text-gray-800">{price}</p>
      </div>

      <button className="shrink-0 text-xs font-semibold px-5 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-[#5C457D] hover:text-white hover:border-[#5C457D] transition-all duration-200">
        {action}
      </button>
    </div>
  );
}

/* ══════════════════ Main Component ══════════════════════════ */
export default function AccountDetails() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({
    fullName : 'Sophia Bennett',
    email    : 'sophia.b@example.com',
    phone    : '+1 (555) 123-4567',
    gender   : 'Female',
    address  : '124 Luxury Lane, Apartment 4B, New York, NY',
  });

  const orders = [
    { id:1, image:'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=600', boutique:'The Silk Road', status:'In Transit', statusColor:'#16a34a', statusIcon:<ArrowIcon/>, price:'$420',   action:'Track Order'  },
    { id:2, image:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600', boutique:'Maison Noir',   status:'Delivered',  statusColor:'#15803d', statusIcon:<CheckIcon/>,  price:'$1,250', action:'View Receipt' },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-[#fafafa]">

      {/* ═══ Navbar ═══════════════════════════════════════════ */}
      <header className="shrink-0 bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between z-50 shadow-[0_1px_12px_rgba(0,0,0,0.04)]">
        <span
          onClick={() => navigate('/home')}
          className="text-2xl font-black text-[#5C457D] tracking-tight uppercase cursor-pointer select-none hover:opacity-80 transition-opacity"
        >
          Maison
        </span>

        <div className="flex items-center gap-5 text-gray-400">
          <button className="hover:text-[#5C457D] transition-colors"><HeartIcon/></button>
          <button className="hover:text-[#5C457D] transition-colors"><BagIcon/></button>
          <button className="hover:text-[#5C457D] transition-colors"><ChatIcon/></button>
          <button
            className="text-[#5C457D]"
            onClick={() => navigate('/account')}
          >
            <UserIcon s={22} c="#5C457D"/>
          </button>
        </div>
      </header>

      {/* ═══ Body (sidebar + content) — fills remaining height ═ */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ────────────────────────────────────────── */}
        <aside
          className="w-64 shrink-0 flex flex-col py-8 px-5 overflow-y-auto"
          style={{
            background: 'linear-gradient(160deg, #4A3668 0%, #5C457D 45%, #8B6A9F 100%)',
          }}
        >
          {/* Brand mark */}
          <div className="mb-8 px-2">
            <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mb-1">Dashboard</p>
            <h2 className="text-white text-xl font-black tracking-tight">Account</h2>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1.5">
            <NavItem icon={<UserIcon s={18} c="currentColor"/>}  label="My Profile" active={tab==='profile'} onClick={() => setTab('profile')}/>
            <NavItem icon={<OrdersIcon s={18}/>}                 label="Orders"     active={tab==='orders'}  onClick={() => setTab('orders')} />
          </nav>

          <div className="my-5 border-t border-white/15"/>

          <NavItem icon={<LogoutIcon s={18}/>} label="Logout" active={false} onClick={() => navigate('/')}/>

          {/* Decorative bottom ornament */}
          <div className="mt-auto pt-10 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <UserIcon s={22} c="rgba(255,255,255,0.5)"/>
              </div>
            </div>
          </div>
        </aside>

        {/* ── Main Content (scrollable) ───────────────────────── */}
        <main className="flex-1 overflow-y-auto px-10 py-8 flex flex-col gap-6">

          {/* Profile Header */}
          <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] p-6 flex items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg,#F3EBF5,#E5D0E8)' }}>
                <UserIcon s={38} c="#5C457D"/>
              </div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#5C457D] rounded-lg flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <PencilIcon/>
              </button>
            </div>

            {/* Name / email */}
            <div className="flex-1 min-w-0">
              <h3 className="text-2xl font-black text-gray-900 leading-tight">{form.fullName}</h3>
              <p className="text-sm text-gray-400 mt-1">{form.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400"/>
                <span className="text-xs text-gray-400 font-medium">Active Member</span>
              </div>
            </div>

            <button className="shrink-0 border-2 border-[#5C457D] text-[#5C457D] px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#5C457D] hover:text-white transition-all duration-200">
              Edit Profile
            </button>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] p-8">
            <div className="mb-7">
              <h4 className="text-lg font-black text-gray-800">Personal Information</h4>
              <p className="text-sm text-gray-400 mt-1">Update your details for a personalized shopping experience.</p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-6">
              <Field label="Full Name">
                <input type="text"  value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} className={inp}/>
              </Field>
              <Field label="Email Address">
                <input type="email" value={form.email}    onChange={e=>setForm({...form,email:e.target.value})}    className={inp}/>
              </Field>
              <Field label="Phone Number">
                <input type="tel"   value={form.phone}    onChange={e=>setForm({...form,phone:e.target.value})}    className={inp}/>
              </Field>
              <Field label="Gender">
                <div className="relative">
                  <select value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}
                    className={inp + ' appearance-none pr-10 cursor-pointer'}>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronIcon/></span>
                </div>
              </Field>
            </div>

            <Field label="Address">
              <input type="text" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className={inp}/>
            </Field>

            <div className="mt-8">
              <button
                className="px-8 py-3.5 rounded-2xl font-bold text-sm text-white transition-all duration-200 active:scale-95 shadow-lg"
                style={{ background: 'linear-gradient(135deg,#5C457D,#4A3668)', boxShadow:'0 8px 24px rgba(233,30,99,0.30)' }}
              >
                Save Changes
              </button>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.05)] p-8">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-black text-gray-800">Order History</h4>
              <button className="text-[#5C457D] text-sm font-bold hover:underline">View All Orders</button>
            </div>
            <p className="text-sm text-gray-400 mb-7">Track your recent purchases from our partner boutiques.</p>

            <div className="flex flex-col gap-4">
              {orders.map(o => <OrderCard key={o.id} {...o}/>)}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-2 py-8 border-t border-gray-100">
            <div className="grid grid-cols-4 gap-8">
              <div>
                <div className="text-lg font-black text-[#5C457D] uppercase mb-3">Maison</div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  © 2024 MAISON Boutique. Editorial curation for the discerning eye.
                </p>
              </div>
              {[
                { title:'The Collection', links:['New Arrivals','Boutique Directory','Customization'] },
                { title:'Maison',         links:['Sustainability','Our Story','Editorial'] },
                { title:'Support',        links:['Contact Us','Privacy Policy','Shipping & Returns'] },
              ].map(col => (
                <div key={col.title}>
                  <h6 className="text-[9px] font-black text-[#5C457D] uppercase tracking-widest mb-4">{col.title}</h6>
                  <ul className="space-y-2.5">
                    {col.links.map(l => (
                      <li key={l} className="text-xs text-gray-400 hover:text-[#5C457D] cursor-pointer transition-colors">{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
