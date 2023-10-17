import { useEffect, useState } from "react";
import LessonContent from "../../components/Lesson/LessonContent/LessonContent";
import LessonSideBar from "../../components/Lesson/LessonSideBar/LessonSideBar";
import { useParams } from "react-router-dom";

const Lesson = () => {
  return (
    <div className="row">
      <LessonContent
      />

      <LessonSideBar />
    </div>
  );
};
export default Lesson;
