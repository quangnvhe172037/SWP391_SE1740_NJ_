import React, { Component } from 'react';
import Sidebar from "./Sidebar";
import { format } from 'date-fns';
import './style.css'
import axios from 'axios';
import {Link} from "react-router-dom";

const API_URL = "http://localhost:8080/posts";
class PostList extends Component {

    constructor() {
        super();
        this.state = {
            posts: [],
        };
    }
    handleCategorySelect = (selectedCategoryId) => {
        // Gửi yêu cầu lấy danh sách bài post tương ứng với selectedCategoryId lên server
        console.log(selectedCategoryId);
        axios.get(API_URL + '/selectCate/{selectedCategoryId}')

            .then((response) => {
                this.setState({ posts: response.data });
            })
            .catch((error) => {
                console.error('Error fetching posts by category:', error);
            });
    };

    componentDidMount() {
        axios.get(API_URL)
            .then((response) => {
                this.setState({ posts: response.data });
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
    }

    render() {
        const { posts } = this.state;

        return (
            <section className="section posts-entry posts-entry-sm bg-light">
                <div className="container">
                    <h1 className="posts-entry-title">Tiêu Đề Của Phần</h1>
                    <div className="row">
                        <div className="col-md-9">
                            <div className="row">
                                {posts.map((post) => (
                                    <div key={post.id} className="col-md-4">
                                        <div className="blog-entry">
                                            <Link to={`/posts/${post.postID}`} className="img-link">
                                                <img src={post.image} alt={post.title} className="img-fluid" />
                                                <h2 className='post-title'>{post.title}</h2>
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
                        <Sidebar onSelectCategory={this.handleCategorySelect} />
                    </div>
                </div>
            </section>
        );
    }
}

export default PostList;
