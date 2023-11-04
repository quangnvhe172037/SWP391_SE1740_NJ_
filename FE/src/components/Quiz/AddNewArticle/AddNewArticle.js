import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './AddNewArticle.css'
import BASE_URL from "../../../api/baseapi";
const AddNewArticle = () => {
  const [valueArticle, setValueArticle] = useState("");

  console.log(valueArticle);
  return (
    <div className="lessonArticle-typing-area">
      <ReactQuill
        theme="snow"
        style={{minHeight: "70px"}}
        value={valueArticle}
        onChange={setValueArticle}
      />
      ;
    </div>
  );
};

export default AddNewArticle;
