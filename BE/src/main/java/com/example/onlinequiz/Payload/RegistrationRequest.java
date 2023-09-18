package com.example.onlinequiz.Payload;

import org.hibernate.annotations.NaturalId;

public record RegistrationRequest(String firstName,
                                  String lastName,
                                  String email,
                                  String password,
                                  String role
) {
    // Đây là một ghi chú (record) được sử dụng để định nghĩa một lớp dữ liệu không thay đổi (immutable).
    // Các trường (fields) của record được định nghĩa trong dấu ngoặc đơn và tự động có các phương thức getter.
    // Record này làm đơn giản hóa việc tạo và sử dụng đối tượng chứa thông tin đăng ký.

    // Trường firstName: Tên
    // Trường lastName: Họ
    // Trường email: Địa chỉ email
    // Trường password: Mật khẩu
    // Trường role: Vai trò của người dùng

    // Record tự động tạo constructor chấp nhận các tham số tương ứng với các trường.
    // Record tự động tạo các phương thức getter để truy cập dữ liệu trong đối tượng.
}

