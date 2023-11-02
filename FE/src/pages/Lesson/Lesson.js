import { useEffect, useState } from "react";
import LessonContent from "../../components/Lesson/LessonContent/LessonContent";
import LessonSideBar from "../../components/Lesson/LessonSideBar/LessonSideBar";
import jwtDecode from "jwt-decode";
import PrivateContent from "../../components/HandleException/PrivateContent";
import { useParams } from "react-router-dom";
import NotFoundException from "../../components/HandleException/Error-404/Error-404";
import BASE_URL from "../../api/baseapi";


const Lesson = () => {
    const { subjectId, lessonId } = useParams();
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const [lessons, setLessons] = useState([]);
  const [checkLesson, setCheckLesson] = useState(false);
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
         lessonId: item.lessonID,
       }));

       return data;
     })

     .then((result) => {
       const mockData = result;
       setLessons(mockData);
       setCheckLesson(mockData.some((item) => item.lessonId == lessonId));
     });
 }, [lessonId, subjectId]);
  
  if (
    user.role !== "CUSTOMER" 
    
  ) {
    return <PrivateContent />;
  }
    
  else if ((!checkLesson)) {
    return <NotFoundException/>
  
  } else {
    return (
      <div className="row">
        <LessonContent />

        <LessonSideBar />
      </div>
    );
  };
}
export default Lesson;
