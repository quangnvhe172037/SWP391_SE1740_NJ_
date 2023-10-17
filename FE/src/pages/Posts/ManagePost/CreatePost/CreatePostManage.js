import { useState } from "react";
import PostManage from "../../../../components/Post/PostMange/PostMange";
import jwtDecode from "jwt-decode";
import PrivateContent from "../../../../components/HandleException/PrivateContent";
const CreatePostManage = () => {
  const [updatedImage, setUpdatedImage] = useState(
    "/img/posts/duongdananh.jpg"
  );
  const [valueArticle, setValueArticle] = useState("");
  const [postCates, setPostCates] = useState([]);
  const [postCate, setPostCate] = useState("1");
  const [title, setUpdatedTitle] = useState("");
  const [brief, setUpdatedBrief] = useState("");
  let isFormComplete = false;
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);

  if (user.role !== "MARKETING") {
    return <PrivateContent />;
  } else {
    return (
      <PostManage
        valueArticle={valueArticle}
        postCates={postCates}
        postCate={postCate}
        title={title}
        brief={brief}
        updatedImage={updatedImage}
        isFormComplete={isFormComplete}
        setValueArticle={setValueArticle}
        setPostCates={setPostCates}
        setUpdatedBrief={setUpdatedBrief}
        setPostCate={setPostCate}
        setUpdatedTitle={setUpdatedTitle}
        setUpdatedImage={setUpdatedImage}
      />
    );
  }
};
export default CreatePostManage;
