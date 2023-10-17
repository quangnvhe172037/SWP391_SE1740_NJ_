import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8080/posts';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [randomPosts, setRandomPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');

    useEffect(() => {
        axios.get(API_URL + '/randomPost') // Lấy danh sách bài viết ngẫu nhiên
            .then((response) => {
                setRandomPosts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching random posts:', error);
            });

        axios.get(API_URL + '/cate') // Lấy danh sách danh mục
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
        axios.get(API_URL) // Lấy danh sách các bài viết
            .then((response) => {
                const data = response.data.map((item) => ({
                    postID: item.postID,
                    title: item.title,
                    image: item.image,
                    postCategory: {
                        id: item.postCategory.id,
                        name: item.postCategory.name,
                    },
                    dateCreate: item.dateCreate,
                    briefInfor: item.briefInfor,
                    user: {
                        firstName: item.user.firstName,
                        lastName: item.user.lastName,
                    },
                }));
                setPosts(data);
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    // Function to filter posts based on search term and selected category
    const filteredPosts = posts.filter((post) => {
        const titleMatch = post.title.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedCategoryId === '') {
            return titleMatch;
        } else {
            const categoryMatch = post.postCategory.id === parseInt(selectedCategoryId);
            return titleMatch && categoryMatch;
        }
    });



    return (
        <section className="section posts-entry posts-entry-sm bg-light">
            <div className="containers">
                <h1 className="posts-entry-title">Tiêu Đề Của Phần</h1>
                <div className="row">
                    <div className="col-md-9">
                        <div className="row">
                            {filteredPosts.map((post) => (
                                <div key={post.id} className="col-md-4">
                                    <div className="blog-entry">
                                        <Link to={`/posts/view/${post.postID}`} className="img-link">
                                            <img src={post.image} alt={post.title} className="img-fluid" />
                                            <h2 className="post-title">{post.title}</h2>

                                        </Link>
                                        {typeof post.postCategory.id === 'string' ? (
                                            <h2>{post.postCategory.id}</h2>
                                        ) : (
                                            <p>Invalid ID</p>
                                        )}
                                        <p>{post.briefInfor}}</p>
                                        <span className="date">
                                            {format(new Date(post.dateCreate), 'dd-MM-yyyy')}
                                        </span>
                                        <p>Author: {post.user.lastName + ' ' + post.user.firstName}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="category">
                            <h4>Danh mục</h4>
                            {/* Ô tìm kiếm */}
                            <div className="search-box">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div>
                                <select
                                value={selectedCategoryId}
                                onChange={(e) => setSelectedCategoryId(e.target.value)}
                            >
                                <option value="">Tất cả danh mục</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            </div>
                            <h4>Bài viết</h4>
                            {/* Danh sách bài viết ngẫu nhiên */}
                            <ul className="list-group">
                                {randomPosts.map((postR) => (
                                    <li key={postR.postID} className="list-group-item">
                                        <div className="row">
                                            <Link to={`/posts/view/${postR.postID}`}>
                                                <div className="col-md-4">
                                                    <img
                                                        src={postR.image}
                                                        alt={postR.title}
                                                        className="img-large"
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <h6 className="">{postR.title}</h6>
                                                </div>
                                            </Link>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PostList;
