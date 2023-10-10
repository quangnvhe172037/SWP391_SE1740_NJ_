import React, { useState, useEffect } from "react";
import "./LessonSideBar.css";
import { Link, useParams } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";

const LessonSidebar = () => {
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const token = localStorage.getItem("token");
  const { subjectId, lessonId } = useParams();
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
          lessonName: item.lessonName
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
   }, [lessonId]);

  //   const [topics, setTopics] = useState([
  //     {
  //       id: 1,
  //       title: "Topic 1",
  //       lessons: ["Lesson 1.1", "Lesson 1.2", "Lesson 1.3"],
  //       isOpen: true,
  //     },
  //     {
  //       id: 2,
  //       title: "Topic 2",
  //       lessons: ["Lesson 2.1", "Lesson 2.2", "Lesson 2.3"],
  //       isOpen: false,
  //     },
  //     {
  //       id: 3,
  //       title: "Topic 3",
  //       lessons: ["Lesson 2.1", "Lesson 2.2", "Lesson 2.3"],
  //       isOpen: false,
  //     },
  //     {
  //       id: 4,
  //       title: "Topic 4",
  //       lessons: ["Lesson 2.1", "Lesson 2.2", "Lesson 2.3"],
  //       isOpen: false,
  //     },
  //   ]);

  // const groupedData = lessons.reduce((result, item) => {
  //   // Check if the topicID already exists in the result
  //   if (!result[item.topicID]) {
  //     // If not, create an array for that topicID
  //     result[item.topicID] = {
  //       topicID: item.topicID,
  //       topicName: item.topicName,
  //       lessons: [], // Initialize an array for lessons
  //     };
  //   }

  //   // Push the lesson data into the corresponding topic's lessons array
  //   result[item.topicID].lessons.push({
  //     lessonId: item.lessonId,
  //     lessonName: item.lessonName,
  //     isOpen: item.isOpen,
  //   });

  //   return result;
  // }, {});
  // const groupedArray = Object.values(groupedData);

  const toggleTopic = (topicId) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.topicID === topicId ? { ...topic, isOpen: !topic.isOpen } : topic
      )
    );
  };

  return (
    <div className="lesson-sidebar col-md-3">
      
      <div className="lesson-sidebar-name">
        <span>Subject content</span>
      </div>
      {topics.map((topic) => (
        <div key={topic.topicID} className="lesson-sidebar-topic">
          <div
            className="lesson-topic-content"
            onClick={() => toggleTopic(topic.topicID)}
          >
            <span className="lesson-topic-name">{topic.topicName}</span>
            {topic.isOpen ? (
              <div>
                <i className="fa-solid fa-angle-up"></i>
              </div>
            ) : (
              <div>
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
                    <li key={lesson.lessonId} className="lesson-content-detail">
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
