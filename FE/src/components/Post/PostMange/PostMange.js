
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.css";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import CreatePostHeader from "../PostComponent/CreatePostHeader";

const PostManage = ({
  valueArticle,
  postCates,
  postCate,
  title,
  brief,
  updatedImage,
  isFormComplete,
  setValueArticle,
  setPostCates,
  setUpdatedBrief,
  setPostCate,
  setUpdatedTitle,
  setUpdatedImage,
}) => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
 const baseURL = "http://localhost:8081/";
  const navigate = useNavigate();
  console.log(baseURL + updatedImage);
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
        if (response.statusCode === 401) {
        }

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
    checkFormCompletion();
    if (!isFormComplete) {
      alert("Enter all fields before submit");
      return;
    }
    //Tạo một đối tượng mới chứa thông tin đã cập nhật

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
          throw new Error(response.data.status);
        }
        return response.json();
      })

      .then((data) => {
        alert("Succesfully");
        navigate("/marketing/post/manage");
      })
      .catch((error) => {
        console.error("Error updating slider data:", error);
      });
  };
  const checkFormCompletion = () => {
    // Kiểm tra xem tất cả các trường đã được nhập đầy đủ hay chưa

    if (
      title !== "" &&
      postCate !== "" &&
      valueArticle !== "" &&
      brief !== "" &&
      updatedImage !== "/img/posts/duongdananh.jpg"
    ) {
      isFormComplete = true;
    } else {
      isFormComplete = false;
    }
  };

  return (
    <div className="create-post-container">
      <div className="row">
        <div className="create-post-header-title col-md-9">
          <CreatePostHeader title={title} setUpdatedTitle={setUpdatedTitle} />
        </div>

        <div className="col-md-3 create-post-button-wrap">
          <button onClick={handleSaveDataClick} className="create-post-button">
            Save Draft
          </button>
        </div>
      </div>

      <div className="row">
        <div className="create-post-left col-md-9">
          <ReactQuill
            theme="snow"
            className="creat-post-quill"
            style={{ minHeight: "70px" }}
            value={valueArticle}
            onChange={setValueArticle}
            required
          />
        </div>

        <div className="create-post-right col-md-3">
          <div className="create-post-image">
            {updatedImage === "/img/posts/duongdananh.jpg" ? (
              <img
                src={baseURL + updatedImage}
                alt="Choose some img for slider"
                className="create-post-image-preview"
                max-width="30%"
                max-height="30%"
              />
            ) : (
              <img
                src={updatedImage.preview}
                alt="Choose some img for slider"
                className="create-post-image-preview"
                max-width="30%"
                max-height="30%"
              />
            )}

            <h6 className="upload-notify">Upload an image</h6>

            <input
              required
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="inputImage"
            />
          </div>

          <div className="create-post-brief">
            <div className="create-post-sub-info">
              Write the short descrtion
            </div>
            <textarea
              type="text"
              placeholder="Brief"
              value={brief}
              contenteditable="true"
              className="create-post-brief-description"
              onChange={(e) => setUpdatedBrief(e.target.value)}
              required
            />
          </div>

          <div className="create-post-cate">
            <div className="create-post-sub-info">Post Category:</div>
            <select
              className="create-post-cate-data"
              required
              onChange={(e) => setPostCate(e.target.value)}
            >
              {postCates.map((option, index) => (
                <option
                  key={index}
                  value={option.postCateId}
                  required
                  selected={option.postCateId === postCate ? true : false}
                >
                  {option.postCateName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostManage;
