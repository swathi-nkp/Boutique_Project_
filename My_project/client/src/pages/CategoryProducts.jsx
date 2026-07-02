import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

// Use available images
import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import img4 from '../assets/img4.jpeg';
import sareeImg from '../assets/saree.jpg';
import traditionalImg from '../assets/traditional.jpg';

export default function CategoryProducts() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, cartItems } = useCart();

  // Capitalize category name for display
  const title = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Collection';

  // Dummy products specifically tailored if they click on 'sarees', else generic
  const getProducts = () => {
    if (categoryName === 'sarees') {
      return [
        { id: 1, name: 'Kanjivaram Silk Saree', price: '₹4,500', image: img1, tag: 'Bestseller', desc: 'A rich and elegant hand-woven Kanjivaram silk saree with traditional gold zari motifs.' },
        { id: 2, name: 'Banarasi Brocade Saree', price: '₹6,200', image: img2, tag: 'Premium', desc: 'Exquisite Banarasi silk featuring intricate floral patterns and a heavy border.' },
        { id: 3, name: 'Georgette Designer Saree', price: '₹3,100', image: img3, tag: 'New Arrival', desc: 'Lightweight and flowy georgette saree perfect for evening parties.' },
        { id: 4, name: 'Chanderi Cotton Saree', price: '₹2,400', image: img4, tag: 'Classic', desc: 'Comfortable and sheer chanderi cotton saree with subtle zari work.' },
        { id: 5, name: 'Mysore Silk Crepe', price: '₹5,800', image: sareeImg, tag: 'Customizable', desc: 'Soft Mysore silk crepe saree known for its minimalist appeal and smooth drape.' },
        { id: 6, name: 'Traditional Paithani', price: '₹8,900', image: traditionalImg, tag: 'Heritage', desc: 'A gorgeous Maharashtrian Paithani saree with signature peacock motifs.' }
      ];
    } else {
      // Generic products for other categories
      return [
        { id: 1, name: 'Elegant Design 1', price: '₹3,500', image: img1, tag: 'New', desc: 'A beautiful and elegantly crafted piece.' },
        { id: 2, name: 'Premium Collection 2', price: '₹5,200', image: img2, tag: 'Premium', desc: 'Stand out with this premium addition to your wardrobe.' },
        { id: 3, name: 'Classic Fit 3', price: '₹2,800', image: img3, tag: 'Classic', desc: 'Timeless design that never goes out of style.' },
        { id: 4, name: 'Designer Exclusive 4', price: '₹4,900', image: img4, tag: 'Exclusive', desc: 'Designed by top boutique designers.' },
      ];
    }
  };

  const products = getProducts();

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
          <div className="text-xl font-serif font-bold text-[#5C457D] tracking-tight uppercase ml-6">Maison</div>
        </div>
        <div className="flex items-center space-x-8 text-[#2D233D]/80">
          <button 
            className="hover:text-[#5C457D] transition-colors relative"
            onClick={() => navigate('/cart')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#5C457D] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="px-12 py-16 bg-white border-b border-[#5C457D]/5 text-center">
        <h1 className="text-5xl font-serif font-bold mb-4">{title}</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore our exclusive collection of {title.toLowerCase()}. Custom-tailored to perfection, ensuring you look and feel your absolute best.
        </p>
      </header>

      {/* Product Grid */}
      <main className="px-12 py-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((prod) => (
            <div 
              key={prod.id} 
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_50px_rgba(92,69,125,0.15)] transition-all duration-500 flex flex-col"
              onClick={() => setSelectedProduct(prod)}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-bold text-[#5C457D] uppercase tracking-widest shadow-sm">
                  {prod.tag}
                </div>
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-[-50px] left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:bottom-0 transition-all duration-500 flex justify-center">
                  <span className="text-white font-bold tracking-widest uppercase text-sm">View Details</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-[#5C457D] transition-colors">{prod.name}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">{prod.desc}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <span className="text-[#5C457D] font-bold text-xl">{prod.price}</span>
                  <button className="text-gray-400 hover:text-[#5C457D] transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal for Details */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-[#2D233D]/60 backdrop-blur-sm cursor-pointer"
            onClick={() => setSelectedProduct(null)}
          ></div>
          <div className="relative bg-white rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <button 
              className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-white p-2 rounded-full backdrop-blur-sm transition-colors text-gray-800"
              onClick={() => setSelectedProduct(null)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <div className="md:w-1/2 h-64 md:h-auto">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
              <div className="inline-block bg-[#F3EBF5] text-[#5C457D] text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest mb-4 w-max">
                {selectedProduct.tag}
              </div>
              <h2 className="text-3xl font-serif font-bold mb-2 text-[#2D233D]">{selectedProduct.name}</h2>
              <p className="text-[#5C457D] text-2xl font-bold mb-6">{selectedProduct.price}</p>
              
              <div className="mb-8">
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3">Description</h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {selectedProduct.desc}
                </p>
              </div>

              <div className="space-y-4 mt-auto">
                <button 
                  className="w-full bg-[#5C457D] text-white py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-[#4A3668] transition-colors shadow-lg shadow-[#5C457D]/30"
                  onClick={() => {
                    addToCart(selectedProduct);
                    alert(`${selectedProduct.name} added to cart!`);
                  }}
                >
                  Customize & Add to Cart
                </button>
                <button className="w-full bg-white border-2 border-gray-100 text-gray-700 py-4 rounded-xl font-bold tracking-widest uppercase hover:border-[#5C457D] hover:text-[#5C457D] transition-colors">
                  Contact Boutique
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
