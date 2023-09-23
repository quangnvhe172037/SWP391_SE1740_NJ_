import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SliderImage from "./SliderImage";
import SlidersData from "./SlidersData";

const SliderAdd = () => {
  const [sliderData, setSliderData] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedNote, setUpdatedNote] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(0); // Sử dụng giá trị mặc định
  const navigate = useNavigate();
  const baseURL = "http://localhost:8081/";
  const token = localStorage.getItem("token");

  const handleSaveDataClick = (e) => {
    e.preventDefault();
    // Tạo một đối tượng mới chứa thông tin đã cập nhật

    const formData = new FormData();
    formData.append("title", updatedTitle);
    formData.append("note", updatedNote);
    formData.append("status", updatedStatus);
    formData.append("image", updatedImage);

    // Gửi yêu cầu PUT để cập nhật dữ liệu
    fetch(`http://localhost:8080/sliders/add/data`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
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
        <SlidersData
          sliderData={sliderData}
          updatedTitle={updatedTitle}
          updatedNote={updatedNote}
          updatedStatus={updatedStatus}
          editing={editing}
          setUpdatedTitle={setUpdatedTitle}
          setUpdatedNote={setUpdatedNote}
          setUpdatedStatus={setUpdatedStatus}
          handleSaveDataClick={handleSaveDataClick}
        />
      </div>

      <div>
        <SliderImage
          baseURL={baseURL}
          updatedImage={updatedImage}
          editing={editing}
          setUpdatedImage={setUpdatedImage}
        />
      </div>
    </div>
  );
};

export default SliderAdd;
