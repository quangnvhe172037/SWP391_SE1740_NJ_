import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { format } from "date-fns";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const API_URL = "http://localhost:8080/";
const Local_URL = "http://localhost:8081/";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    // Truy vấn dữ liệu của bài viết từ API sử dụng postId
    // axios.get(${API_URL}posts/view/${postId})
    //     .then((response) => {
    //         setPost(response.data);
    //     })
    //     .catch((error) => {
    //         console.error('Error fetching post data: ', error);
    //     });
  }, [postId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="effect-lily tm-post-link tm-pt-40">
            <div className="tm-post-link-inner align-items-center">
              {post.image && (
                <img
                  src={`${Local_URL}${post.image}`}
                  alt={post.title}
                  className="img-fluid custom-image"
                />
              )}
            </div>
          </div>
          <div className="blog-entry-detail mt-4">
            {post.title && <h2 className="post-title">{post.title}</h2>}
            {post.dateCreate && (
              <div className="date">
                {format(new Date(post.dateCreate), "dd-MM-yyyy")}
              </div>
            )}
            <ReactQuill
              value={post.postData}
              readOnly={true}
              theme={"bubble"}
            />

            <p>
              Author:{" "}
              {post.user && post.user.lastName + " " + post.user.firstName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
