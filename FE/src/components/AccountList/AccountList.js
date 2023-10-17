import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

const AccountList = () => {
    const token = localStorage.getItem("token");
    const [accounts, setAccounts] = useState([]);
    const [editableAccounts, setEditableAccounts] = useState([]);
    const [sortByRoleAscending, setSortByRoleAscending] = useState(true); // Thêm state để xác định thứ tự sắp xếp
    const [searchEmail, setSearchEmail] = useState(""); // Thêm state cho giá trị tìm kiếm
    const fetchAccounts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/all-accounts', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAccounts(response.data);
            // Khởi tạo mảng editableAccounts với các phần tử mặc định không có chỉnh sửa
            setEditableAccounts(new Array(response.data.length).fill(false));
        } catch (error) {
            if (error.response && error.response.status === 403) {
                // Nếu response trả về mã lỗi 403, dẫn người dùng quay lại trang Home
                localStorage.removeItem("token");
            }
            console.error('Error fetching accounts:', error);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    const handleEditClick = (index) => {
        // Cập nhật mảng editableAccounts để chỉ có phần tử tại index được chỉnh sửa
        const newEditableAccounts = [...editableAccounts];
        newEditableAccounts[index] = true;
        setEditableAccounts(newEditableAccounts);
    };

    const handleSaveClick = async (index, email) => {
        try {
            // Lấy tài khoản tại index
            const accountToEdit = accounts[index];
            // Gửi yêu cầu PUT để cập nhật dữ liệu trên máy chủ
            const response = await axios.put(`http://localhost:8080/admin/update/${email}?editedRole=${accountToEdit.role}&editedEnabled=${accountToEdit.enabled}`,{}, {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            // Sau khi cập nhật thành công, cập nhật danh sách tài khoản
            const updatedAccounts = [...accounts];
            updatedAccounts[index] = response.data;
            setAccounts(updatedAccounts);

            // Đánh dấu tất cả các hàng là không có chỉnh sửa
            const newEditableAccounts = new Array(updatedAccounts.length).fill(false);
            setEditableAccounts(newEditableAccounts);
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    const handleSortByRoleClick = () => {
        // Sao chép danh sách tài khoản hiện tại
        const sortedAccounts = [...accounts];
        // Sắp xếp tài khoản theo vai trò (role)
        sortedAccounts.sort((a, b) => {
            if (sortByRoleAscending) {
                return a.role.localeCompare(b.role);
            } else {
                return b.role.localeCompare(a.role);
            }
        });
        // Cập nhật danh sách tài khoản với thứ tự mới
        setAccounts(sortedAccounts);
        // Đảo ngược thứ tự sắp xếp (ascending/descending)
        setSortByRoleAscending(!sortByRoleAscending);
    };

    const handleSearchChange = (e) => {
        // Cập nhật giá trị tìm kiếm khi người dùng thay đổi ô nhập liệu
        setSearchEmail(e.target.value);
        // Lọc danh sách tài khoản dựa trên email và cập nhật danh sách hiển thị
        const filteredAccounts = accounts.filter(account => account.email.toLowerCase().includes(e.target.value.toLowerCase()));
        setAccounts(filteredAccounts);
    };

    return (
        <div className="view-container mt-5">
            <h5>Account List</h5>
                <input
                    type="text"
                    className="form-control"
                    id="searchEmail"
                    value={searchEmail}
                    onChange={handleSearchChange}

                />
            <table className="table mt-3">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Role <button className="btn" onClick={handleSortByRoleClick}>
                        {sortByRoleAscending ? "▲" : "▼"}
                    </button></th>
                    <th>Gender</th>
                    <th>Enabled</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {accounts.map((account, index) => (
                    <tr key={index}>
                        <td>{account.firstName}</td>
                        <td>{account.lastName}</td>
                        <td>{account.email}</td>
                        <td>{account.mobile}</td>
                        <td>
                            {editableAccounts[index] ? (
                                <select
                                    value={account.role}
                                    onChange={(e) => {
                                        const newAccounts = [...accounts];
                                        newAccounts[index].role = e.target.value;
                                        setAccounts(newAccounts);
                                    }}
                                >
                                    <option value="EXPERT">EXPERT</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="CUSTOMER">CUSTOMER</option>
                                    <option value="MARKETING">MARKETING</option>
                                </select>
                            ) : (
                                account.role
                            )}
                        </td>
                        <td>{account.gender ? 'Male' : 'Female'}</td>
                        <td>
                            {editableAccounts[index] ? (
                                <select
                                    value={account.enabled ? 'true' : 'false'}
                                    onChange={(e) => {
                                        const newAccounts = [...accounts];
                                        newAccounts[index].enabled = e.target.value === 'true';
                                        setAccounts(newAccounts);
                                    }}
                                >
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            ) : (
                                account.enabled ? 'Yes' : 'No'
                            )}
                        </td>
                        <td>
                            {editableAccounts[index] ? (
                                <button
                                    className="btn btn-success"
                                    style={{border: "1px solid black"}}
                                    onClick={() => handleSaveClick(index, account.email)}
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    className="btn"
                                    style={{border: "1px solid black"}}
                                    onClick={() => handleEditClick(index)}
                                >
                                    Edit
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AccountList;
