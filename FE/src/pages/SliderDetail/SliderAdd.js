import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SliderAdd.css";

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
          status: item.status,
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
    <div className="slider-wrap">
      <h1>Add New Slider</h1>
      <br />
      <div className="row">
        <div className="col-md-3">
          <div className="text-center">
            <img
              src={updatedImage.preview}
              alt="Choose some img for slider"
              className="sliderImage"
            />
            <h6 className="upload-notify">Upload a photo</h6>

            <input
              required
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="inputImage"
            />
          </div>
        </div>

        <div className="col-md-9 personal-info">
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="col-lg-3 control-label">Subject Title</label>
              <div className="col-lg-8">
                <input
                  type="text"
                  value={updatedTitle}
                  className="inputData form-control"
                  required
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Subject Name</label>
              <div className="col-lg-8">
                <select
                  className="inputData form-control"
                  required
                  onChange={(e) => {
                    setUpdateSubject(e.target.value);
                  }}
                >
                  <option value="-1">Choose subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.subjectID} value={subject.subjectID}>
                      {subject.subjectName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Slider Note</label>
              <div className="col-lg-8">
                <input
                  required
                  type="text"
                  className="inputData form-control"
                  value={updatedNote}
                  onChange={(e) => setUpdatedNote(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="col-lg-3 control-label">Slider status</label>
              <div className="col-lg-8">
                <div className="ui-select">
                  <select
                    required
                    className="inputData form-control"
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label class="col-md-3 control-label"></label>
              <div class="col-md-8">
                
                <button
                  className="sliderBtn btn btn-dark"
                  onClick={handleSaveDataClick}
                >
                  Add new sliders
                </button>

                <button className="btn sliderBtn btn-back">
                  <Link to={"/sliders"}>Back to slider list</Link>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    // <div className="row slider-detail slider-add">
    //     <div className="col-md-6 form-data">
    //       <div className="form-group">
    //         <label>Slider title</label>
    //         <input
    //           type="text"
    //           value={updatedTitle}
    //         className="inputData"
    //         required
    //           onChange={(e) => setUpdatedTitle(e.target.value)}
    //         />
    //       </div>
    //     <div>
    //       <label>Subject</label>
    //         <select
    //         className="inputData"
    //         required
    //           onChange={(e) => {
    //             setUpdateSubject(e.target.value);
    //           }}
    //         >
    //           <option value="-1">Choose subject</option>
    //           {subjects.map((subject) => (
    //             <option key={subject.subjectID} value={subject.subjectID}>
    //               {subject.subjectName}
    //             </option>
    //           ))}
    //         </select>
    //       </div>
    //       <div>
    //         <label>Slider note</label>
    //         <input
    //         required
    //         type="text"
    //           className="inputData"
    //           value={updatedNote}
    //           onChange={(e) => setUpdatedNote(e.target.value)}
    //         />
    //       </div>
    //       <div>
    //         <label>Slider status:</label>
    //       <select
    //         required
    //           className="inputData"
    //           value={updatedStatus}
    //           onChange={(e) => setUpdatedStatus(e.target.value)}
    //         >
    //           <option value="true">Active</option>
    //           <option value="false">Inactive</option>
    //         </select>
    //       </div>
    //       </div>
    //       <div className="col-md-6 form-img">
    //         <label>Slider image</label>
    //         <img
    //           src={updatedImage.preview}
    //           alt="Choose some img for slider"
    //           className="sliderImage"
    //         />
    //     <input
    //       required
    //           type="file"
    //           accept="image/*"
    //           onChange={handleImageChange}
    //           className="inputImage"
    //         />
    //       </div>

    //       <div className="btn-parent">
    //         <button className="sliderBtn btn btn-dark btn-add" onClick={handleSaveDataClick}>Add new sliders</button>
    //       </div>

    // </div>
  );
};

export default SliderAdd;
