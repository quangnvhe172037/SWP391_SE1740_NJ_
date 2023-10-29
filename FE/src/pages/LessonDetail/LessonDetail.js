import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LessonDetail.css";
import jwtDecode from "jwt-decode";
import PrivateContent from "../../components/HandleException/PrivateContent";
import AddNewTopic from "../../components/SubjectTopic/AddNewTopic/AddNewTopic";
import AddLessonArticle from "../../components/Lesson/AddLessonForm/AddLessonArticle/AddLessonArticle";
import EditSubjectTopic from "../../components/SubjectTopic/EditSubjectTopic/EditSubjectTopic";
import AddLessonQuiz from "../../components/Lesson/AddLessonForm/AddLessonQuiz/AddLessonQuiz";
import AddLessonVideo from "../../components/Lesson/AddLessonForm/AddLessonVideo/AddLessonVideo";
import EditLessonQuiz from "../../components/Lesson/EditLessonForm/EditLessonQuiz/EditLessonQuiz";
import EditLessonVideo from "../../components/Lesson/EditLessonForm/EditLessonVideo/EditLessonVideo";
import EditLessonArticle from "../../components/Lesson/EditLessonForm/EditLessonArticle/EditLessonArticle";


const LessonDetail = () => {
  const { subjectId } = useParams();

  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const [showAddLesson, setShowAddLesson] = useState(null);



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
          topicOrder: item.order,
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
          lessonType: item.lessonType.lessonTypeID,
        }));

        return data;
      })

      .then((result) => {
        const mockData = result;
        console.log(mockData);
        setLessons(mockData);
      });
  }, []);

  const handleUpdateOrderLesson = (updateLessonId, order) => { 
    fetch(
      `http://localhost:8080/api/expert/lesson/update/order/${updateLessonId}?order=${order}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          console.log(response.message);
        }
        return response.text();
      })
      .then((data) => {
        // Xử lý phản hồi từ máy chủ (nếu cần)
        console.log("Posts updated:", data);
        window.location.reload();
        alert("Delete successfully");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, bạn có thể khôi phục giá trị status
      });
  }

  const handleUpdateOrderTopic = (updateTopicId, order) => {
    fetch(
      `http://localhost:8080/api/expert/subject/update/order/${updateTopicId}?order=${order}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          console.log(response.message);
        }
        return response.text();
      })
      .then((data) => {
        // Xử lý phản hồi từ máy chủ (nếu cần)
        console.log("Posts updated:", data);
        window.location.reload();
        alert("Delete successfully");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, bạn có thể khôi phục giá trị status
      });
  };

const handleDeleteTopic = (topicDeleteId) => {
  fetch(`http://localhost:8080/api/expert/subject/delete/topic/${topicDeleteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        console.log(response.message);
      }
      return response.text();
    })
    .then((data) => {
      // Xử lý phản hồi từ máy chủ (nếu cần)
      console.log("Posts updated:", data);
      window.location.reload();
      alert("Delete successfully");
    })
    .catch((error) => {
      console.error("Error updating post:", error);
      // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, bạn có thể khôi phục giá trị status
    });
};



  const handleDeleteLesson = (lessonDeleteId) => {
    fetch(`http://localhost:8080/api/expert/lesson/delete/${lessonDeleteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          console.log(response.message);
        }
        return response.text();
      })
      .then((data) => {
        // Xử lý phản hồi từ máy chủ (nếu cần)
        console.log("Posts updated:", data);
        window.location.reload();
        alert("Delete successfully");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, bạn có thể khôi phục giá trị status
        
      });
  }

 

  if (user.role !== "EXPERT") {
    return <PrivateContent />;
  } else {
    return (
      <div className="col-md-12 lesson-detail-container">
        <div className="lesson-detail-header">
          <span>Curriculum</span>
          <AddNewTopic />
        </div>

        {topics.map((topic) => (
          <div key={topic.topicID} className="lesson-detail-section">
            <div className="lesson-detail-header-name">
              <span className="" style={{ width: "200px" }}>
                Topic
                <input
                  type="text"
                  readOnly
                  value={topic.topicOrder}
                  className="lesson-detail-content-order"
                />
                :
                <input
                  type="text"
                  readOnly
                  value={topic.topicName}
                  className=""
                />
              </span>
              <div onClick={() => handleDeleteTopic(topic.topicID)}>
                Delete topic
              </div>

              <EditSubjectTopic
                topicId={topic.topicID}
                topicName={topic.topicName}
                topicOrder={topic.topicOrder}
              />

              <button
                onClick={() =>
                  setShowAddLesson(
                    showAddLesson === topic.topicID ? null : topic.topicID
                  )
                }
              >
                Add New Lesson
              </button>
              {showAddLesson === topic.topicID && (
                <div className="add-lesson-options">
                  <AddLessonQuiz topic={topic.topicID} />
                  <AddLessonVideo topic={topic.topicID} />
                  <AddLessonArticle topic={topic.topicID} />
                </div>
              )}
            </div>

            <div className="">
              <ul className="lesson-section-content">
                {lessons
                  .filter((lesson) => lesson.topicID === topic.topicID)
                  .map((lesson) => (
                    <div>
                      <li
                        key={lesson.lessonId}
                        className="lesson-detail-content"
                      >
                        <span>Lecture</span>
                        <input
                          type="text"
                          readOnly
                          value={lesson.lessonOrder}
                          onChange={(e) =>
                            handleUpdateOrderLesson(
                              lesson.lessonId,
                              e.target.value
                            )
                          }
                          className="lesson-detail-content-order"
                        />
                        <input type="text" readOnly value={lesson.lessonName} />

                        <div className="lesson-sidebar-right">
                          {lesson.lessonType === 1 && (
                            <EditLessonQuiz lessonId={lesson.lessonId} />
                          )}
                          {lesson.lessonType === 2 && (
                            <EditLessonVideo lessonId={lesson.lessonId} />
                          )}
                          {lesson.lessonType === 3 && (
                            <EditLessonArticle lessonId={lesson.lessonId} />
                          )}
                          <div
                            onClick={() => handleDeleteLesson(lesson.lessonId)}
                          >
                            Delete
                          </div>

                          <i className="fa-solid fa-angle-down"></i>
                        </div>
                      </li>
                    </div>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default LessonDetail;
