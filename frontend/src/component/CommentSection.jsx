import React from 'react';
import './CommentSection.css';

const CommentSection = () => {
  return (
    <div className="comment-section-container">
      <h3>Comments</h3>
      <div className="comment-input-area">
        <textarea
          className="comment-textarea"
          placeholder="Write your comment here..."
          rows="4"
        ></textarea>
        <button className="submit-comment-button">Submit Comment</button>
      </div>
      <div className="comments-list">
        <div className="comment-item">
          <p className="comment-author">User1</p>
          <p className="comment-content">This is a placeholder comment. Great post!</p>
          <span className="comment-date">2026-01-09</span>
        </div>
        <div className="comment-item">
          <p className="comment-author">User2</p>
          <p className="comment-content">Another placeholder comment to show the layout.</p>
          <span className="comment-date">2026-01-09</span>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;