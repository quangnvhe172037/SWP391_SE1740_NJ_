
import { Routes, Route, Link,useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
const AddSubject = () => {

    const [categories, setCategories] = useState([]);
    const [updatedName, setUpdatedName] = useState("");
    const [updatedImage, setUpdatedImage] = useState("");
    const [updateCategory, setUpdateCategory] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");
    const [updatedStatus, setUpdatedStatus] = useState(0);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const apiCategorySubjects = "http://localhost:8080/categorysubject/all";
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch(apiCategorySubjects).then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }).then((dataJson) => {
            const data = dataJson.map((item) => ({
                id: item.id,
                name: item.cateName
            }));
            return data;
        })

            .then((result) => {
                const data = result;
                setCategories(data);
            })
    }, []);
    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            selectedFile.preview = URL.createObjectURL(selectedFile); // Tạo đường dẫn tạm thời cho ảnh
            console.log(selectedFile);
            setUpdatedImage(selectedFile); // Cập nhật đường dẫn ảnh trong state
        }
    };
    const handleSaveDataClick = (e) => {
        e.preventDefault();
        // Tạo một đối tượng mới chứa thông tin đã cập nhật
    
        const formData = new FormData();
        const temp = {
            subjectName : updatedName,
            subjectCategory : categories.find(n => n.id == Number(updateCategory)),
            status : updatedStatus,
            description : updatedDescription
        }
        formData.append("file", updatedImage);
        formData.append("subject", JSON.stringify(temp));
    
        // Gửi yêu cầu PUT để cập nhật dữ liệu
        fetch(`http://localhost:8080/subjects/create`, {
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
    return (
        <div className="slider-wrap">
            <h1>Add New Subject</h1>
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
                            <label className="col-lg-3 control-label">Subject Name</label>
                            <div className="col-lg-8">
                                <input
                                    type="text"
                                    value={updatedName}
                                    className="inputData form-control"
                                    required
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-lg-3 control-label">Category Subject</label>
                            <div className="col-lg-8">
                                <select
                                    className="inputData form-control"
                                    required
                                    onChange={(e) => {
                                        setUpdateCategory(e.target.value);
                                    }}
                                >
                                    <option value="-1">Choose Category Subject</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-lg-3 control-label">Description</label>
                            <div className="col-lg-8">
                                <textarea
                                    required
                                    type="text"
                                    className="inputData form-control"
                                    onChange={(e) => setUpdatedDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-lg-3 control-label">Subject status</label>
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
                                    Add 
                                </button>

                                <button className="btn sliderBtn btn-back">
                                    <Link to={"/Subjects"}>Back to Subject list</Link>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddSubject;