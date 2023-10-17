import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LessonDetail.css";
import AddNewArticle from "../../components/Quiz/AddNewArticle/AddNewArticle";
import EditLessonQuiz from "../../components/Lesson/EditLessonForm/EditLessonQuiz/EditLessonQuiz";

const LessonDetail = () => {
  const { subjectId } = useParams();

  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const token = localStorage.getItem("token");

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
          topicOrder: item.order
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
          lessonOrder: item.order,
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

  return (
    <div className="col-md-12 lesson-detail-container">
      <div className="lesson-detail-header">
        <span>Curriculum</span>
      </div>
      {topics.map((topic) => (
        <div key={topic.topicID} className="lesson-detail-section">
          <div className="lesson-detail-header-name">
            <span className="">
              Lesson {topic.topicOrder}: {topic.topicName}
            </span>
          </div>

          <div className="">
            <ul className="lesson-section-content">
              {lessons
                .filter((lesson) => lesson.topicID === topic.topicID)
                .map((lesson) => (
                  <div>
                    <li key={lesson.lessonId} className="lesson-detail-content">
                      <span>Lecture</span>
                      <input
                        type="text"
                        readOnly
                        value={lesson.lessonOrder}
                        className="lesson-detail-content-order"
                      />
                      <input type="text" readOnly value={lesson.lessonName} />

                      <div className="lesson-sidebar-right">
                        <i className="fa-solid fa-angle-down"></i>
                      </div>
                    </li>
                    <EditLessonQuiz />
                  </div>
                ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonDetail;
