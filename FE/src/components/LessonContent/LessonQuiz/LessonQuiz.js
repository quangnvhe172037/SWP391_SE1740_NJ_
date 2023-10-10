import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LessonQuiz = () => {
    const [lesson, setLesson] = useState({});
    const token = localStorage.getItem("token");
    const { lessonId } = useParams();
    useEffect(() => {
      fetch(`http://localhost:8080/lesson/get/data/${lessonId}`, {
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
          const data = {
            lessonId: dataJson.lessonId,
            lessonName: dataJson.lessonName,
            lessonType: dataJson.lessonType.lessonTypeID,
            lessonVideoLink: dataJson.videoLink,
            lessonContent: dataJson.lessonContent,
          };

          return data;
        })

        .then((result) => {
          const mockData = result;
          setLesson(mockData);
        });
    }, []);
    return <div className="lesson-content col-md-9">
      
  </div>;
};

export default LessonQuiz;
