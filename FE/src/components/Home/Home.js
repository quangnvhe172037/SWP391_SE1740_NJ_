import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Routes,Route, Link } from 'react-router-dom';
import DayJs from "./DayJs";
import Subject from "../Subject/Subject";

const Home = () => {
    const [sliders, setSliders] = useState([]);
    const [courses, setCourses] = useState([]);
    const [posts, setPosts] = useState([]);

    // Xử lí api
    const apiSlider = "http://localhost:8080/sliders";

    const apiSubjects = "http://localhost:8080/subjects/all";

    const apiPosts = "http://localhost:8080/posts";

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
        fetch(apiSubjects)
            .then((response) => {
                if (!response.ok) {
                    console.log(response)
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
                }));
                return data;
            })

            .then((result) => {
                const data = result;
                setCourses(data);
            });
    }, []);

    useEffect(() => {
        fetch(apiPosts)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })

            .then((dataJson) => {
                const data = dataJson.map((item) => ({
                    postID: item.postID,
                    postData: item.postData,
                    postCategory: item.postCategory.name,
                    owner: item.user.firstName + '' + item.user.lastName,
                    image: item.image,
                    updateDate: item.updateDate,
                    briefInfor: item.briefInfor,
                    title: item.title
                }));
                return data;
            })

            .then((result) => {
                const data = result;
                console.log(data);
                setPosts(data);
            });
    }, []);

    function SampleNextArrow(props) {
        const { onClick } = props;
        return (
            <div
                className='h-8 w-8 rounded-full shadow-lg flex justify-center items-center absolute top-1/2 translate-y-[-50%] left-[-14px] cursor-pointer z-10 bg-white'
                onClick={onClick}
            >
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                        fillRule='evenodd'
                        d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                        clipRule='evenodd'
                    />
                </svg>
            </div>
        );
    }

    function SamplePrevArrow(props) {
        const { onClick } = props;
        return (
            <div
                className='h-8 w-8 rounded-full shadow-lg flex justify-center items-center absolute top-1/2 translate-y-[-50%] right-[-14px] cursor-pointer z-10 bg-white'
                onClick={onClick}
            >
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                        fillRule='evenodd'
                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
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
        nextArrow: <SamplePrevArrow />
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
            <div className="flex justify-between pb-5">
              <h1 className="text-xl font-extrabold">Khóa học nổi bật</h1>
              <Link to={"/subject"} className=" text-orange-600 font-bold">
                Xem tất cả
              </Link>
            </div>
            <div className="grid grid-flow-col auto-cols-[60%] snap-x overflow-y-auto md:grid-flow-row md:grid-cols-3 lg:grid-cols-4 gap-6 pb-5">
              {courses.map((data, index) => (
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
                    <Link to={`/subject/${data.subjectID}`}>{data.subjectName}</Link>
                  </h2>
                </div>
              ))}
            </div>
          </section>
        </section>
        <section className="md:px-4 lg:px-9">
          <section>
            <div className="flex justify-between pb-5">
              <h1 className="text-xl font-extrabold">Bài viết nổi bật</h1>
              <Link to={"/posts"} className=" text-orange-600 font-bold">
                Xem tất cả
              </Link>
            </div>
            <div className="grid grid-flow-col auto-cols-[60%] snap-x overflow-y-auto md:grid-flow-row md:grid-cols-3 lg:grid-cols-4 gap-6 pb-5">
              {posts.map((data, index) => (
                <div className="rounded-xl border-2 p-4 mb-4">
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium capitalize">
                        {data.owner}
                      </h3>
                    </div>
                    <div className="flex gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 cursor-pointer"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </div>
                  </div>
                  <Link to={`#`}>
                    <div className="flex justify-between gap-4 items-center flex-wrap sm:flex-nowrap">
                      <div className="order-2 sm:order-1">
                        <h2 className="text-xl font-bold mb-3">
                          <Link to={`/posts/view/${data.postID}`}>{data.title}</Link>
                        </h2>
                        <p className="text-sm text-slate-600 mb-3">
                          {data.briefInfor}
                        </p>
                        <span className="text-sm mr-3">
                          {DayJs.from(data.updateDate)}
                        </span>
                      </div>

                      <div className="order-1 sm:order-2 w-full sm:w-52 flex-shrink-0">
                        <img
                          className="object-cover rounded-xl w-full aspect-video"
                          src={data.image}
                          alt=""
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </section>
      </>
    );
};

export default Home;