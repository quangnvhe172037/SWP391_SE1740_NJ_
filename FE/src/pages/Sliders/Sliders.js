import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Slider.css";
import jwtDecode from "jwt-decode";
import PrivateContent from "../../components/HandleException/PrivateContent";
import BASE_URL from "../../api/baseapi";


const SliderList = () => {
  const [sliders, setSliders] = useState([]);
  const [filteredSliders, setFilteredSliders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const token = localStorage.getItem("token");
  const user = jwtDecode(token);
  const navigate = useNavigate();
  // Xử lí quyền truy cập
  // if (user.role !== "MARKETING") {
  //   navigate("/private");
  // }
  const isAuthenticated = user.role === "MARKETING";

  // Xử lí api
  const api = `${BASE_URL}/sliders/list`;

  try {
    useEffect(() => {
      fetch(api, {
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
          const data = dataJson.map((item) => ({
            sliderID: item.sliderID,
            title: item.title,
            image: item.image,
            subjectID: item.subject.subjectID,
            subjectName: item.subject.subjectName,
            subjectStatus: item.subject.status,
            status: item.status,
            note: item.note,
          }));
          return data;
        })

        .then((result) => {
          const mockData = result;
          setSliders(mockData);
          setFilteredSliders(mockData);
        })
        .catch((error) => {
          console.error("There was a problem with the request");
        });
    }, []);
  } catch (error) {
    console.error("There was a problem with the request");
  }

  const sliderData = {};

  // Filter sliders by search term and status
  useEffect(() => {
    const filtered = sliders.filter((slider) => {
      const titleMatch = slider.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const subjectNameMatch = slider.subjectName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const statusMatch =
        statusFilter == "all" || slider.status == statusFilter;
      return (titleMatch || subjectNameMatch) && statusMatch;
    });
    setFilteredSliders(filtered);
  }, [sliders, searchTerm, statusFilter]);

  // Handle slider actions (e.g., hide, show, edit)
  const handleAction = (sliderId, action) => {
    // Tìm slider theo sliderId
    const updatedSliders = sliders.map((slider) => {
      if (slider.sliderID === sliderId) {
        // Cập nhật giá trị status thành 0 khi nhấp vào "Hidden"
        slider.status = action === "hide" ? 0 : slider.status;
      }

      if (slider.sliderID === sliderId) {
        // Cập nhật giá trị status thành 0 khi nhấp vào "Hidden"
        slider.status = action === "show" ? 1 : slider.status;
      }

      return slider;
    });

    // Cập nhật state với slider đã được cập nhật
    setSliders(updatedSliders);

    // Gửi yêu cầu cập nhật đến máy chủ ở đây
    // Đảm bảo bạn đã cài đặt endpoint phù hợp trên máy chủ để xử lý cập nhật

    // Ví dụ sử dụng fetch để gửi yêu cầu PUT
    const updateStatus = action === "show" ? 1 : 0;
    

    fetch(`${BASE_URL}/sliders/${sliderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: updateStatus }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(console.error());
        }
        return response.json();
      })
      .then((data) => {
        // Xử lý phản hồi từ máy chủ (nếu cần)
        console.log("Slider updated:", data);
      })
      .catch((error) => {
        console.error("Error updating slider:", error);
        // Nếu có lỗi xảy ra trong quá trình gửi yêu cầu, bạn có thể khôi phục giá trị status
        setSliders(sliders);
      });
  };

  const handleDelete = (sliderId) => {
    // Gửi yêu cầu DELETE để xóa slider dựa trên sliderId
    fetch(`${BASE_URL}/sliders/delete/${sliderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        // Nếu xóa thành công, cập nhật lại danh sách sliders
        const updatedSliders = sliders.filter(
          (slider) => slider.sliderID !== sliderId
        );
        setSliders(updatedSliders);
      })
      .catch((error) => {
        console.error("Error deleting slider:", error);
      });
  };

  
  if (!isAuthenticated) {
    return <PrivateContent />;
  } else {
    return (
      <div className="slider-list-container">
        <div>
          <input
            className="input-filter"
            type="text"
            placeholder="Search by title or subject name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="select-filter"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="1">Visible</option>
            <option value="0">Hidden</option>
          </select>

          <div>
            <button className="add-btn modify-btn btn ">
              <Link to={`/sliders/add`}>Add new slider</Link>
            </button>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col" className="slider-table-header">
                ID
              </th>
              <th scope="col" className="slider-table-header">
                Title
              </th>
              <th scope="col" className="slider-table-header">
                Image
              </th>
              <th scope="col" className="slider-table-header">
                Subject Name
              </th>
              <th scope="col" className="slider-table-header">
                Status
              </th>
              <th scope="col" className="slider-table-header">
                Note
              </th>
              <th scope="col" className="slider-table-header">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSliders.map((slider) => (
              <tr key={slider.sliderID} scope="row">
                <td className="slider-table-data">{slider.sliderID}</td>
                <td className="slider-table-data">{slider.title}</td>

                <td className="img-row slider-table-data">
                  <img
                    className="img-fluid view-slider-list"
                    src={slider.image}
                    alt="Ảnh khóa học"

                  ></img>
                </td>
                <td className="slider-table-data">{slider.subjectName}</td>
                <td className="slider-table-data">
                  {slider.status == 1 ? "Active" : "Inactive"}
                </td>
                <td className="slider-table-data">{slider.note}</td>
                <td className="row action-row slider-table-data">
                  {slider.status == 1 ? (
                    <div
                      className="col-md-4 btn-action"
                      onClick={() => handleAction(slider.sliderID, "hide")}
                    >
                      <i class="fa-solid fa-eye-slash"></i>
                    </div>
                  ) : (
                    <div
                      className="col-md-4 btn-action"
                      onClick={() => handleAction(slider.sliderID, "show")}
                    >
                      <i class="fa-solid fa-eye"></i>
                    </div>
                  )}

                  <div className="editBtn col-md-3 btn-action">
                    <Link to={`/sliders/edit/${slider.sliderID}`}>
                      <i class="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </div>

                  <div
                    className="col-md-4 btn-action"
                    onClick={() => handleDelete(slider.sliderID)}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default SliderList;
