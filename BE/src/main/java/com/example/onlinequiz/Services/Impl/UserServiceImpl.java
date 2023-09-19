package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Exception.UserAlreadyExistException;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.RegistrationRequest;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Repo.VerificationTokenRepository;
import com.example.onlinequiz.Services.UserService;
import com.example.onlinequiz.Token.VerificationToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;
import java.util.Optional;
@Service // Đánh dấu đây là một Spring Service để thực hiện logic liên quan đến người dùng
@RequiredArgsConstructor // Tự động tạo constructor với tham số cho các trường được đánh dấu là final
public class UserServiceImpl implements UserService {
    @Autowired
    private final UserRepository userRepository; // Sử dụng Spring để tiêm UserRepository vào Service

    @Autowired
    private final VerificationTokenRepository tokenRepository; // Sử dụng Spring để tiêm VerificationTokenRepository vào Service

    @Autowired
    private final PasswordEncoder passwordEncoder; // Sử dụng Spring để tiêm PasswordEncoder vào Service

    @Override
    public List<Users> getUsers() {
        return userRepository.findAll(); // Trả về danh sách tất cả người dùng từ cơ sở dữ liệu
    }

    @Override
    public Users registerUser(RegistrationRequest request) {
        Optional<Users> user = this.findbyEmail(request.email());
        if(user.isPresent()){
            throw new UserAlreadyExistException("User with email " + request.email() + " already exists!"); // Nếu người dùng đã tồn tại, ném ngoại lệ UserAlreadyExistException
        }
        var newUser = new Users(); // Tạo một đối tượng người dùng mới
        newUser.setFirstName(request.firstName());
        newUser.setLastName(request.lastName());
        newUser.setEmail(request.email());
        newUser.setPassword(passwordEncoder.encode(request.password())); // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
        newUser.setRole(request.role());
        return userRepository.save(newUser); // Lưu người dùng mới vào cơ sở dữ liệu và trả về đối tượng người dùng đã lưu
    }

    @Override
    public Optional<Users> findbyEmail(String email) {
        return userRepository.findByEmail(email); // Tìm kiếm người dùng theo địa chỉ email
    }

    @Override
    public void saveUserVerificationToken(Users theUser, String token) {
        var verificationToken = new VerificationToken(token, theUser); // Tạo đối tượng VerificationToken với mã xác thực và người dùng tương ứng
        tokenRepository.save(verificationToken); // Lưu VerificationToken vào cơ sở dữ liệu
    }

    @Override
    public String validateaToken(String theToken) {
        VerificationToken token = tokenRepository.findByToken(theToken); // Tìm kiếm VerificationToken bằng mã xác thực
        if(token == null){
            return "Invalid verification token"; // Nếu không tìm thấy, trả về thông báo lỗi
        }
        Users user = token.getUser();
        Calendar calendar = Calendar.getInstance();
        if(token.getTokenExpirationTime().getTime() - calendar.getTime().getTime() <= 0){
            tokenRepository.delete(token); // Xóa VerificationToken nếu đã hết hạn
            return "Token already expired"; // Trả về thông báo lỗi nếu mã xác thực đã hết hạn
        }
        user.setEnabled(true); // Kích hoạt tài khoản người dùng
        userRepository.save(user); // Lưu thông tin người dùng đã kích hoạt
        return "valid"; // Trả về "valid" nếu mã xác thực hợp lệ và tài khoản đã được kích hoạt
    }
}

