import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SliderDetail = () => {
  const { sliderId } = useParams();
  const [sliderData, setSliderData] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedNote, setUpdatedNote] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(0); // Sử dụng giá trị mặc định
  const imageGet = "";
  const navigate = useNavigate();
  const baseURL = "http://localhost:8081/";

  useEffect(() => {
    fetch(`http://localhost:8080/sliders/edit/${sliderId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSliderData(data);
        setUpdatedTitle(data.title);
        setUpdatedImage(data.image);

        setUpdatedNote(data.note);
        setUpdatedStatus(data.status);
      })
      .catch((error) => {
        console.error("Error fetching slider data:", error);
      });
  }, [sliderId]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Tạo một đối tượng mới chứa thông tin đã cập nhật

    const formData = {
      image: updatedImage,
      title: updatedTitle,
      id: sliderId,
      note: updatedNote,
      status: updatedStatus,
    };

    // Gửi yêu cầu PUT với đối tượng updatedSliderData
    fetch(`http://localhost:8080/sliders/edit/${sliderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.data.status);
        }
        return response.json();
      })
      .then((data) => {
        navigate("/sliders");
      })
      .catch((error) => {
        console.error("Error updating slider data:", error);
      });
  };

  return (
    <div>
      <div>
        Slider ID:
        <input type="text" value={sliderData.sliderID} readOnly />
      </div>

      <div>
        Slider titile
        <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          readOnly={!editing}
        />
      </div>

      <div>
        Slider image
        <img src={baseURL + updatedImage} alt="something" />
        <input
          type="file"
          accept="image/*"
          enctype="multipart/form-data"
          onChange={(e) => setUpdatedImage(e.target.files[0])}
          readOnly={!editing}
        />
      </div>

      <div>
        Slider note
        <input
          type="text"
          value={updatedNote}
          onChange={(e) => setUpdatedNote(e.target.value)}
          readOnly={!editing}
        />
      </div>

      <div>
        Slider status:
        <select
          value={updatedStatus}
          onChange={(e) => setUpdatedStatus(e.target.value)}
          readOnly={!editing}
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>

      <div>
        {editing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default SliderDetail;
