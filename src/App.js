import React, { useState, useEffect } from 'react';
import BookSearch from './components/BookSearch';
import BookResults from './components/BookResults';
import BookDetails from './components/BookDetails';
import Favorites from './components/Favorites';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('search'); // 'search', 'details', 'favorites'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('bookFinderFavorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('bookFinderFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (book) => {
    if (!favorites.some(fav => fav.key === book.key)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFromFavorites = (bookKey) => {
    setFavorites(favorites.filter(book => book.key !== bookKey));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Finder for Alex</h1>
        <p>Find textbooks and leisure reading for your college studies</p>
        <nav>
          <button onClick={() => setView('search')}>Search</button>
          <button onClick={() => setView('favorites')}>
            Favorites ({favorites.length})
          </button>
        </nav>
      </header>
      <main>
        {view === 'search' && (
          <>
            <BookSearch 
              setBooks={setBooks} 
              setLoading={setLoading} 
              setError={setError} 
              loading={loading}
            />
            {loading && <div className="loading">Searching for books...</div>}
            {error && <div className="error">{error}</div>}
            <BookResults 
              books={books} 
              onSelectBook={setSelectedBook}
              onViewDetails={() => setView('details')}
              onAddToFavorites={addToFavorites}
              favorites={favorites}
            />
          </>
        )}
        
        {view === 'details' && selectedBook && (
          <BookDetails 
            book={selectedBook} 
            onBack={() => setView('search')}
            onAddToFavorites={addToFavorites}
            isFavorite={favorites.some(fav => fav.key === selectedBook.key)}
          />
        )}
        
        {view === 'favorites' && (
          <Favorites 
            favorites={favorites} 
            onSelectBook={setSelectedBook}
            onViewDetails={() => setView('details')}
            onRemoveFromFavorites={removeFromFavorites}
          />
        )}
      </main>
    </div>
  );
}

export default App;