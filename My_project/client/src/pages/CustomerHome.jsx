import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heroBanner from '../assets/hero_final.png';
import saree from '../assets/saree.jpg';
import lehenga from '../assets/lehenga.jpg';
import kurti from '../assets/kurti.jpg';
import bridalware from '../assets/bridalware.jpg';
import traditional from '../assets/traditional.jpg';
import trends from '../assets/trends.jpg';
import velore from '../assets/velore.jpg';
import western from '../assets/western.jpg';
import partywear from '../assets/partywear.jpg';
import grown from '../assets/grown.jpg';
import twoset from '../assets/two-set.jpg';
import summer from '../assets/summer.jpg';
import coat from '../assets/coat.jpg';

// Removed local dummy image imports for web images



export default function CustomerHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Sarees', image: saree },
    { name: 'Lehengas', image:lehenga },
    { name: 'Kurtis', image:kurti },
    { name: 'Western wear', image:western},
    { name: 'party wear', image:partywear },
    { name: 'Bridal Wear', image:bridalware },
  ];

  const boutiques = [
    { name: 'The Silk Road', category: 'Traditional', rating: 4.9, image: traditional, desc: 'Specializing in hand-woven heritage silks.' },
    { name: 'Trends', category: 'Contemporary', rating: 4.8, image: trends, desc: 'Contemporary designs for the modern woman.' },
    { name: 'Artisan Loft', category: 'Bespoke', rating: 5.0, image: velore, desc: 'Custom-tailored masterpieces using rare fabrics.' },
  ];

  const products = [
    { name: 'Aurora Silk Gown', price: '₹720', image:grown, tag: 'Customizable' },
    { name: 'Linen Muse Set', price: '₹680', image: twoset, tag: 'New Arrival' },
    { name:'girls summer vacation strap dress', price: '₹850', image: summer, tag: 'Premium' },
    { name: 'Structure Wool Coat', price: '₹560', image: coat, tag: 'Customizable' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#2D233D]">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md px-12 py-6 flex items-center justify-between border-b border-[#5C457D]/10">
        <div className="flex items-center space-x-12">
          <div className="text-2xl font-serif font-bold text-[#5C457D] tracking-tight uppercase">Maison</div>
          <div className="hidden lg:flex space-x-8 text-sm font-bold tracking-widest text-[#2D233D]/70 uppercase">
            <span className="hover:text-[#5C457D] cursor-pointer transition-colors">Home</span>
            <span className="hover:text-[#5C457D] cursor-pointer transition-colors">Boutiques</span>
            <span className="hover:text-[#5C457D] cursor-pointer transition-colors">Collection</span>
            <span className="hover:text-[#5C457D] cursor-pointer transition-colors">Customize</span>
          </div>
        </div>

        <div className="flex items-center space-x-8 text-[#2D233D]/80">
          <button className="hover:text-[#5C457D] transition-colors relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </button>
          <button className="hover:text-[#5C457D] transition-colors relative">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            <span className="absolute -top-1 -right-1 bg-[#5C457D] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">1</span>
          </button>
          <button className="hover:text-[#5C457D] transition-colors" onClick={() => navigate('/account')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </button>
        </div>
      </nav>

      {/* Hero Section Redesign */}
      <section className="relative h-[700px] flex items-center px-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img src={heroBanner} alt="Elegant fashion" className="w-full h-full object-cover object-[center_right]" />
        </div>

        {/* Content Overlaid on Left */}
        <div className="relative z-10 w-1/2 max-w-2xl mt-10">
          <h1 className="text-[5rem] leading-[1.1] font-serif mb-6 text-[#2D233D]">
            Design Your <span className="text-[#5C457D] font-bold">Style</span><br/>
            Define Your <span className="text-[#5C457D] font-bold">Identity</span>
          </h1>
          <p className="text-xl text-[#2D233D]/80 mb-10 leading-relaxed max-w-lg font-medium">
            Your vision, our craft. Customize outfits that reflect your unique style with the perfect fit and finest details.
          </p>
          <button className="bg-[#5C457D] text-white px-8 py-4 rounded-md font-bold tracking-widest text-sm uppercase hover:bg-[#4A3668] transition-all flex items-center gap-3">
            Explore Boutiques <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>

          {/* Features Bottom */}
          <div className="flex items-center gap-12 mt-16 pt-8">
            <div className="flex flex-col items-center text-center gap-3">
              <svg className="w-8 h-8 text-[#C8A96A]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
              <span className="text-xs font-bold text-[#2D233D]">Multiple Boutiques</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3 border-l border-[#5C457D]/10 pl-12">
              <svg className="w-8 h-8 text-[#C8A96A]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              <span className="text-xs font-bold text-[#2D233D]">Custom Designs</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3 border-l border-[#5C457D]/10 pl-12">
              <svg className="w-8 h-8 text-[#C8A96A]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
              <span className="text-xs font-bold text-[#2D233D]">Perfect Fit</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3 border-l border-[#5C457D]/10 pl-12">
              <svg className="w-8 h-8 text-[#C8A96A]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              <span className="text-xs font-bold text-[#2D233D]">Secure & Reliable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-12 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Browse by Category</h2>
            <p className="text-gray-500">Curated selections for every occasion</p>
          </div>
          <div className="bg-[#5C457D] p-2 rounded-xl text-white cursor-pointer hover:scale-105 transition-transform">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="group cursor-pointer text-center">
              <div className="relative aspect-square rounded-full overflow-hidden mb-4 shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
              </div>
              <p className="font-bold text-sm text-gray-700 uppercase tracking-wide group-hover:text-[#5C457D] transition-colors">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Boutiques */}
      <section className="bg-white px-12 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Curated Boutiques</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Explore unique collections from master designers across the globe.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {boutiques.map((btq, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all group">
              <div className="relative h-64">
                <img src={btq.image} alt={btq.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">{btq.category}</div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{btq.name}</h3>
                  <div className="flex items-center text-sm font-bold text-[#C8A96A]">
                    <svg className="mr-1 fill-[#C8A96A]" width="14" height="14" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    {btq.rating}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">{btq.desc}</p>
                <button className="w-full py-4 rounded-xl border border-gray-100 font-bold text-gray-700 hover:bg-[#5C457D] hover:text-white hover:border-[#5C457D] transition-all">View Boutique</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="px-12 py-24">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
            <p className="text-gray-500">The latest pieces from our top boutiques</p>
          </div>
          <button className="text-[#5C457D] font-bold flex items-center group">
            View All <svg className="ml-2 group-hover:translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((prod, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-sm">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:text-[#5C457D] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                </div>
                <div className="absolute bottom-4 left-4 bg-[#006400] text-white text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-widest">{prod.tag}</div>
              </div>
              <h4 className="font-medium text-gray-800 mb-1 group-hover:text-[#5C457D] transition-colors">{prod.name}</h4>
              <p className="text-[#5C457D] font-bold text-lg">{prod.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FDFBF7] px-12 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold text-[#5C457D] mb-6 tracking-tight uppercase">Maison</div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              © 2024 MAISON Boutique. Editorial curation for the discerning eye. Redefining the luxury boutique experience.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#5C457D]">Explore</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-[#5C457D] cursor-pointer transition-colors">The Collection</li>
              <li className="hover:text-[#5C457D] cursor-pointer transition-colors">Boutique Directory</li>
              <li className="hover:text-[#5C457D] cursor-pointer transition-colors">Customization Services</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#5C457D]">Company</h5>
            <ul className="space-y-3 text-sm text-gray-500">
              <li className="hover:text-[#5C457D] cursor-pointer transition-colors">Sustainability</li>
              <li className="hover:text-[#5C457D] cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-[#5C457D] cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-sm uppercase tracking-widest text-[#5C457D]">Newsletter</h5>
            <div className="flex">
              <input type="email" placeholder="Email address" className="flex-1 px-4 py-3 rounded-l-xl outline-none text-sm border border-gray-200" />
              <button className="bg-[#5C457D] text-white px-6 rounded-r-xl font-bold text-sm hover:bg-[#4A3668] transition-colors uppercase">Join</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat */}
      <button className="fixed bottom-8 right-8 bg-[#5C457D] text-white p-5 rounded-2xl shadow-2xl shadow-[#5C457D]/40 hover:scale-110 active:scale-95 transition-all z-50">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" /></svg>
      </button>
    </div>
  );
}
