const LessonPost = (prop) => {
  const post = prop.lessonPost;
  return <div className="lesson-content col-md-9">
        {post}
  </div>;
};

export default LessonPost;
