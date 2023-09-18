package com.example.onlinequiz.Security;

import com.example.onlinequiz.Model.Users;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
@Data // Annotation từ Lombok để tự động tạo getter, setter và các phương thức khác
public class UserRegistrationDetails implements UserDetails {
    private String userName; // Tên đăng nhập của người dùng
    private String password; // Mật khẩu của người dùng
    private boolean isEnabled; // Trạng thái hoạt động của người dùng
    private List<GrantedAuthority> authorities; // Danh sách các quyền (vai trò) của người dùng

    public UserRegistrationDetails(Users users) {
        // Constructor nhận đối tượng Users và khởi tạo UserRegistrationDetails từ thông tin của Users
        this.userName = users.getEmail(); // Gán tên đăng nhập từ địa chỉ email của Users
        this.password = users.getPassword(); // Gán mật khẩu từ Users
        this.isEnabled = users.isEnabled(); // Gán trạng thái hoạt động từ Users

        // Chuyển đổi chuỗi roles từ Users thành danh sách các GrantedAuthority (vai trò) và gán vào authorities
        this.authorities = Arrays.stream(users.getRole()
                        .split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities; // Trả về danh sách các quyền (vai trò) của người dùng
    }

    @Override
    public String getPassword() {
        return password; // Trả về mật khẩu của người dùng
    }

    @Override
    public String getUsername() {
        return userName; // Trả về tên đăng nhập của người dùng (ở đây là địa chỉ email)
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Người dùng không bao giờ bị hết hạn tài khoản
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Người dùng không bao giờ bị khóa tài khoản
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Mật khẩu của người dùng không bao giờ hết hạn
    }

    @Override
    public boolean isEnabled() {
        return isEnabled; // Trả về trạng thái hoạt động của người dùng (true hoặc false)
    }
}

