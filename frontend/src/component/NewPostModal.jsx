import React from 'react';
import './NewPostModal.css';

const NewPostModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create New Post</h3>
        <div className="form-group">
          <label htmlFor="postTitle">Title:</label>
          <input
            type="text"
            id="postTitle"
            className="post-input"
            placeholder="Enter post title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            className="post-textarea"
            placeholder="Write your post content here..."
            rows="10"
          ></textarea>
        </div>
        <div className="modal-actions">
          <button className="submit-post-button">Submit</button>
          <button className="cancel-post-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default NewPostModal;