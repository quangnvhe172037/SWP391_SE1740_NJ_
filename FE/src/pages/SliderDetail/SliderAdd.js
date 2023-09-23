import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SliderAdd = () => {
  const [subjects, setSubjects] = useState([]);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedNote, setUpdatedNote] = useState("");
  const [updateSubject, setUpdateSubject] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(0); // Sử dụng giá trị mặc định
  
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:8080/subjects/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((dataJson) => {
        console.log("subject" + dataJson);

        const data = dataJson.map((item) => ({
          subjectID: item.subjectID,
          subjectName: item.subjectName,
          status: item.status
        }));
        return data;
      })

      .then((result) => {
        const mockData = result;
        setSubjects(mockData);
        
      });
  }, []);

  const handleSaveDataClick = (e) => {
    e.preventDefault();
    // Tạo một đối tượng mới chứa thông tin đã cập nhật

    const formData = new FormData();
    formData.append("title", updatedTitle);
    formData.append("note", updatedNote);
    formData.append("status", updatedStatus);
    formData.append("image", updatedImage);
    console.log(updateSubject);
    formData.append("subjectId", updateSubject);

    // Gửi yêu cầu PUT để cập nhật dữ liệu
    fetch(`http://localhost:8080/sliders/add`, {
      method: "POST",
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


  
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      selectedFile.preview = URL.createObjectURL(selectedFile); // Tạo đường dẫn tạm thời cho ảnh
      console.log(selectedFile);
      setUpdatedImage(selectedFile); // Cập nhật đường dẫn ảnh trong state
    }
  };

  return (
    <div>
      <div>
        <form>
          <div>
            Slider title
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          <div>
            <select
              value="-1"
              onChange={(e) => {
              
              setUpdateSubject(e.target.value)
              }}>
              <option value="-1">Choose subject</option>
              {subjects.map((subject) => (
                <option key={subject.subjectID} value={subject.subjectID}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>
          <div>
            Slider note
            <input
              type="text"
              value={updatedNote}
              onChange={(e) => setUpdatedNote(e.target.value)}
            />
          </div>
          <div>
            Slider status:
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          Slider image
          <img src={updatedImage.preview} alt="something" />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div>
            <button onClick={handleSaveDataClick}>Add new sliders</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SliderAdd;
