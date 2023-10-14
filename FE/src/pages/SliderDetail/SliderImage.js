import React from "react";

const SliderImage = ({
  baseURL,
  updatedImage,
  editing,
  setUpdatedImage,
  handleSaveImageClick,
  currentImage,
}) => {
  console.log(baseURL + currentImage);
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      selectedFile.preview = URL.createObjectURL(selectedFile); // Tạo đường dẫn tạm thời cho ảnh
      console.log(selectedFile);
      setUpdatedImage(selectedFile); // Cập nhật đường dẫn ảnh trong state
    }
  };

  return (
    <div className="col-md-3">
      <div className="text-center">
        <h6 upload-notify>Current picture</h6>
        <img
          src={baseURL + currentImage}
          alt="something"
          className="sliderImage"
        />
        <h6 className="upload-notify">New Picture</h6>
        <img src={updatedImage.preview}
          alt="something"
          className="sliderImage" />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          readOnly={!editing}
          className="inputImage"
        />

        <button className="sliderBtn btn " onClick={handleSaveImageClick}>
          Save
        </button>
      </div>
    </div>

    /* <div>
        <label>Slider image</label>

        <img
          src={baseURL + currentImage}
          alt="something"
          className="sliderImage"
        />
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setUpdatedImage(e.target.files[0])}
        readOnly={!editing}
        className="inputImage"
      />
      <div>
        <button className="sliderBtn btn btn-dark" onClick={handleSaveImageClick}>
          Save
        </button>
      </div>
    </div> */
  );
};

export default SliderImage;
