import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const SliderList = () => {
  const [sliders, setSliders] = useState([]);
  const [filteredSliders, setFilteredSliders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Xử lí api
  const api = "http://localhost:8080/sliders";

  useEffect(() => {
    fetch(api)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })

      .then((dataJson) => {
        const data = dataJson.map((item) => ({
          sliderID: item.sliderID,
          title: item.title,
          image: item.image,
          subjectID: item.subjectID,
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

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search by title or backlink"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="1">Visible</option>
          <option value="0">Hidden</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Image</th>
            <th>Subject Name</th>
            <th>Status</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSliders.map((slider) => (
            <tr key={slider.sliderID}>
              <td>{slider.sliderID}</td>
              <td>{slider.title}</td>

              <td>
                <img src={slider.image} alt="image of the slider"></img>
              </td>
              <td>{slider.subjectName}</td>
              <td>{slider.status == 1 ? "Active" : "Inactive"}</td>
              <td>{slider.note}</td>
              <td>
                {slider.status == 1 ? (
                  <button onClick={() => handleAction(slider.sliderID, "hide")}>
                    Hidden
                  </button>
                ) : (
                  <button onClick={() => handleAction(slider.sliderID, "show")}>
                    Show
                  </button>
                )}

                <button>
                  <Link to={`/sliders/edit/${slider.sliderID}`}>Edit</Link>
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