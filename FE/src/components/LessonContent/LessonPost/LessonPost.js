import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import './LessonPost.css'

const LessonPost = (prop) => {
  const post = prop.lessonPost;
  console.log("check lesson data" + post);
  return (
    <div className="lesson-content-data">
      <ReactQuill value={post } readOnly={true} theme={"bubble"} />
    </div>
  );
};

export default LessonPost;
