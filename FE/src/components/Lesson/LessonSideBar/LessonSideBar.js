import React, { useState, useEffect } from "react";
import "./LessonSideBar.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import jwtDecode from "jwt-decode";
  import BASE_URL from "../../../api/baseapi";
const LessonSidebar = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const token = localStorage.getItem("token");
  const { subjectId, lessonId } = useParams();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`${BASE_URL}/subjecttopic/get/${subjectId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((dataJson) => {
        const data = dataJson.map((item) => ({
          topicID: item.topicID,
          topicName: item.topicName,
          isOpen: false,
        }));
        return data;
      })

      .then((result) => {
        const mockData = result;
        console.log(mockData);
        setTopics(mockData);
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/lesson/get/${subjectId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((dataJson) => {
        const data = dataJson.map((item) => ({
          topicID: item.topic.topicID,
          topicName: item.topic.topicName,
          lessonId: item.lessonID,
          lessonName: item.lessonName,
        }));

        return data;
      })

      .then((result) => {
        const mockData = result;
        console.log(mockData);
        setLessons(mockData);
      });
  }, []);

  useEffect(() => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) => ({
        ...topic,
        isOpen: lessons.some(
          (lesson) =>
            lesson.lessonId == lessonId && lesson.topicID == topic.topicID
        ),
      }))
    );
  }, [lessons, lessonId]);


  useEffect(() => {
    // Mô phỏng thời gian load dữ liệu (có thể thay bằng fetch thực tế)
    setTimeout(() => {
      setLoading(false); // Tắt hiệu ứng load sau khi dữ liệu đã được tải
    }, 2000); // Thời gian mô phỏng là 2 giây (có thể thay đổi)

    // ... Các phần còn lại của mã của bạn
  }, [lessonId]);


  const toggleTopic = (topicId) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.topicID === topicId ? { ...topic, isOpen: !topic.isOpen } : topic
      )
    );
  };

  const nagigateToLesson = (lessonid) => {
    console.log("navigate");
    navigate(`/subject/${subjectId}/lesson/${lessonid}`);
  }

    return (
      <div className="lesson-sidebar col-md-3">
        <div className="lesson-sidebar-name">
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ marginRight: '90px' }}>Subject content</span>
            <Link to="/practice" state={subjectId}>
              <button className="btn btn-dark">My Practice</button>
            </Link>
          </div>
        </div>

        {topics.map((topic) => (
          <div key={topic.topicID} className="lesson-sidebar-topic">
            <div
              className="lesson-topic-content "
              onClick={() => toggleTopic(topic.topicID)}
            >
              <span className="lesson-topic-name lesson-sidebar-left">
                {topic.topicName}
              </span>
              {topic.isOpen ? (
                <div className="lesson-sidebar-right">
                  <i className="fa-solid fa-angle-up"></i>
                </div>
              ) : (
                <div className="lesson-sidebar-right">
                  <i className="fa-solid fa-angle-down"></i>
                </div>
              )}
            </div>

            {topic.isOpen && (
              <div className="lesson-list-content">
                <ul className="lesson-list">
                  {lessons
                    .filter((lesson) => lesson.topicID === topic.topicID)
                    .map((lesson) => (
                      <li
                      
                        key={lesson.lessonId}
                        className={`lesson-content-detail ${lesson.lessonId == lessonId ? "active-lesson" : ""
                          }`
                        }
                        onClick={() => nagigateToLesson(lesson.lessonId)}
                      >
                        <Link
                          to={`/subject/${subjectId}/lesson/${lesson.lessonId}`}
                        >
                          {lesson.lessonName}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

export default LessonSidebar;
