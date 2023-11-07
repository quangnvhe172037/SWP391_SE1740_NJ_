
import './SubjectInfo.css'
import "react-quill/dist/quill.bubble.css";
import ReactQuill, { Quill } from "react-quill";
import BASE_URL from '../../../api/baseapi';
const SubjectInfo = (prop) => {
    const subjectName = prop.subjectName;
    const createDate = prop.createDate;
    return (
      <div className="subject-detail-info">
        <div>
          <h1 className="subject-detail-header">{subjectName}</h1>
        </div>

        
        <div>Created at {createDate}</div>
      </div>
    );
};

export default SubjectInfo;
