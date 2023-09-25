// import React, { Component } from 'react';
// import axios from 'axios';
// import './style.css'
// import {Link} from "react-router-dom";
//
//
// const API_URL = "http://localhost:8080/posts";
// class Sidebar extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             categories: [], // Danh sách các danh mục sẽ được lấy từ Spring Boot
//             randomPosts: [],
//             searchValue: "",
//         };
//     }
//
//     componentDidMount() {
//
//         axios.get(API_URL + '/randomPost')
//             .then(response => {
//                 this.setState({ randomPosts: response.data }); // Cập nhật state với danh sách bài viết ngẫu nhiên từ API
//             })
//             .catch(error => {
//                 console.error('Error fetching random posts:', error);
//             });
//     }
//     render() {
//         return (
//             <div className="col-md-3">
//                 <div className="category">
//                     <h4>Danh mục</h4>
//                     {/* Ô tìm kiếm */}
//                     <div className="search-box">
//                         <input type="text" placeholder="Tìm kiếm..." />
//                         <button type="button">Tìm</button>
//                     </div>
//                     <h4>Thể loại</h4>
//                     <select className="form-control">
//                         <option value="">Chọn danh mục</option>
//                         {this.state.categories.map((category) => (
//                             <option key={category.id} value={category.id}>
//                                 {category.name}
//                             </option>
//                         ))}
//                     </select>
//
//                     <h4>Bài viết</h4>
//                     {/* Danh sách bài viết */}
//                     <ul className="list-group">
//                         {this.state.randomPosts.map((post) => (
//                             <li key={post.postID} className="list-group-item">
//                                 <div className="row">
//                                     <Link to={`/posts/${post.postID}`}>
//                                         <div className="col-md-4">
//                                             <img
//                                                 src={post.image} // Sử dụng đường dẫn hình ảnh từ dữ liệu bài viết
//                                                 alt={post.title}
//                                                 className="img-large"
//                                             />
//                                         </div>
//                                         <div className="col-md-8">
//                                             <h6 className="">{post.title}</h6>
//                                         </div>
//                                     </Link>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                     {/* Select danh mục */}
//                 </div>
//             </div>
//         );
//     }
// }
//
// export default Sidebar;
