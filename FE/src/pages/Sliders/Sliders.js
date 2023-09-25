import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Slider.css"


const SliderList = () => {
  const [sliders, setSliders] = useState([]);
  const [filteredSliders, setFilteredSliders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const token = localStorage.getItem("token");
  
  // Xử lí api
  const api = "http://localhost:8080/sliders";

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
        console.log(dataJson);
        console.log(dataJson[0].subject.subjectID);
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
        console.log(data.subjectID);
        return data;
      })

      .then((result) => {
        const mockData = result;
        setSliders(mockData);
        setFilteredSliders(mockData);
      });
  }, []);

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
    console.log(updateStatus);

    fetch(`http://localhost:8080/sliders/${sliderId}`, {
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
    fetch(`http://localhost:8080/sliders/delete/${sliderId}`, {
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

  return (
    <div className="slider-list-container">
      <div>
        <input
          className="input-filter"
          type="text"
          placeholder="Search by title or backlink"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="select-filter" onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="1">Visible</option>
          <option value="0">Hidden</option>
        </select>

        <div>
          <button className="add-btn">
            <Link to={`/sliders/add`}>Add new slider</Link>
          </button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Image</th>
            <th scope="col">Subject Name</th>
            <th scope="col">Status</th>
            <th scope="col">Note</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSliders.map((slider) => (
            <tr key={slider.sliderID} scope="row">
              <td>{slider.sliderID}</td>
              <td>{slider.title}</td>

              <td className="img-row">
                <img
                  className="img-fluid"
                  src={slider.image}
                  alt="Ảnh khóa học"
                ></img>
              </td>
              <td>{slider.subjectName}</td>
              <td>{slider.status == 1 ? "Active" : "Inactive"}</td>
              <td>{slider.note}</td>
              <td className="row action-row">
                {slider.status == 1 ? (
                  <button
                    className="col-md-4 btn-action"
                    onClick={() => handleAction(slider.sliderID, "hide")}
                  >
                    Hidden
                  </button>
                ) : (
                  <button
                    className="col-md-3 btn-action"
                    onClick={() => handleAction(slider.sliderID, "show")}
                  >
                    Show
                  </button>
                )}

                <button className="editBtn col-md-3 btn-action">
                  <Link to={`/sliders/edit/${slider.sliderID}`}>Edit</Link>
                </button>

                <button 
                  className="col-md-4 btn-action"
                  onClick={() => handleDelete(slider.sliderID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SliderList;
