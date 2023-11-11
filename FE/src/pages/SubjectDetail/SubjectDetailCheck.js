import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import SubjectDetail from "./SubjectDetaiAuthen/SubjectDetail";
import SubjectDetailPublic from "./SubjectDetailInAuthen/SubjectDetailPublic";
const SubjectDetailCheck = () => {
    const token = localStorage.getItem("token");
    if (token == null) {
        return <SubjectDetailPublic/>
    } else {
        const user = jwtDecode(token);
    }
  
    return <SubjectDetail />;
};

export default SubjectDetailCheck;
