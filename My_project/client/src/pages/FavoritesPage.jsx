import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-[#2D233D]">
      {/* Navbar Minimal */}
      <nav className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md px-12 py-6 flex items-center justify-between border-b border-[#5C457D]/10">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/home')} 
            className="flex items-center text-[#5C457D] font-bold hover:text-[#4A3668] transition-colors bg-white px-4 py-2 rounded-full shadow-sm text-xs uppercase tracking-wider"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
            Home
          </button>
          <div className="text-xl font-serif font-bold text-[#5C457D] tracking-tight uppercase ml-6 cursor-pointer" onClick={() => navigate('/home')}>Maison</div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="text-[#5C457D] transition-colors relative" onClick={() => navigate('/favorites')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#5C457D] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </button>
          <button className="text-gray-500 hover:text-[#5C457D] transition-colors" onClick={() => navigate('/account')}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </button>
        </div>
      </nav>

      {/* Main Wishlist Content */}
      <main className="px-12 py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-serif font-bold mb-2 text-[#2D233D]">Your Favorites</h1>
        <p className="text-gray-500 mb-10 text-sm">Your highly curated collection of boutique pieces waiting to be tailored.</p>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-gray-100">
            <div className="w-20 h-20 bg-[#FDF2F4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#5C457D]">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No favorites yet</h2>
            <p className="text-gray-500 mb-8 text-sm">Explore our catalog and click the heart icon on designs you love.</p>
            <button 
              onClick={() => navigate('/home')}
              className="bg-[#5C457D] text-white px-8 py-4 rounded-xl font-bold tracking-widest uppercase hover:bg-[#4A3668] transition-colors shadow-lg shadow-[#5C457D]/10"
            >
              Continue Curation
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {favorites.map((item) => (
              <div key={item.name} className="bg-white rounded-3xl p-6 flex gap-6 shadow-[0_10px_30px_rgba(92,69,125,0.04)] border border-gray-50 items-center hover:shadow-[0_20px_40px_rgba(92,69,125,0.08)] transition-all duration-300">
                <div className="w-28 h-36 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 shadow-inner">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col h-full justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold text-[#2D233D] line-clamp-1 leading-snug">{item.name}</h3>
                      <button 
                        onClick={() => removeFavorite(item.name)}
                        className="text-red-300 hover:text-red-500 transition-colors p-1"
                        title="Remove from favorites"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                      </button>
                    </div>
                    {item.tag && (
                      <span className="inline-block bg-[#F3EBF5] text-[#5C457D] text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider mt-1 mb-2">
                        {item.tag}
                      </span>
                    )}
                    <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">{item.desc || 'Exclusive premium tailor design.'}</p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                    <span className="text-[#5C457D] font-bold text-lg">{item.price}</span>
                    <button
                      onClick={() => navigate('/placeorder', { state: { product: item } })}
                      className="bg-[#5C457D] hover:bg-[#4A3668] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-md shadow-[#5C457D]/10"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
