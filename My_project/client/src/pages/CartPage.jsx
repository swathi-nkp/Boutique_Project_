import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#2D233D]">
      {/* Navbar Minimal */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md px-12 py-6 flex items-center justify-between border-b border-[#5C457D]/10">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-[#5C457D] font-bold hover:text-[#4A3668] transition-colors bg-white px-4 py-2 rounded-full shadow-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
            Back
          </button>
          <div className="text-xl font-serif font-bold text-[#5C457D] tracking-tight uppercase ml-6" onClick={() => navigate('/home')} style={{cursor: 'pointer'}}>Maison</div>
        </div>
      </nav>

      {/* Main Cart Content */}
      <main className="px-12 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-10 text-[#2D233D]">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
            <button 
              onClick={() => navigate('/home')}
              className="bg-[#5C457D] text-white px-8 py-3 rounded-xl font-bold tracking-widest uppercase hover:bg-[#4A3668] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="lg:w-2/3 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 flex flex-col sm:flex-row gap-6 shadow-sm border border-gray-50 items-center">
                  <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-[#2D233D]">{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove item"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      </button>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-1">{item.desc}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                        <button 
                          className="px-3 py-1 hover:bg-gray-200 transition-colors font-bold text-gray-600"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-sm font-bold bg-white border-x border-gray-200">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 hover:bg-gray-200 transition-colors font-bold text-gray-600"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[#5C457D] font-bold text-lg">{item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(92,69,125,0.08)] sticky top-32">
                <h3 className="text-xl font-bold mb-6 text-[#2D233D] border-b border-gray-100 pb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-medium text-gray-900">₹{getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span className="font-medium text-gray-900">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-8 pt-6 border-t border-gray-100">
                  <span className="font-bold text-lg">Total</span>
                  <span className="text-[#5C457D] font-bold text-2xl">₹{getCartTotal().toLocaleString()}</span>
                </div>
                
                <button 
                  className="w-full bg-[#5C457D] text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-[#4A3668] transition-colors shadow-lg shadow-[#5C457D]/30 mb-4"
                  onClick={() => alert("Proceeding to checkout...")}
                >
                  Proceed to Checkout
                </button>
                <button 
                  className="w-full bg-white border border-red-200 text-red-500 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-red-50 transition-colors"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
