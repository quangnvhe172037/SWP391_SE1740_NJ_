import ReactPaginate from "react-paginate";
import DayJs from "../Home/DayJs";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Col, Row } from "react-bootstrap";
const SubjectData = () => {
    const style = {
        margin: 'auto',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
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
    const apiSubjects = "http://localhost:8080/subjects/all";
    const apiCategorySubjects = "http://localhost:8080/categorysubject/all";
    useEffect(() => {
        fetch(apiSubjects).then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }).then((dataJson) => {
            const data = dataJson.map((item) => ({
                subjectID: item.subjectID,
                subjectName: item.subjectName,
                subjectCategory: item.subjectCategory,
                status: item.status,
                description: item.description,
                create_date: item.create_date,
                image: item.image
            }));
            return data;
        })

            .then((result) => {
                const data = result;
                setSubjects(data);
                setPaginationSubjects(data);
            })
    }, [])
    useEffect(() => {
        fetch(apiCategorySubjects).then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }).then((dataJson) => {
            const data = dataJson.map((item) => ({
                id: item.id,
                name: item.cateName
            }));
            return data;
        })

            .then((result) => {
                const data = result;
                setCategories(data);
            })
    }, [])

    // const handleSearch = (e) => {
    //     const value = e.target.value;
    //     setSearch(value);
    // }
    const handleChange = (e) => {
        const value = e.target.value;
        setCategory(value);
    }
    const handlePageClick = (e) => {
        const page = +e.selected + 1;
        setPageNum(page);
    }
    const handleSubmit = (e) => {
        let list = [...subjects];
        if (Number(category) != 0) {
            list = subjects.filter(n => n.subjectCategory.cateID == Number(category));
        }
        if (search.length > 0) {
            list = subjects.filter(n => n.subjectName.trim().toLowerCase().includes(search.trim().toLowerCase()))
        }
        setTotalPage(list.length % 3 == 0 ? (list.length / 3) : (Math.floor(list.length / 3) + 1));
        setPaginationSubjects(list);
        e.preventDefault();
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="pb-12 flex items-center">
                <div className="grow flex border border-purple-200 rounded">
                    <input onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                        type="text"
                        value={search}
                        className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                    />
                    <select onChange={handleChange} className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" >
                        <option value={0}>All</option>
                        {
                            categories.map((data, index) => (
                                <option key={index} value={data.id}>{data.name}</option>
                            ))
                        }
                    </select>
                    <button type="submit" className="px-4 text-white bg-purple-600 border-l rounded ">
                        Search
                    </button>
                </div>

            </form>
            <div>
                <button className="add-btn modify-btn btn ">
                    <Link to={`/addSubject`}>Add new subject</Link>
                </button>
            </div>
            <table className="table table-striped" border={'4px'}>
                <thead>
                    <tr>
                        <td scope="col" className="slider-table-header">ID</td>
                        <td scope="col" className="slider-table-header">Image</td>
                        <td scope="col" className="slider-table-header">Name</td>
                        <td scope="col" className="slider-table-header">CategoryName</td>
                        <td scope="col" className="slider-table-header">Status</td>
                        <td scope="col" className="slider-table-header">Created Date</td>
                        <td scope="col" className="slider-table-header">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {paginationsubjects.slice((pageNum - 1) * 3, Math.min(pageNum * 3, paginationsubjects.length) + 1).map((item, index) => (
                        <tr scope="row">
                            <td className="slider-table-data">{item.subjectID}</td>
                            <td className="slider-table-data"><img src={item.image} /></td>
                            <td className="slider-table-data">{item.subjectName}</td>
                            <td className="slider-table-data">{item.subjectCategory.cateName}</td>
                            <td className="slider-table-data">{item.status ? 'active' : 'deactive'}</td>
                            <td className="slider-table-data">{DayJs.from(item.create_date)}</td>
                            <td className="slider-table-data">
                                <Button onClick={handleOpen}>Detail</Button>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style} >
                                        <div style={{textAlign: "center"}}>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{marginLeft:'24%'}}>
                                                <img src={item.image} />
                                            </Typography>
                                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                                {item.subjectCategory.cateName}
                                            </Typography>
                                            <Typography id="modal-modal-title" variant="h2" component="h2">
                                                {item.subjectName}
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                {item.description}
                                            </Typography>
                                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                {item.status ? 'active' : 'deactive'}
                                            </Typography>

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
}

export default SubjectData;
