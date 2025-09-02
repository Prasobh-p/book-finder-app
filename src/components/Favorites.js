import React from 'react';

const Favorites = ({ favorites, onSelectBook, onViewDetails, onRemoveFromFavorites }) => {
  if (favorites.length === 0) {
    return <div className="no-favorites">You haven't added any favorites yet.</div>;
  }

  return (
    <div className="favorites-page">
      <h2>Your Favorite Books</h2>
      <div className="book-results">
        {favorites.map((book, index) => (
          <div key={index} className="book-card">
            <div 
              className="book-cover"
              onClick={() => {
                onSelectBook(book);
                onViewDetails();
              }}
            >
              {book.cover_i ? (
                <img 
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`} 
                  alt={`Cover of ${book.title}`} 
                />
              ) : (
                <div className="no-cover">No cover available</div>
              )}
            </div>
            <div className="book-details">
              <h3>{book.title}</h3>
              {book.author_name && (
                <p className="author">By: {book.author_name.join(', ')}</p>
              )}
              <button 
                onClick={() => onRemoveFromFavorites(book.key)}
                className="remove-favorite"
              >
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;