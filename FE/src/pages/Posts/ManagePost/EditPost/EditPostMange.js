
import jwtDecode from "jwt-decode";
import PostEditComponent from "../../../../components/Post/PostMange/PostEdit";
import PrivateContent from "../../../../components/HandleException/PrivateContent";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../../../../api/baseapi";
const EditPostMange = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
   const { postId } = useParams();
  const api = `${BASE_URL}/posts/view/${postId}`;
  const [userId, setUserId] = useState("");
useEffect(() => {
  fetch(api, {
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
      setUserId(dataJson.user.id);
    })

    .catch((error) => {
      console.error("Error fetching slider data:", error);
    });
}, [postId]);
  if (user.role !== "MARKETING" || userId != user.userId) {
    return <PrivateContent />;
  } else {
    return <PostEditComponent />;
  }
};
export default EditPostMange;
