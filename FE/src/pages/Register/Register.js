import {useState} from "react";
import axios from "axios";

const Registration = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'CUSTOMER',
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const [message, setMessage] = useState(""); // Thêm state để lưu thông báo
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setMessage("Confirm Password does not match!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/register", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data); // Xử lý phản hồi từ máy chủ (server response)

            // Hiển thị thông báo từ phản hồi máy chủ
            setMessage(response.data.message);
        } catch (error) {
            if (error.response.status === 400) {
                setMessage(error.response.data.message);
            } else {
                console.error(error);
            }
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="role"
                        value={formData.role} // Giá trị role mặc định là "customer" và chỉ đọc
                        readOnly // Làm cho input chỉ đọc
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                {message && <div className="alert">{message}</div>} {/* Hiển thị thông báo */}
            </form>
        </div>
    );
};

export default Registration;