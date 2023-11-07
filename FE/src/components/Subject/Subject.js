import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BASE_URL from "../../api/baseapi";

const Subject = () => {
  const [sliders, setSliders] = useState([]);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("1");
  const [courseTemp, setCourseTemp] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  // Xử lí api
  const apiSlider = `${BASE_URL}/sliders`;

  const apiSubjects = `${BASE_URL}/subjects/all`;

  const apiCategory = `${BASE_URL}/categorysubject/all`;

  useEffect(() => {
    fetch(apiSlider)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((dataJson) => {
        const data = dataJson.map((item) => ({
          sliderID: item.sliderID,
          title: item.title,
          image: item.image,
          subjectID: item.subjectID,
          subjectName: item.subject.subjectName,
          subjectStatus: item.subject.status,
          status: item.status,
          note: item.note,
        }));
        return data;
      })
      .then((result) => {
        const data = result;
        setSliders(data);
      });
  }, []);

  useEffect(() => {
    fetch(apiCategory)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((dataJson) => {
        const data = dataJson.map((item) => ({
          id: item.cateID,
          name: item.cateName,
        }));
        return data;
      })

      .then((result) => {
        const data = result;
        setCategories(data);
      });
  }, []);

  useEffect(() => {
    fetch(apiSubjects)
      .then((response) => {
        if (!response.ok) {
          console.log(response);
        }
        return response.json();
      })

      .then((dataJson) => {
        const data = dataJson.map((item) => ({
          subjectID: item.subjectID,
          subjectName: item.subjectName,
          image: item.image,
          status: item.status,
          description: item.description,
          categoryID: item.subjectCategory.cateID,
        }));
        return data;
      })

      .then((result) => {
        const data = result;
        setCourses(data);
        setTotalPage(
          data.length % 3 == 0
            ? data.length / 3
            : Math.floor(data.length / 3) + 1
        );
        setCourseTemp(data);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  const handlePageClick = (e) => {
    const page = +e.selected + 1;
    setPageNum(page);
  };
  const handleSubmit = (e) => {
    const list = [];
    for (var i = 0; i < courseTemp.length; i++) {
      if (courseTemp[i].categoryID === Number(category)) {
        if (
          search.trim().length === 0 ||
          (search.trim().length != 0 &&
            courseTemp[i].subjectName
              .trim()
              .toLowerCase()
              .includes(search.trim().toLowerCase()))
        ) {
          list.push(courseTemp[i]);
        }
      }
    }
    setTotalPage(
      list.length % 3 == 0 ? list.length / 3 : Math.floor(list.length / 3) + 1
    );
    setCourses(list);
    e.preventDefault();
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="h-8 w-8 rounded-full shadow-lg flex justify-center items-center absolute top-1/2 translate-y-[-50%] left-[-14px] cursor-pointer z-10 bg-white"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div
        className="h-8 w-8 rounded-full shadow-lg flex justify-center items-center absolute top-1/2 translate-y-[-50%] right-[-14px] cursor-pointer z-10 bg-white"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <SampleNextArrow />,
    nextArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <section className="tuyn-slick mb-14">
        <Slider {...settings}>
          {sliders.map((item, index) => (
            <div key={index}>
              <div
                className="flex justify-between h-[270px] items-center rounded-xl "
                style={{ backgroundImage: `linear-gradient(to right)` }}
              >
                <div className="hidden md:block w-full">
                  <img
                    className="rounded-xl w-full"
                    style={{ height: "800px" }}
                    src={item.image}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </section>
      <section className="md:px-4 lg:px-9">
        <section>
          <form onSubmit={handleSubmit} className="pb-12 flex items-center">
            <div className="grow flex border border-purple-200 rounded">
              <input
                onChange={handleSearch}
                type="text"
                className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Search..."
              />
              <select
                onChange={handleChange}
                className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              >
                {categories.map((data, index) => (
                  <option value={data.id}>{data.name}</option>
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
          <div className="grid grid-flow-col auto-cols-[60%] snap-x overflow-y-auto md:grid-flow-row md:grid-cols-3 lg:grid-cols-4 gap-6 pb-5">
            {courses
              .slice(
                (pageNum - 1) * 3,
                Math.min(pageNum * 3, courses.length) + 1
              )
              .map((data, index) => (
                <div className="snap-center snap-always">
                  <div className="relative">
                    <div className="absolute bottom-3 flex justify-between items-center w-full px-3">
                      <div className=" w-9 h-9  flex justify-center items-center rounded-xl bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <img
                      className="rounded-xl"
                      style={{ height: "200px" }}
                      src={data.image}
                      alt=""
                    />
                  </div>
                  <h2 className="font-semibold py-2 text-sm truncate text-center">
                    <Link to={`/subject/${data.subjectID}`}>
                      {data.subjectName}
                    </Link>
                  </h2>
                </div>
              ))}
          </div>
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
        </section>
      </section>
    </>
  );
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SampleNextArrow />,
        nextArrow: <SamplePrevArrow />
    };
    return (
        <>
            <section className='tuyn-slick mb-14'>
                <Slider {...settings}>
                    {sliders.map((item, index) => (
                        <div key={index}>
                            <div
                                className='flex justify-between h-[270px] items-center rounded-xl '
                                style={{ backgroundImage: `linear-gradient(to right)` }}
                            >
                                <div className='hidden md:block w-full'>
                                    <img className='rounded-xl w-full' style={{ height: '800px' }} src={item.image} alt='' />
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </section>
            <section className='md:px-4 lg:px-9'>
                <section>
                    <form onSubmit={handleSubmit} className="pb-12 flex items-center">
                        <div className="grow flex border border-purple-200 rounded">
                            <input onChange={handleSearch}
                                type="text"
                                className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                placeholder="Search..."
                            />
                            <select onChange={handleChange} className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" >
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
                    <div className='grid grid-flow-col auto-cols-[60%] snap-x overflow-y-auto md:grid-flow-row md:grid-cols-3 lg:grid-cols-4 gap-6 pb-5'>
                        {courses.slice((pageNum - 1) * 3, Math.min(pageNum * 3, courses.length) + 1).map((data, index) => (
                            <div className='snap-center snap-always'>
                                <div className='relative'>
                                    <div className='absolute bottom-3 flex justify-between items-center w-full px-3'>
                                        <div className=' w-9 h-9  flex justify-center items-center rounded-xl bg-white'>
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                className='h-4 w-4'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke='currentColor'
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <img className='rounded-xl' style={{ height: '200px' }} src={data.image} alt='' />
                                </div>
                                <h2 className='font-semibold py-2 text-sm truncate text-center'>
                                    <Link to={`/subject/${data.subjectID}`}>{data.subjectName}</Link>
                                </h2>
                            </div>
                        ))}
                    </div>
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
                </section>
            </section>
        </>
    );
};

export default Subject;
