// Hàm xuất khẩu để tạo header xác thực cho yêu cầu HTTP
export default function authHeader() {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
}
