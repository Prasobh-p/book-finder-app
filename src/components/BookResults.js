import React from 'react';

const BookResults = ({ books, onSelectBook, onViewDetails, onAddToFavorites, favorites }) => {
  if (books.length === 0) {
    return <div className="no-results">No books found. Try a different search.</div>;
  }

  return (
    <div className="book-results">
      {books.map((book, index) => (
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
              onClick={() => onAddToFavorites(book)}
              className={`favorite-btn ${favorites.some(fav => fav.key === book.key) ? 'favorited' : ''}`}
            >
              {favorites.some(fav => fav.key === book.key) ? '★ Favorited' : '☆ Favorite'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookResults;