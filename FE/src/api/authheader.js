// Hàm xuất khẩu để tạo header xác thực cho yêu cầu HTTP
export default function authHeader() {
    // Lấy thông tin người dùng từ localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Khởi tạo đối tượng headers với Content-Type là application/json
    const headers = {
        'Content-Type': 'application/json'
    };

    // Kiểm tra nếu người dùng và accessToken tồn tại
    if (user && user.accessToken) {
        // Thêm header xác thực với mã thông báo truy cập (accessToken)
        headers['Authorization'] = 'Bearer ' + user.accessToken;
    }

    // Trả về đối tượng headers
    return headers;
}
