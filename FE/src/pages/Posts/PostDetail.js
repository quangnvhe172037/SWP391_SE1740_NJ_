// Tệp PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const API_URL = "http://localhost:8080/posts";
const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        // Truy vấn dữ liệu của bài viết từ API sử dụng postId
        axios.get(`${API_URL}/view/${postId}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching post data: ', error);
            });
    }, [postId]);

    return (
        <div>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <p>{post.postData}</p>
            {/* Hiển thị các thông tin khác của bài viết */}
        </div>
    );
};
export default PostDetail;