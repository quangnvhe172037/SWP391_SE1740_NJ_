import { useEffect, useState } from "react";
import LessonContent from "../../components/Lesson/LessonContent/LessonContent";
import LessonSideBar from "../../components/Lesson/LessonSideBar/LessonSideBar";

const Lesson = () => {
  return (
    <div className="row">
      <LessonContent />

      <LessonSideBar />
    </div>
  );
};
export default Lesson;
