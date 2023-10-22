import React, { useState, useEffect } from "react";
import "./SubjectLessson.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
const LessonSidebar = () => {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const token = localStorage.getItem("token");
  const { subjectId} = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/subjecttopic/get/${subjectId}`, {
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
    fetch(`http://localhost:8080/lesson/get/${subjectId}`, {
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
    // Mô phỏng thời gian load dữ liệu (có thể thay bằng fetch thực tế)
    setTimeout(() => {
      setLoading(false); // Tắt hiệu ứng load sau khi dữ liệu đã được tải
    }, 2000); // Thời gian mô phỏng là 2 giây (có thể thay đổi)

    // ... Các phần còn lại của mã của bạn
  }, [subjectId]);

  const toggleTopic = (topicId) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.topicID === topicId ? { ...topic, isOpen: !topic.isOpen } : topic
      )
    );
  };



  return (
    <div className="subject-detail-lesson col-md-3">
      <div className="subject-detail-lesson-name">
        <span>Subject content </span>
        <span>Total topic: {topics.length}</span>
        <span>Total lesson: {lessons.length}</span>
      </div>
      {topics.map((topic) => (
        <div key={topic.topicID} className="subject-detail-subject-detail-topic">
          <div
            className="subject-detail-topic-content "
            onClick={() => toggleTopic(topic.topicID)}
          >
            <span className="subject-detail-topic-name subject-detail-lesson-left">
              {topic.topicName}
            </span>
            {topic.isOpen ? (
              <div className="subject-detail-lesson-right">
                <i className="fa-solid fa-angle-up"></i>
              </div>
            ) : (
              <div className="subject-detail-lesson-right">
                <i className="fa-solid fa-angle-down"></i>
              </div>
            )}
          </div>

          {topic.isOpen && (
            <div className="subject-detail-subject-detail-subject-detail-subject-detail-lesson-list-content">
              <ul className="subject-detail-subject-detail-subject-detail-subject-detail-lesson-list">
                {lessons
                  .filter((lesson) => lesson.topicID === topic.topicID)
                  .map((lesson) => (
                    <li
                      key={lesson.lessonId}
                      className={`subject-detail-lesson-content-detail `}
                     
                    >
                      
                        {lesson.lessonName}
                      
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
