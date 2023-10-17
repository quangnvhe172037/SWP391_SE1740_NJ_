const LessonVideo = (prop) => {
    const lessonVideo = prop.lessonVideo;
  console.log("test in lessonvideo" + lessonVideo);
  return (
    <div className="lesson-content-data col-md-12">
      <iframe
        width="100%" // Chiều rộng của video
        height="100%" // Chiều cao của video
        src={`https://www.youtube.com/embed/${lessonVideo}`}
        title="YouTube Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default LessonVideo;
