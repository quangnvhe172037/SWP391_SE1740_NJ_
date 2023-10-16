
import { useEffect } from "react";
import "./LessonContent.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import LessonVideo from "../../LessonContent/LessonVideo/LessonVideo";
import LessonQuiz from "../../LessonContent/LessonQuiz/LessonQuiz";
import LessonPost from "../../LessonContent/LessonPost/LessonPost";

const LessonContent = () => {
   const [lesson, setLesson] = useState({});
   const token = localStorage.getItem("token");
   const { lessonId } = useParams();
   useEffect (() => {
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
           lessonId: dataJson.lessonID,
           lessonName: dataJson.lessonName,
           lessonType: dataJson.lessonType.lessonTypeID,
           lessonOrder: dataJson.order,
           lessonVideoLink: dataJson.videoLink,
           lessonContent: dataJson.lessonContent,
         };
         return data;
       })

       .then((result) => {
         
         const mockData = result;
         setLesson(mockData);
         
       });
   }, [lessonId, token]);

  return (
    <div className="lesson-content col-md-9">
      {(() => {
        switch (lesson.lessonType) {
          case 1:
            console.log("check switch case " + lesson.lessonId);
            return <LessonQuiz lessonId={lesson.lessonId} />;
          case 2:
            return <LessonVideo lessonVideo={lesson.lessonVideoLink} />;
          case 3:
            return <LessonPost lessonPost={lesson.lessonContent} />;
          default:
            console.log("no data");
            return null;
        }
      })()}
    </div>
  );
};

export default LessonContent;
