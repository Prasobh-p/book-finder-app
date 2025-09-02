import React from 'react';

const BookDetails = ({ book, onBack, onAddToFavorites, isFavorite }) => {
  return (
    <div className="book-details-page">
      <button onClick={onBack} className="back-button">← Back to Search</button>
      <div className="book-detail-card">
        <div className="book-cover-large">
          {book.cover_i ? (
            <img 
              src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} 
              alt={`Cover of ${book.title}`} 
            />
          ) : (
            <div className="no-cover">No cover available</div>
          )}
        </div>
        <div className="book-info">
          <h2>{book.title}</h2>
          {book.author_name && (
            <p className="author">By: {book.author_name.join(', ')}</p>
          )}
          {book.first_publish_year && (
            <p className="publish-year">First published: {book.first_publish_year}</p>
          )}
          {book.isbn && (
            <p className="isbn">ISBN: {book.isbn[0]}</p>
          )}
          {book.subject && (
            <div className="subjects">
              <h4>Subjects:</h4>
              <div className="subject-tags">
                {book.subject.slice(0, 5).map((subject, index) => (
                  <span key={index} className="subject-tag">{subject}</span>
                ))}
              </div>
            </div>
          )}
          <button 
            onClick={() => onAddToFavorites(book)}
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          >
            {isFavorite ? '★ Added to Favorites' : '☆ Add to Favorites'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;