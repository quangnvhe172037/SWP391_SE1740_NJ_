import React, { Component } from 'react';
import Sidebar from "./Sidebar";
import { format } from 'date-fns';
import './style.css'
import axios from 'axios';

const API_URL = "http://localhost:8080/posts";
class PostList extends Component {

    constructor() {
        super();
        this.state = {
            posts: [],
        };
    }

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
                                            <a href="single.html" className="img-link">
                                                <img src={post.image} alt="Image" className="img-fluid" />
                                            </a>
                                            <span className="date">
                        {format(new Date(post.dateCreate), 'dd-MM-yyyy')}
                      </span>
                                            <h2 className='post-title'><a href="single.html">{post.title}</a></h2>
                                            <p>{post.briefInfor}</p>
                                            <p><a href="#" className="read-more">Continue Reading</a></p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Sidebar/>
                    </div>
                </div>
            </section>
        );
    }
}

export default PostList;
