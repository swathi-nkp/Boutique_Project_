import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('maison_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('maison_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      // Handle check by name or id since some dummy products don't have unique ids
      const exists = prev.some((item) => item.name === product.name);
      if (exists) {
        return prev.filter((item) => item.name !== product.name);
      } else {
        return [...prev, product];
      }
    });
  };

  const isFavorite = (productName) => {
    return favorites.some((item) => item.name === productName);
  };

  const removeFavorite = (productName) => {
    setFavorites((prev) => prev.filter((item) => item.name !== productName));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
