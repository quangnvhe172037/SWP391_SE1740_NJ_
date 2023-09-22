import React from "react";

const SliderImage = ({
  baseURL,
  updatedImage,
  editing,
  setUpdatedImage,
  handleSaveImageClick,
  handleEditClick,
}) => {
  return (
    <form>
      Slider image
      <img src={baseURL + updatedImage} alt="something" />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setUpdatedImage(e.target.files[0])}
        readOnly={!editing}
      />
      <div>
       
          <button onClick={handleSaveImageClick}>Save</button>
      
      </div>
    </form>
  );
};

export default SliderImage;
