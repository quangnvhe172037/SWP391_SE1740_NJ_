import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {Link, useNavigate} from 'react-router-dom';
import BASE_URL from "../../api/baseapi";
const Profile = () => {
    const token = localStorage.getItem('token'); // Lấy JWT token từ localStorage
    const user = jwtDecode(token); // Giải mã token để lấy thông tin người dùng
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: user.sub, // Sử dụng email từ JWT
        mobile: null,
        gender: true,
        password: '', // Không hiển thị mật khẩu
    });

    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Gửi yêu cầu GET đến API để lấy thông tin hồ sơ
        axios
          .get(`${BASE_URL}/profile/${user.sub}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setProfileData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching profile data:", error);
          });
    }, [token]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSaveChanges = () => {
        // Gửi yêu cầu PUT đến API để cập nhật thông tin hồ sơ
        axios
          .put(`${BASE_URL}/update/profile/${user.sub}`, profileData, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setIsEditing(false);
            // Cập nhật lại thông tin hồ sơ sau khi lưu thành công
            setProfileData(response.data);
            window.location.reload();
          })
          .catch((error) => {
            if (error.response && error.response.status === 400) {
              console.error("Bad request: ", error.response.data);
              alert("Something error");
            } else if (error.response && error.response.status === 403) {
              // Nếu response trả về mã lỗi 403, dẫn người dùng quay lại trang Home
              alert("You are out of System");
              navigate("/login");
              localStorage.removeItem("token");
            } else {
              console.error("Error updating profile data:", error);
            }
          });
    };

    return (
        <div className="profile-container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img src="https://th.bing.com/th/id/OIP.yP3kk77LcFKDSG9UeLzrmwHaLE?w=133&h=199&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                         alt="Profile Avatar"
                        style={{borderRadius: "50%", marginLeft:"50px"}}
                    />
                </div>
                <div className="col-md-8">
                    <h2 className="text-left">Profile details</h2>
                    <table className="table">
                        <tbody>
                        <tr>
                            <td className="text-left"><strong>Email:</strong></td>
                            <td>{profileData.email}</td>
                        </tr>
                        <tr>
                            <td className="text-left"><strong>First Name:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={`${profileData.firstName}`}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    disabled={!isEditing}
                                    style={{borderColor: "black"}}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left"><strong>Last Name:</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={`${profileData.lastName}`}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    disabled={!isEditing}
                                    style={{borderColor: "black"}}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left"><strong>Gender:</strong></td>
                            <td>
                                <select
                                    name="gender"
                                    value={profileData.gender}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    disabled={!isEditing}
                                    style={{borderColor: "black"}}
                                >
                                    <option value={true}>Male</option>
                                    <option value={false}>Female</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left"><strong>Mobile phone (+84):</strong></td>
                            <td>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={profileData.mobile}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    disabled={!isEditing}
                                    style={{borderColor: "black"}}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="text-left"><strong>Password:</strong></td>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    value="No, you can not do that!"
                                    onChange={handleInputChange}
                                    // className="form-control"
                                    readOnly
                                    disabled={!isEditing}
                                />
                                <Link to="/change-password" className="btn btn-link">
                                    Change Password
                                </Link>
                            </td>
                        </tr>

                        </tbody>
                    </table>
                    {isEditing ? (
                        <button className="btn" onClick={handleSaveChanges} style={{ borderColor: "black", color: "black" }}>
                            Save changes
                        </button>
                    ) : (
                        <button className="btn" style={{ borderColor: "black", color: "black", margin: "5px" }} onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
