import { useState } from "react";
import "./CreatePostHeader.css";
const CreatePostHeader = ({ title, setUpdatedTitle }) => {
  return (
    <div className="create-post-header-container">
      <input
        type="text"
        className="create-post-title"
        required
        placeholder="Title"
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
    </div>
  );
};

export default CreatePostHeader;
