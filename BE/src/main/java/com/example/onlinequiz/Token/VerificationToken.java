package com.example.onlinequiz.Token;

import com.example.onlinequiz.Model.Users;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Calendar;
import java.util.Date;
@Getter // Lombok: Tự động tạo getter cho các trường (fields) của lớp
@Setter // Lombok: Tự động tạo setter cho các trường của lớp
@Entity // Đánh dấu đây là một Entity (thực thể) trong cơ sở dữ liệu
@NoArgsConstructor // Lombok: Tạo một constructor không có tham số
public class VerificationToken {
    @Id // Đánh dấu trường id là trường khoá chính
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tạo giá trị id tự tăng
    private Long id; // Trường id của VerificationToken

    private String token; // Trường token để xác thực

    private Date expirationTime; // Trường thời gian hết hạn của token
    private static final int EXPIRATION_TIME = 15; // Thời gian hết hạn token (15 phút)

    @OneToOne // Đánh dấu mối quan hệ một một (One-to-One)
    @JoinColumn(name = "usersid") // Liên kết với trường user_id
    private Users user; // Trường đại diện cho người dùng liên quan đến token

    public VerificationToken(String token, Users user) {
        super();
        this.token = token;
        this.user = user;
        this.expirationTime = this.getTokenExpirationTime(); // Tạo token với thời gian hết hạn được tính toán
    }

    public VerificationToken(String token) {
        super();
        this.token = token;
        this.expirationTime = this.getTokenExpirationTime(); // Tạo token với thời gian hết hạn được tính toán
    }

    // Phương thức để tính toán thời gian hết hạn của token
    public Date getTokenExpirationTime() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTimeInMillis(new Date().getTime());
        calendar.add(Calendar.MINUTE, EXPIRATION_TIME); // Thêm thời gian hết hạn (15 phút)
        return new Date(calendar.getTime().getTime());
    }
}

