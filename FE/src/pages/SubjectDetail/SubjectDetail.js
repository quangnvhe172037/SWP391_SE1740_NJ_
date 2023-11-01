import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import SubjectLesson from "../../components/SubjectDetail/SubjectLesson/SubjectLesson";
import { useParams } from "react-router-dom";
import SubjectInfo from "../../components/SubjectDetail/SubjectInfo/SubjectInfo";
import SubjectSidebar from "../../components/SubjectDetail/SubjectSidebar/SubjectSidebar";
import SubjectDecription from "../../components/SubjectDetail/SubjectDescription/SubjectDecription";
import './SubjectDetail.css'
import PrivateContent from "../../components/HandleException/PrivateContent";

const SubjectDetail = () => {
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const { subjectId } = useParams();
  const [topics, setTopics] = useState([]);
  const [lessons, setLessons] = useState([]);
  const api = "http://localhost:8080/user/subject/get";
  const [subject, setSubject] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  try {
    useEffect(() => {
      fetch(`${api}?subjectId=${subjectId}&userId=${user.userId} `, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            if (response.statusCode === 403) {
            }
          } else {
            return response.json();
          }
        })

        .then((dataJson) => {
          console.log(dataJson);
          const data = {
            subjectId: dataJson.subjectId,
            subjectName: dataJson.subjectName,
            description: dataJson.description,
            image: dataJson.img,
            createDate: dataJson.createDate,
            preId: dataJson.preId,
            price: dataJson.price,
            billId: dataJson.billId,
            status: dataJson.status,
            purchaseDate: dataJson.purchaseDate,
          };
          return data;
        })

        .then((result) => {
          console.log(result);
          setSubject(result);
        })
        .catch((error) => {
          console.error("There was a problem with the request");
        });
    }, [subjectId]);
  } catch (error) {
    console.error("There was a problem with the request");
  }
  

  useEffect(() => {
    fetch(`http://localhost:8080/subjecttopic/get/${subjectId}`, {
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
        const data = dataJson.map((item) => ({
          topicID: item.topicID,
          topicName: item.topicName,
          isOpen: false,
        }));
        return data;
      })

      .then((result) => {
        const mockData = result;
        console.log(mockData);
        setTopics(mockData);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/lesson/get/${subjectId}`, {
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
        const data = dataJson.map((item) => ({
          topicID: item.topic.topicID,
          topicName: item.topic.topicName,
          lessonId: item.lessonID,
          lessonName: item.lessonName,
        }));

        return data;
      })

      .then((result) => {
        const mockData = result;
        console.log(mockData);
        setLessons(mockData);
      });
  }, []);

  if (
    user.role !== "CUSTOMER"
  ) {
    return <PrivateContent />;
  } else {
    return (
      <div className="row subject-detail-page-wrap">
        <div className="col-md-9">
          <SubjectInfo
            subjectName={subject.subjectName}
            description={subject.description}
            createDate={subject.createDate}
          />
          <SubjectLesson
            setLessons={setLessons}
            lessons={lessons}
            topics={topics}
            setTopics={setTopics}
          />
          <SubjectDecription description={subject.description} />
        </div>
        <div className="col-md-3">
          <SubjectSidebar
            image={subject.image}
            preId={subject.preId}
            price={subject.price}
            billId={subject.billId}
            purchaseDate={subject.purchaseDate}
            lessonId={
              lessons && lessons.length > 0
                ? lessons[0].lessonId
                : null
            }
          />
        </div>
      </div>
    );
  };
}

export default SubjectDetail;
