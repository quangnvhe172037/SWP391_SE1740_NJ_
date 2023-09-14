// Hàm xuất khẩu để tạo header xác thực cho yêu cầu HTTP
export default function authHeader() {
    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Kiểm tra nếu người dùng và accessToken tồn tại
    if (user && user.accessToken) {
        // Trả về header xác thực với mã thông báo truy cập (accessToken)
        return {
            Authorization: 'Bearer ' + user.accessToken
        };
    } else {
        // Trả về header trống nếu không có thông tin xác thực
        return {};
    }
}
