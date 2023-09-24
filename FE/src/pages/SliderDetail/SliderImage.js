import React from "react";

const SliderImage = ({
  baseURL,
  updatedImage,
  editing,
  setUpdatedImage,
  handleSaveImageClick,
  handleEditClick,
  currentImage
}) => {
  return (
    <form>
      <div>
        <label>Slider image</label>

        <img src={baseURL + currentImage} alt="something" className="sliderImage"/>
      </div>

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
