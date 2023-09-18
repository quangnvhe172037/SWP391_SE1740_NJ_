package com.example.onlinequiz.Security;

import com.example.onlinequiz.Repo.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service // Đánh dấu đây là một Spring Service để thực hiện logic xử lý đăng nhập và xác thực người dùng
@RequiredArgsConstructor // Tự động tạo constructor với tham số cho các trường được đánh dấu là final
public class UserRegistrationService implements UserDetailsService {
    @Autowired
    private final UserRepository userRepository; // Sử dụng Spring để tiêm UserRepository vào Service

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Phương thức này được gọi khi có yêu cầu xác thực người dùng bằng tên đăng nhập (ở đây là email)

        // Tìm kiếm người dùng trong cơ sở dữ liệu bằng địa chỉ email
        return userRepository.findByEmail(email)
                .map(UserRegistrationDetails::new) // Nếu tìm thấy, chuyển đổi thành UserRegistrationDetails
                .orElseThrow(() -> new UsernameNotFoundException("User not found")); // Nếu không tìm thấy, ném ngoại lệ UsernameNotFoundException
    }
}

