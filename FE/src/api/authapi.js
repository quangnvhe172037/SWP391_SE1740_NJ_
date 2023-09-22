
/*

Fetch và Axios là hai cách khác nhau để thực hiện yêu cầu HTTP trong JavaScript.
Dưới đây là một số sự khác nhau chính giữa chúng:

API và Cú pháp: Fetch là một API tiêu chuẩn của JavaScript và được tích hợp sẵn trong các trình duyệt
hiện đại. Axios là một thư viện bên ngoài, bạn cần cài đặt nó thông qua npm hoặc yarn và sau đó import
vào dự án.

Trình duyệt hỗ trợ: Fetch được tích hợp trong các trình duyệt hiện đại, nhưng có một số sự khác biệt
trong việc hỗ trợ và cú pháp giữa các trình duyệt. Axios không bị giới hạn bởi các vấn đề tương thích
trình duyệt và hoạt động tương tự trên cả máy chủ và trình duyệt.

Sử dụng: Fetch được sử dụng thông qua API tiêu chuẩn fetch() và trả về một Promise. Axios cung cấp một
giao diện dễ sử dụng hơn và trả về một Promise nên có thể được sử dụng dễ dàng trong mã bất đồng bộ.

Xử lý lỗi: Axios cung cấp cách xử lý lỗi dễ dàng hơn bằng cách sử dụng .catch() trực tiếp trên
Promise trả về. Fetch yêu cầu xử lý lỗi bằng cách kiểm tra trạng thái của phản hồi và ném một ngoại lệ.

Cấu hình mặc định: Axios cung cấp các cấu hình mặc định tốt hơn cho các yêu cầu HTTP như xử lý tự
động dạng JSON và quản lý cookie. Fetch cần nhiều cấu hình hơn để thực hiện những tác vụ tương tự.

Hỗ trợ hủy: Axios hỗ trợ việc hủy yêu cầu HTTP, điều này rất hữu ích khi bạn muốn hủy một yêu cầu
đang chờ khi người dùng thực hiện hành động khác. Fetch không hỗ trợ hủy yêu cầu một cách dễ dàng.
 */
import axios from "axios";
// Địa chỉ API của máy chủ dùng để gọi các yêu cầu đăng ký
const API_URL = "http://localhost:8080/api/test/";

//Hàm thực hiện đăng xuất người dùng
const logout = () => {
    //Lấy thông tin người dùng từ localStorage sau đó xóa đi
    localStorage.removeItem("token");
};

// Hàm lấy thông tin người dùng hiện tại từ localStorage
const getCurrentUser = () => {
    return localStorage.getItem("token");
};


const authapi = {
    logout, getCurrentUser
};

export default authapi;
