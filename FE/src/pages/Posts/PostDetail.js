import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import {format} from "date-fns";

const API_URL = "http://localhost:8080/";
const Local_URL = "http://localhost:8081/";

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        // Truy vấn dữ liệu của bài viết từ API sử dụng postId
        axios.get(`${API_URL}posts/view/${postId}`)
            .then((response) => {
                setPost(response.data);
            })
            .catch((error) => {
                console.error('Error fetching post data: ', error);
            });
    }, [postId]);

    function formatTextToParagraphs(text) {
        if (text && text.trim() !== '') {
            const paragraphs = text.split('/n').filter((paragraph) => paragraph.trim() !== '');
            return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
        } else {
            return null; // Hoặc hiển thị thông báo khi không có dữ liệu.
        }
    }
console.log(post);
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <hr className="tm-hr-primary tm-mb-30" />
                    <div className="effect-lily tm-post-link tm-pt-40">
                        <div className="tm-post-link-inner d-flex justify-content-center align-items-center">
                            <img
                                src={`${Local_URL}${post.image}`}
                                alt={post.title}
                                className="img-fluid custom-image"
                            />
                        </div>
                    </div>
                    <div className="blog-entry mt-4">
                        <h2 className="post-title">{post.title}</h2>
                        <div className="date">{format(new Date(post.dateCreate), 'dd-MM-yyyy')}</div>
                        {formatTextToParagraphs(post.postData)}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
