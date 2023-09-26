import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:8080/posts";

const PostEdit = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Truy vấn thông tin bài viết từ API sử dụng postId
        axios.get(`${API_URL}/view/${postId}`)//fake URL cho đỡ phải gọi nhiều
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching post data: ', error);
            });
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Post</h1>
            <p>Title: {post.title}</p>
            <p>Content: {post.briefinfor}</p>
            {/* Hiển thị thông tin bài viết để chỉnh sửa */}
        </div>
    );
};

export default PostEdit;
