import { useParams } from "react-router-dom";
import "./SubjectDecription.css";
import "react-quill/dist/quill.bubble.css";
import ReactQuill, { Quill } from "react-quill";
import BASE_URL from "../../../api/baseapi";
const SubjectDecription = (prop) => {
  const description = prop.description;
  return (
    <div className="subject-detail-info-description">
      <div className="subject-detail-info-description-header">
        <h2 className="subject-detail-info-description-title">Subject Information</h2>
      </div>
      <ReactQuill value={description} readOnly={true} theme={"bubble"} />
    </div>
  );
};

export default SubjectDecription;
