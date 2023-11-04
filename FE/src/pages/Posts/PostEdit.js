import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from "../../api/baseapi";
const API_URL = `${BASE_URL}/posts`;

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
