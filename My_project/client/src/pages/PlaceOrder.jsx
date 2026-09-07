import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import grownImg from '../assets/grown.jpg'; // default fallback image

export default function PlaceOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Get passed product or fallback to a default product
  const product = location.state?.product || {
    id: 999,
    name: 'Aurora Silk Gown',
    price: '₹720',
    image: grownImg,
    tag: 'Customizable',
    desc: 'Bespoke silk gown designed to perfection, drape styled for special occasions.'
  };

  // State fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  
  // Tailoring measurements
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hips, setHips] = useState('');
  const [height, setHeight] = useState('');
  const [sleeveLength, setSleeveLength] = useState('');
  const [shoulderWidth, setShoulderWidth] = useState('');
  const [notes, setNotes] = useState('');

  // Status & Modal states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState(null);

  // Pre-fill user details from profile context
  useEffect(() => {
    if (user) {
      setCustomerName(user.name || '');
      setPhone(user.phone || '');
      setShippingAddress(user.address || '');
      if (user.measurements) {
        setChest(user.measurements.chest || '');
        setWaist(user.measurements.waist || '');
        setHips(user.measurements.hips || '');
        setHeight(user.measurements.height || '');
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // Parse price value (remove currency symbol and commas)
    const priceStr = String(product.price || '0');
    const totalAmount = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;

    const mockOrder = {
      _id: 'mock_' + Math.random().toString(36).substr(2, 9),
      productName: product.name,
      productImage: product.image,
      customerName,
      phone,
      shippingAddress,
      totalAmount,
      boutiqueId: {
        boutiqueName: product.boutique || 'The Silk Road'
      },
      status: 'Pending',
      measurements: {
        chest,
        waist,
        hips,
        height,
        sleeveLength,
        shoulderWidth,
        notes,
      },
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('localOrders');
      const orders = existing ? JSON.parse(existing) : [];
      orders.unshift(mockOrder);
      localStorage.setItem('localOrders', JSON.stringify(orders));
    } catch (err) {
      console.error('Error saving local order:', err);
    }

    setCreatedOrder(mockOrder);
    setIsSuccess(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#2D233D]">
      {/* Navbar Minimal */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md px-12 py-6 flex items-center justify-between border-b border-[#5C457D]/10">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-[#5C457D] font-bold hover:text-[#4A3668] transition-colors bg-white px-4 py-2 rounded-full shadow-sm text-xs uppercase tracking-wider"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </button>
          <div className="text-xl font-serif font-bold text-[#5C457D] tracking-tight uppercase ml-6 cursor-pointer" onClick={() => navigate('/home')}>Maison</div>
        </div>
      </nav>

      {/* Main Form Content */}
      <main className="px-6 sm:px-12 py-12 max-w-6xl mx-auto relative">
        <h1 className="text-4xl font-serif font-bold mb-2 text-[#2D233D]">Order Checkout</h1>
        <p className="text-gray-500 mb-10 text-sm">Provide your customized specifications for tailoring and delivery.</p>

        {errorMsg && (
          <div className="bg-red-50 text-red-500 text-sm p-4 rounded-xl border border-red-100 mb-8 max-w-4xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl">
          
          {/* Left Side: Product Card Preview */}
          <div className="w-full lg:w-2/5 sticky top-28 bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_10px_30px_rgba(92,69,125,0.04)]">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-gray-50">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {product.tag && (
              <span className="inline-block bg-[#F3EBF5] text-[#5C457D] text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-3">
                {product.tag}
              </span>
            )}
            <h2 className="text-2xl font-serif font-bold text-[#2D233D] mb-1">{product.name}</h2>
            <p className="text-gray-400 text-xs mb-4">{product.desc || 'Premium bespoke customized outfit.'}</p>
            <div className="flex justify-between items-center border-t border-gray-100 pt-4 mt-4">
              <span className="text-gray-400 font-medium text-sm">Total Price</span>
              <span className="text-[#5C457D] font-bold text-2xl">{product.price}</span>
            </div>
          </div>

          {/* Right Side: Shipping & Tailoring Form */}
          <div className="w-full lg:w-3/5 bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_40px_rgba(92,69,125,0.03)] space-y-8">
            
            {/* Section 1: Customer Details */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3EBF5] text-[#5C457D] flex items-center justify-center text-xs font-bold">1</span>
                Contact & Shipping Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-500 outline-none focus:border-[#5C457D] bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-500 outline-none focus:border-[#5C457D] bg-gray-50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Shipping Address</label>
                <input
                  type="text"
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Apartment, Street Address, City, Pincode"
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-500 outline-none focus:border-[#5C457D] bg-gray-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Section 2: Tailoring Measurements */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-5 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#F3EBF5] text-[#5C457D] flex items-center justify-center text-xs font-bold">2</span>
                Tailoring Measurements (Inches)
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Chest (in)', val: chest, set: setChest, p: 'e.g. 34' },
                  { label: 'Waist (in)', val: waist, set: setWaist, p: 'e.g. 28' },
                  { label: 'Hips (in)', val: hips, set: setHips, p: 'e.g. 38' },
                  { label: 'Height', val: height, set: setHeight, p: 'e.g. 165cm' },
                  { label: 'Sleeve Length (in)', val: sleeveLength, set: setSleeveLength, p: 'e.g. 22' },
                  { label: 'Shoulder (in)', val: shoulderWidth, set: setShoulderWidth, p: 'e.g. 15' },
                ].map((m) => (
                  <div key={m.label} className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">{m.label}</label>
                    <input
                      type="text"
                      value={m.val}
                      onChange={(e) => m.set(e.target.value)}
                      placeholder={m.p}
                      className="border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-800 placeholder:text-gray-500 outline-none focus:border-[#5C457D] bg-gray-50 focus:bg-white transition-colors text-center font-semibold"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Special Tailoring Instructions (Optional)</label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify material preferences, adjustments, or fit requirements..."
                  className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-500 outline-none focus:border-[#5C457D] bg-gray-50 focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5C457D] hover:bg-[#4A3668] text-white py-4 rounded-2xl font-bold tracking-widest uppercase transition-all shadow-lg shadow-[#5C457D]/20 active:scale-98 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Placing Order...
                  </>
                ) : (
                  <>
                    Place Tailoring Order
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>

      {/* Success Modal Overlay */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2D1B4E]/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-white rounded-3xl p-10 text-center shadow-2xl space-y-6 animate-scaleUp">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-3xl text-green-500 mx-auto border-2 border-green-100">
              ✓
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-bold text-[#2D233D]">Order Placed!</h2>
              <p className="text-gray-500 text-sm">Your bespoke request has been sent to our partner boutique.</p>
            </div>

            {createdOrder && (
              <div className="bg-[#FDFBF7] border border-gray-100 rounded-2xl p-5 text-left text-xs space-y-2 text-gray-600">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="font-bold text-gray-500">Order ID:</span>
                  <span className="font-mono text-gray-800">#{createdOrder._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-500">Design:</span>
                  <span className="font-semibold text-gray-800">{createdOrder.productName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-500">Tailoring Status:</span>
                  <span className="text-amber-600 font-bold">{createdOrder.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-gray-500">Customer:</span>
                  <span className="font-semibold text-gray-800">{createdOrder.customerName}</span>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => navigate('/account')}
                className="flex-1 border-2 border-[#5C457D] text-[#5C457D] py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#F3EBF5] transition-colors"
              >
                View Dashboard
              </button>
              <button
                onClick={() => navigate('/home')}
                className="flex-1 bg-[#5C457D] hover:bg-[#4A3668] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#5C457D]/10"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
