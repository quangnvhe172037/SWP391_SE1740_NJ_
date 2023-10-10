
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
           lessonId: dataJson.lessonId,
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
   }, [lessonId]);
console.log(typeof (lesson.lessonId));
console.log(typeof lessonId);
  let lessonData;
  console.log(lesson.lessonType);
  console.log("lesson video link" + lesson.lessonVideoLink);
   switch (lesson.lessonType) {
     case "1":
      //  lessonData = <LessonVideo lessonVideo={lesson.videoLink} />;
       break;
     case 2:
       lessonData = <LessonVideo lessonVideo={lesson.lessonVideoLink} />;
       break;
     case 3:
       lessonData = <LessonPost lessonPost={lesson.lessonContent} />;
       break;
     default:
       break;
   }

  return (
      <div className="lesson-content col-md-9">
          {lessonData}
    </div>
  );
};

export default LessonContent;
