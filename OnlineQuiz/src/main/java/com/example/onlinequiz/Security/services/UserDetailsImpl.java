package com.example.onlinequiz.Security.services;

import com.example.onlinequiz.Model.Users;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    //lớp này có thể tuần tự hóa và sử dụng 1L làm số định danh phiên bản.
    private static final long serialVersionUID = 1L;
    private Long id;
    private String username;
    private String email;

    @JsonIgnore//ẩn password khỏi json
    private String password;

    private Collection<? extends GrantedAuthority> authorities;
    public UserDetailsImpl(Long id, String username, String email, String password,
                           Collection<? extends GrantedAuthority> authorities){
        this.id = id;
        this.username = username;
        this.password = password;
        this.authorities = authorities;
    }

    /**
     * Xây dựng một đối tượng UserDetailsImpl từ thông tin người dùng.
     *
     * @param user Thông tin người dùng.
     * @return Đối tượng UserDetailsImpl đã được xây dựng.
     */
    public static UserDetailsImpl build(Users user) {
        // Tạo danh sách các quyền (authorities) từ danh sách vai trò của người dùng
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName().name()))
                .collect(Collectors.toList());

        // Xây dựng và trả về một đối tượng UserDetailsImpl
        return new UserDetailsImpl(
                user.getId(),          // ID người dùng
                user.getUsername(),    // Tên đăng nhập
                user.getEmail(),       // Địa chỉ email
                user.getPassword(),    // Mật khẩu
                authorities            // Danh sách quyền (authorities)
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    /**
     * Kiểm tra xem tài khoản người dùng có hợp lệ không.
     * Trong trường hợp này, tài khoản không bao giờ hết hạn, vì vậy chúng ta trả về luôn true.
     *
     * @return true nếu tài khoản không hết hạn, ngược lại trả về false.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Kiểm tra xem tài khoản người dùng có bị khóa không.
     * Trong trường hợp này, tài khoản không bao giờ bị khóa, vì vậy chúng ta trả về luôn true.
     *
     * @return true nếu tài khoản không bị khóa, ngược lại trả về false.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Kiểm tra xem thông tin xác thực của tài khoản có hợp lệ không.
     * Trong trường hợp này, chúng ta cho rằng thông tin xác thực luôn hợp lệ, vì vậy trả về true.
     *
     * @return true nếu thông tin xác thực hợp lệ, ngược lại trả về false.
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Kiểm tra xem tài khoản người dùng có được kích hoạt không.
     * Trong trường hợp này, tài khoản luôn được kích hoạt, vì vậy chúng ta trả về luôn true.
     *
     * @return true nếu tài khoản được kích hoạt, ngược lại trả về false.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }

    /**
     * So sánh đối tượng hiện tại với một đối tượng khác để kiểm tra xem chúng có giống nhau không.
     * Trong trường hợp này, chúng ta so sánh hai đối tượng `UserDetailsImpl` dựa trên trường `id`.
     *
     * @param o Đối tượng cần so sánh với đối tượng hiện tại.
     * @return true nếu hai đối tượng có cùng giá trị của trường `id`, ngược lại trả về false.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}
