import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import "./PostListManage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import PrivateContent from "../../../../components/HandleException/PrivateContent";
import BASE_URL from "../../../../api/baseapi";
import FE_URL from "../../../../api/frontendapi";

const PostListManage = () => {
  const [postList, updatedPostList] = useState([]);
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const baseUrl = FE_URL;
  // const [filteredPost, setFilteredPost] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [statusFilter, setStatusFilter] = useState("all");

  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 5;
  const pagesVisited = pageNumber * postsPerPage;

  

  useEffect(() => {
    fetch(`${BASE_URL}/marketing/post/manage/${user.userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.statusCode === 401) {
        }

        if (!response.ok) {
          console.log(response.message);
        }
        return response.json();
      })

      .then((dataJson) => {
        const data = dataJson.map((item) => ({
          postId: item.postId,
          postCateId: item.postCategoryId,
          postCateName: item.postCateName,
          image: item.image,
          title: item.title,
          status: item.status,
          updateDate: item.updateDate,
          brief: item.brief,
        }));
        return data;
      })

      .then((result) => {
        const mockData = result;
        updatedPostList(mockData);
        // setFilteredPost(mockData);
      })
      .catch((err) => {});
  }, []);

  const handleAction = (postId, action) => {

    // Tìm post theo postId
    console.log(action);
    const updatedPost = postList.map((post) => {
      console.log(post.postId === postId);
      if (post.postId === postId) {
        // Cập nhật giá trị status thành 0 khi nhấp vào "Hidden"
        post.status = action === "hide" ? 0 : post.status;
        console.log("check status how" + post.status);
      }

      if (post.postId === postId) {
        // Cập nhật giá trị status thành 0 khi nhấp vào "Hidden"
        post.status = action === "show" ? 1 : post.status;
        console.log("check status hide" + post.status);
      }

      return post;
    });
    console.log(updatedPost);

    // Cập nhật state với post đã được cập nhật
    updatedPostList(updatedPost);


    // Gửi yêu cầu cập nhật đến máy chủ ở đây
    // Đảm bảo bạn đã cài đặt endpoint phù hợp trên máy chủ để xử lý cập nhật

    // Ví dụ sử dụng fetch để gửi yêu cầu PUT
    const updateStatus = action === "show" ? 1 : 0;
    console.log(updateStatus);

    fetch(`${BASE_URL}/marketing/post/update/status/${parseInt(postId)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: updateStatus }),
    })
      .then((response) => {
        if (!response.ok) {
        }
        return response.json();
      })
      .then((data) => {
        displayPosts();
        alert("Update successfully");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, bạn có thể khôi phục giá trị status
        updatedPostList(postList);
      });
  };

  // Delete
  const handleDelete = (postId) => {
    // Gửi yêu cầu DELETE để xóa post dựa trên postId
    fetch(`${BASE_URL}/marketing/post/delete/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
        }
        // Nếu xóa thành công, cập nhật lại danh sách posts
        const updatedPost = postList.filter((post) => post.postId !== postId);
        updatedPostList(updatedPost);
        displayPosts();
        alert("Delete successfully");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  let displayPosts = () =>
    postList.slice(pagesVisited, pagesVisited + postsPerPage).map((post) => (
      // Hiển thị thông tin bài viết ở đây
      <li className="manage-post-list-element ">
        <div className="row">
          <div className="post-list-element-image col-sm-2">
            <img src={post.image} alt="Image of the picture" />
          </div>

          <div className="col-sm-8 post-list-element-content">
            <h2 className="post-list-title">{post.title}</h2>
            <div className="post-list-info">
              <span>{post.postCateName}</span>
              <span>{post.updateDate}</span>
            </div>
            <div className="post-list-blog">
              <span>{post.brief}</span>
            </div>
          </div>

          <div className="col-sm-2 row post-list-action-list">
            {post.status == 1 ? (
              <div
                title="hide"
                className="col-sm-4 btn-action post-list-action-btn"
                onClick={() => handleAction(post.postId, "hide")}
              >
                <i className="fa-solid fa-eye-slash"></i>
              </div>
            ) : (
              <div
                title="publish"
                className="col-sm-4 btn-action post-list-action-btn"
                onClick={() => handleAction(post.postId, "show")}
              >
                <i className="fa-solid fa-eye"></i>
              </div>
            )}

            <div
              className="col-md-4 post-list-action-btn"
              onClick={() => handleDelete(post.postId)}
            >
              <i className="fa-solid fa-trash"></i>
            </div>

            <div className="col-md-4 post-list-action-btn">
              <Link
                to={`/marketing/post/edit/${post.postId}`}
                onClick={(e) => {
                  window.scrollTo(0, 0);
                }}
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </Link>
            </div>
          </div>
        </div>
      </li>
    ));

  const pageCount = Math.ceil(postList.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  //  useEffect(() => {
  //    const filtered = postList.filter((post) => {
  //      const titleMatch = post.postCateName
  //        .toLowerCase()
  //        .includes(searchTerm.toLowerCase());

  //      const subjectNameMatch = post.title
  //        .toLowerCase()
  //        .includes(searchTerm.toLowerCase());

  //      const statusMatch =
  //        statusFilter == "all" || post.status == statusFilter;
  //      return (titleMatch || subjectNameMatch) && statusMatch;
  //    });
  //    setFilteredPost(filtered);
  //  }, [postList, searchTerm, statusFilter]);

  

  if (user.role !== "MARKETING") {
    return <PrivateContent />;
  } else {
    return (
      <div className="manage-post-list-container">
        <div className="manage-post-list-header row">
          <h1 className="manage-post-header col-md-10">My post</h1>
          <div className="col-md-2">
            <button type="button" className="manage-post-btn">
              <Link
                to="/marketing/post/create"
                className="manange-post-list-link"
              >
                Add new
              </Link>
            </button>
          </div>
        </div>
        {/* 
      <div className="manage-post-filter">
        <input
          className="input-filter"
          type="text"
          placeholder="Search by title or subject name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select-filter"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="1">Visible</option>
          <option value="0">Hidden</option>
        </select>
      </div> */}

        <div className="manage-post-list-content">
          <ul className="manage-post-list">{displayPosts()}</ul>
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={changePage}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    );
  };
}
export default PostListManage;
