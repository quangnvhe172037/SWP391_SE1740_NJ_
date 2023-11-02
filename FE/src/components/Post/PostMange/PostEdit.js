import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CreatePost.css";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../api/baseapi";
import CreatePostHeader from "../PostComponent/CreatePostHeader";
import FE_URL from "../../../api/frontendapi";

const PostEditComponent = () => {
  const { postId } = useParams();
  const [updatedImage, setUpdatedImage] = useState("");
  const [valueArticle, setValueArticle] = useState("");
  const [postCates, setPostCates] = useState([]);
  const [postCate, setPostCate] = useState("1");
  const [title, setUpdatedTitle] = useState("");
  const [brief, setUpdatedBrief] = useState("");
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  let isFormComplete = true;
  const api = `${BASE_URL}/posts/view/${postId}`;
  const baseURL = FE_URL;
  const navigate = useNavigate();
  console.log(updatedImage);
  const defaultImage = baseURL.concat(updatedImage);
  console.log(defaultImage);
  const [imageData, setImageData] = useState("");
  console.log(defaultImage);
  console.log(imageData);

  useEffect(() => {
    fetch(api, {
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
        console.log(1);
        setPostCate(dataJson.postCategory.id);
        setUpdatedImage(dataJson.image);
        setValueArticle(dataJson.postData);
        setUpdatedTitle(dataJson.title);
        setUpdatedBrief(dataJson.briefInfor);
        setImageData(baseURL.concat(dataJson.image));
      })

      .catch((error) => {
        console.error("Error fetching slider data:", error);
      });
  }, [postId]);

  const handleImageChange = (e) => {
    const newImage = e.target.files[0];
    if (newImage) {
      setUpdatedImage(newImage); // Lưu trữ đối tượng hình ảnh mới
      const reader = new FileReader();
      reader.onload = () => {
        setImageData(reader.result); // Cập nhật đường dẫn tạm thời cho hình ảnh
      };
      reader.readAsDataURL(newImage);
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}/posts/cate`, {
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
    console.log(updatedImage instanceof File);
    if (updatedImage instanceof File) {
      formData.append("image", updatedImage);
    } else {
      const emptyFile = new File([""], "empty.jpg", { type: "image/jpeg" });
      formData.append("image", emptyFile);
    }
    console.log(updatedImage);
    console.log(imageData);
    formData.append("brief", brief);
    formData.append("email", user.sub);

    // Gửi yêu cầu PUT để cập nhật dữ liệu
    fetch(`${BASE_URL}/marketing/post/edit/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          console.log(postId);
          throw new Error(response.data.status);
        }
        return response.json();
      })

      .then((data) => {
        alert("Succesfully");
        navigate("/marketing/post/manage");
      })
      .catch((error) => {
        console.log(error.message);
        console.error("Error updating slider data:", error);
      });
  };

  const checkFormCompletion = () => {
    // Kiểm tra xem tất cả các trường đã được nhập đầy đủ hay chưa

    if (
      title !== "" &&
      postCate !== "" &&
      valueArticle !== "" &&
      brief !== ""
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
            Save
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
            <img
              src={imageData}
              alt="Choose some img for slider"
              className="create-post-image-preview"
              max-width="30%"
              max-height="30%"
            />

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

export default PostEditComponent;
