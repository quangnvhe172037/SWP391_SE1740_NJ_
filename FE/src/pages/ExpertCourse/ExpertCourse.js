import ReactPaginate from "react-paginate";
import DayJs from "../../components/Home/DayJs";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import jwtDecode from "jwt-decode";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Col, Row } from "react-bootstrap";
import BASE_URL from "../../api/baseapi";
const ExpertCourse = () => {
  const style = {
    margin: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("0");
  const [subjects, setSubjects] = useState([]);
  const [paginationsubjects, setPaginationSubjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageNum, setPageNum] = useState(1);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
  const apiSubjects = `${BASE_URL}/subjects`;
    const apiCategorySubjects = `${BASE_URL}/categorysubject/all`;
    

  useEffect(() => {
    fetch(apiSubjects)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataJson) => {
        const data = dataJson.map((item) => ({
          subjectID: item.subjectID,
          subjectName: item.subjectName,
          subjectCategory: item.subjectCategory,
          status: item.status,
          description: item.description,
          create_date: item.create_date,
          image: item.image,
        }));
        return data;
      })
      .then((result) => {
        const data = result;
        setSubjects(data);
        setPaginationSubjects(data);
        setTotalPage(
          data.length % 3 == 0
            ? data.length / 3
            : Math.floor(data.length / 3) + 1
        );
      });
  }, []);
  useEffect(() => {
    fetch(apiCategorySubjects)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataJson) => {
        const data = dataJson.map((item) => ({
          id: item.id,
          name: item.cateName,
        }));
        return data;
      })
      .then((result) => {
        const data = result;
        setCategories(data);
      });
  }, []);
  // const handleSearch = (e) => {
  //     const value = e.target.value;
  //     setSearch(value);
  // }
  const handleChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };
  const handlePageClick = (e) => {
    const page = +e.selected + 1;
    setPageNum(page);
  };
  const handleSubmit = (e) => {
    let list = [...subjects];
    if (Number(category) != 0) {
      list = subjects.filter(
        (n) => n.subjectCategory.cateID == Number(category)
      );
    }
    if (search.length > 0) {
      list = subjects.filter((n) =>
        n.subjectName.trim().toLowerCase().includes(search.trim().toLowerCase())
      );
    }
    setTotalPage(
      list.length % 3 == 0 ? list.length / 3 : Math.floor(list.length / 3) + 1
    );
    setPaginationSubjects(list);
    e.preventDefault();
  };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      selectedFile.preview = URL.createObjectURL(selectedFile); // Tạo đường dẫn tạm thời cho ảnh
      console.log(selectedFile);
      setUpdatedImage(selectedFile); // Cập nhật đường dẫn ảnh trong state
    }
  };
  const handleSaveDataClick = (e) => {
    let id = document.getElementById("subjectID").value;
    e.preventDefault();
    // Tạo một đối tượng mới chứa thông tin đã cập nhật
    const formData = new FormData();
    const temp = {
      subjectName: updatedName,
      subjectCategory: categories.find((n) => n.id == Number(updateCategory)),
      status: updatedStatus,
      description: updatedDescription,
    };
    formData.append("file", updatedImage);
    formData.append("subject", JSON.stringify(temp));
    formData.append("id", id);
    // Gửi yêu cầu PUT để cập nhật dữ liệu
    fetch(`${BASE_URL}/subjects/update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.data.status);
        }
        return response.json();
      })
      .then((data) => {
        navigate("/expert/subjects");
      })
      .catch((error) => {
        console.error("Error updating slider data:", error);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="pb-12 flex items-center">
        <div className="grow flex border border-purple-200 rounded">
          <input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            value={search}
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Search..."
          />
          <select
            onChange={handleChange}
            className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          >
            <option value={0}>All</option>
            {categories.map((data, index) => (
              <option key={index} value={data.id}>
                {data.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4 text-white bg-purple-600 border-l rounded "
          >
            Search
          </button>
        </div>
      </form>
      <div>
        <button className="add-btn modify-btn btn ">
          <Link to={`/add/subject`}>Add new subject</Link>
        </button>
      </div>
      <table className="table table-striped" border={"4px"}>
        <thead>
          <tr>
            <td scope="col" className="slider-table-header">
              ID
            </td>
            <td scope="col" className="slider-table-header">
              Image
            </td>
            <td scope="col" className="slider-table-header">
              Name
            </td>
            <td scope="col" className="slider-table-header">
              CategoryName
            </td>
            <td scope="col" className="slider-table-header">
              Status
            </td>
            <td scope="col" className="slider-table-header">
              Created Date
            </td>
            <td scope="col" className="slider-table-header">
              Action
            </td>
          </tr>
        </thead>
        <tbody>
          {paginationsubjects
            .slice(
              (pageNum - 1) * 3,
              Math.min(pageNum * 3, paginationsubjects.length)
            )
            .map((item, index) => (
              <tr scope="row">
                <td className="slider-table-data">{item.subjectID}</td>
                <td className="slider-table-data">
                  <img
                    src={`${item.image}`}
                    style={{ height: "80px", width: "80px" }}
                  />
                </td>
                <td className="slider-table-data">{item.subjectName}</td>
                <td className="slider-table-data">
                  {item.subjectCategory.cateName}
                </td>
                <td className="slider-table-data">
                  {item.status ? "active" : "deactive"}
                </td>
                <td className="slider-table-data">
                  {DayJs.from(item.create_date)}
                </td>
                <td className="slider-table-data">
                  <Button onClick={handleOpen}>Detail</Button>
                  <Button onClick={handleOpen}>
                    <Link to={`/add-question/${item.subjectID}`}>
                      Add Question
                    </Link>
                  </Button>
                  <Button onClick={handleOpen}>
                    <Link to={`/expert/subject/${item.subjectID}/manage`}>
                      Manage
                    </Link>
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <div className="col-md-3">
                        <div className="text-center">
                          <img
                            src={
                              updatedImage.preview
                                ? updatedImage.preview
                                : item.image
                            }
                            alt="Choose some img for slider"
                            className="sliderImage"
                          />
                          <h6 className="upload-notify">Upload a photo</h6>
                          <input
                            required
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="inputImage"
                          />
                        </div>
                      </div>
                      <div className="col-md-9 personal-info">
                        <form className="form-horizontal" role="form">
                          <input
                            type="hidden"
                            id="subjectID"
                            value={item.subjectID}
                          />
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Subject Name
                            </label>
                            <div className="col-lg-8">
                              <input
                                type="text"
                                value={item.subjectName}
                                className="inputData form-control"
                                required
                                onChange={(e) => setUpdatedName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Category Subject
                            </label>
                            <div className="col-lg-8">
                              <select
                                className="inputData form-control"
                                required
                                onChange={(e) => {
                                  setUpdateCategory(e.target.value);
                                }}
                              >
                                <option value="-1">
                                  Choose Category Subject
                                </option>
                                {categories.map((category) => (
                                  <option
                                    key={category.id}
                                    value={category.id}
                                    selected={
                                      item.subjectCategory.id === category.id
                                        ? true
                                        : false
                                    }
                                  >
                                    {category.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Description
                            </label>
                            <div className="col-lg-8">
                              <textarea
                                required
                                type="text"
                                className="inputData form-control"
                                onChange={(e) =>
                                  setUpdatedDescription(e.target.value)
                                }
                              >
                                {item.description}
                              </textarea>
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-lg-3 control-label">
                              Subject status
                            </label>
                            <div className="col-lg-8">
                              <div className="ui-select">
                                <select
                                  required
                                  className="inputData form-control"
                                  value={item.status}
                                  onChange={(e) =>
                                    setUpdatedStatus(e.target.value)
                                  }
                                >
                                  <option value="true" selected={item.status}>
                                    Active
                                  </option>
                                  <option value="false" selected={!item.status}>
                                    Inactive
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="form-group">
                            <label class="col-md-3 control-label"></label>
                            <div class="col-md-8">
                              <button
                                className="sliderBtn btn btn-dark"
                                onClick={handleSaveDataClick}
                              >
                                Edit
                              </button>

                              <button
                                className="btn sliderBtn btn-back"
                                onClick={handleClose}
                              >
                                Back to Subject list
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Box>
                  </Modal>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="pb-12">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPage}
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
    </>
  );
};
export default ExpertCourse;
