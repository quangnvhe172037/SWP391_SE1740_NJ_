import React, { Component } from 'react';
import { format } from 'date-fns';
import './style.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8080/posts';

class PostList extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            randomPosts: [],
            categories: [],
            searchTerm: '',
            selectedCategoryId: '', // Thêm trường này để lưu trữ giá trị danh mục được chọn
        };
    }

    componentDidMount() {
        axios.get(API_URL) // Lấy danh sách các bài viết
            .then((response) => {
                this.setState({ posts: response.data });
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });

        axios.get(API_URL + '/randomPost') // Lấy danh sách bài viết ngẫu nhiên
            .then((response) => {
                this.setState({ randomPosts: response.data });
            })
            .catch((error) => {
                console.error('Error fetching random posts:', error);
            });

        axios.get(API_URL + '/cate') // Lấy danh sách danh mục
            .then((response) => {
                this.setState({ categories: response.data });
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }

    // Hàm xử lý khi thay đổi danh mục được chọn
    // handleCategoryChange = (event) => {
    //     this.setState({ selectedCategoryId: event.target.value });
    // };

    // Hàm xử lý khi thay đổi nội dung tìm kiếm
    handleSearchChange = (event) => {
        this.setState({ searchTerm: event.target.value });
    };

    render() {
        const { posts } = this.state;

        // Lọc danh sách bài viết dựa trên danh mục và nội dung tìm kiếm
        const filteredPosts = posts.filter((post) => {
            console.log(this.state.selectedCategoryId);
    console.log(post.postCategory.id);
            const titleMatch = post.title.toLowerCase().includes(this.state.searchTerm.toLowerCase());
            const categoryMatch = this.state.selectedCategoryId === '' || post.postCategory.id === this.state.selectedCategoryId;
            return titleMatch && categoryMatch;
        });
        console.log(posts);
        return (
            <section className="section posts-entry posts-entry-sm bg-light">
                <div className="container">
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
                                            <p>{post.briefInfor}</p>
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
                                        value={this.state.searchTerm}
                                        onChange={this.handleSearchChange}
                                    />
                                </div>
                                {/*<h4>Thể loại</h4>*/}
                                {/*<select onChange={this.handleCategoryChange}>*/}
                                {/*    <option value="">Tất cả danh mục</option>*/}
                                {/*    {this.state.categories.map((category) => (*/}
                                {/*        <option key={category.id} value={category.id}>*/}
                                {/*            {category.name}*/}
                                {/*        </option>*/}
                                {/*    ))}*/}
                                {/*</select>*/}

                                <h4>Bài viết</h4>
                                {/* Danh sách bài viết ngẫu nhiên */}
                                <ul className="list-group">
                                    {this.state.randomPosts.map((postR) => (
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
}

export default PostList;
