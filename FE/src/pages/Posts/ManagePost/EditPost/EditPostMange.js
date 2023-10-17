
import jwtDecode from "jwt-decode";
import PostEditComponent from "../../../../components/Post/PostMange/PostEdit";
import PrivateContent from "../../../../components/HandleException/PrivateContent";
const EditPostMange = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  if (user.role !== "MARKETING") {
    return <PrivateContent />;
  } else {
    return <PostEditComponent />;
  }
};
export default EditPostMange;
