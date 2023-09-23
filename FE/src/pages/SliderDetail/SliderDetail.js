import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SliderImage from "./SliderImage";
import SlidersData from "./SlidersData";
import './SliderDetail.css'


const SliderDetail = () => {
  const { sliderId } = useParams();
  const [sliderData, setSliderData] = useState({});
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedNote, setUpdatedNote] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(0); // Sử dụng giá trị mặc định
  const [currentImage, setCurrentImage] = useState("");
  const navigate = useNavigate();
  const baseURL = "http://localhost:8081/";
  const token = localStorage.getItem("token");


  useEffect(() => {
    fetch(`http://localhost:8080/sliders/edit/${sliderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSliderData(data);
        setUpdatedTitle(data.title);
        setCurrentImage(data.image);
        setUpdatedNote(data.note);
        setUpdatedStatus(data.status);
        
      })
      .catch((error) => {
        console.error("Error fetching slider data:", error);
      });
  }, [sliderId]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setEditing(true);
  };


  const handleSaveDataClick = (e) => {
    e.preventDefault();
    setEditing(false);
    // Tạo một đối tượng mới chứa thông tin đã cập nhật

    const formData = new FormData();
    formData.append("title", updatedTitle);
    formData.append("id", sliderId);
    formData.append("note", updatedNote);
    formData.append("status", updatedStatus);

    // Gửi yêu cầu PUT để cập nhật dữ liệu
    fetch(`http://localhost:8080/sliders/edit/data/${sliderId}`, {
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
        navigate(`/sliders/edit/${sliderId}`);
      })
      .catch((error) => {
        console.error("Error updating slider data:", error);
      });
  };
  const handleSaveImageClick = (e) => {
    // Tạo một đối tượng mới chứa thông tin đã cập nhật
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", updatedImage);

    
    // Gửi yêu cầu PUT để cập nhật ảnh
    fetch(`http://localhost:8080/sliders/edit/image/${sliderId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        console.log("test");
        if (!response.ok) {
          throw new Error(response.data.status);
        }
        return response.json();
      })
      .then((data) => {
         navigate(`/sliders/edit/${sliderId}`);
      })
      .catch((error) => {
        console.error("Error updating slider data:", error);
      });
  };

  return (
    <div className="row">
      <div className="col-md-3 form-data">
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
          handleEditClick={handleEditClick}
        />
      </div>

      <div className="col-md-9 form-img">
        <SliderImage
          baseURL={baseURL}
          updatedImage={updatedImage}
          editing={editing}
          setUpdatedImage={setUpdatedImage}
          handleSaveImageClick={handleSaveImageClick}
          currentImage={currentImage}
        />
      </div>
    </div>
  );
};

export default SliderDetail;
