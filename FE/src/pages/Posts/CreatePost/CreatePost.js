import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.css";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import CreatePostHeader from "../../../components/Post/CreatePost/CreatePostHeader";
import { data } from "autoprefixer";

const CreatePost = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const [updatedImage, setUpdatedImage] = useState("");
  const [valueArticle, setValueArticle] = useState("");
  const [postCates, setPostCates] = useState([]);
  const [postCate, setPostCate] = useState("1");
  const [title, setUpdatedTitle] = useState("");
  const [brief, setUpdatedBrief] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);

  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      selectedFile.preview = URL.createObjectURL(selectedFile); // Tạo đường dẫn tạm thời cho ảnh
      console.log(selectedFile);
      setUpdatedImage(selectedFile); // Cập nhật đường dẫn ảnh trong state
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/posts/cate", {
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
        const data = dataJson.map((item) => ({
          postCateId: item.id,
          postCateName: item.name,
        }));
        return data;
      })

      .then((result) => {
        const mockData = result;
        setPostCates(mockData);
      });
  }, []);

  const handleSaveDataClick = (e) => {
    e.preventDefault();
    // Tạo một đối tượng mới chứa thông tin đã cập nhật

    const formData = new FormData();
    formData.append("title", title);
    formData.append("data", valueArticle);
    formData.append("cateid", postCate);
    formData.append("image", updatedImage);
    formData.append("brief", brief);
    formData.append("email", user.sub);

    // Gửi yêu cầu POST để cập nhật dữ liệu
    fetch(`http://localhost:8080/marketing/post/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          console.log("1");
          throw new Error(response.data.status);
        }
        console.log("2");
        return response.json();
      })

      .then((data) => {
        alert("Succesfully");
        navigate("/sliders");
      })
      .catch((error) => {
        console.error("Error updating slider data:", error);
      });
  };
  const checkFormCompletion = () => { 
    // Kiểm tra xem tất cả các trường đã được nhập đầy đủ hay chưa
    if (title== "" && data !== "" && postCate !== "" && valueArticle !== ""&& updatedImage !== ""&& brief !== "" ) {
      setIsFormComplete(true);

    } else {
      setIsFormComplete(false);
    }
  };

  return (
    <div className="create-post-container">
      <div className="row">
        <div className="col-md -9">
          <CreatePostHeader title={title} setUpdatedTitle={setUpdatedTitle} />
        </div>
        <div className="col-md-3">
          <button onClick={handleSaveDataClick} disabled={!isFormComplete} className="CreatePost-button">Save</button>
        </div>
      </div>

      <div className="row">
        <div className="create-post-left col-md-8">
          <ReactQuill
            theme="snow"
            className="creat-post-quill"
            style={{ minHeight: "70px" }}
            value={valueArticle}
            crollingContainer=".scroll-container"
            onChange={setValueArticle}
            required
          />
        </div>

        <div className="create-post-right col-md-4">
          <h2>Post Data</h2>
          <input
            type="text"
            placeholder="Brief"
            onChange={setUpdatedBrief}
            required
          />

          <select className="" onChange={(e) => setPostCate(e.target.value)}>
            {postCates.map((option, index) => (
              <option key={index} value={option.postCateId} required>
                {option.postCateName}
              </option>
            ))}
          </select>

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
    </div>
  );
};

export default CreatePost;
