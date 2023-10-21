import ReactPaginate from "react-paginate";
import DayJs from "../Home/DayJs";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Routes, Route, Link } from 'react-router-dom';
const SubjectData = () => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("0");
    const [subjects, setSubjects] = useState([]);
    const [paginationsubjects, setPaginationSubjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pageNum,setPageNum] = useState(1);
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

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
    }
    const handleChange = (e) => {
        const value = e.target.value;
        setCategory(value);
    }
    const handlePageClick = (e) => {
        const page = +e.selected + 1;
        setPageNum(page);
    }
    const handleSubmit = (e) => {
        const list = [];
        list = subjects;
        if(Number(category) != 0){
            list = subjects.filter(n => n.subjectCategory.cateID == Number(category));
        }
        if(search.length > 0){
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
                    <input onChange={handleSearch}
                        type="text"
                        className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                    />
                    <select onChange={handleChange} className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" >
                        <option value={0}>All</option>
                        {
                            categories.map((data, index) => (
                                <option value={data.id}>{data.name}</option>
                            ))
                        }
                    </select>
                    <button type="submit" className="px-4 text-white bg-purple-600 border-l rounded ">
                        Search
                    </button>
                </div>

            </form>
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Image</td>
                        <td>Name</td>
                        <td>CategoryName</td>
                        <td>Status</td>
                        <td>Created Date</td>
                    </tr>
                </thead>
                <tbody>
                    {paginationsubjects.slice((pageNum - 1) * 3,Math.min(pageNum * 3,courses.length) + 1).map((item, index) => (
                        <tr>
                            <td>{item.subjectID}</td>
                            <td><img src={item.image} /></td>
                            <td>{item.subjectName}</td>
                            <td>{item.subjectCategory.cateName}</td>
                            <td>{item.status ? 'active' : 'deactive'}</td>
                            <td>{DayJs.from(item.create_date)}</td>
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