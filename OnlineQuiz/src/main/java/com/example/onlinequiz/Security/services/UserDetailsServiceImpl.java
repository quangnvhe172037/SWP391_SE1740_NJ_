package com.example.onlinequiz.Security.services;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Repo.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UsersRepository usersRepository;
    @Override
    @Transactional//khi đánh dấu bằng transactional thì khi tương tác với database nếu fail sẽ rollback
    /**
     * Phương thức này được sử dụng để tìm kiếm người dùng trong hệ thống dựa trên tên đăng nhập (username).
     * Nếu người dùng với tên đăng nhập cung cấp không tồn tại trong cơ sở dữ liệu, nó sẽ ném một ngoại lệ
     * UsernameNotFoundException. Nếu tìm thấy người dùng, phương thức này sẽ trả về một đối tượng UserDetails
     * được tạo ra từ thông tin người dùng.
     *
     * @param username Tên đăng nhập của người dùng cần tìm kiếm.
     * @return Đối tượng UserDetails chứa thông tin của người dùng.
     * @throws UsernameNotFoundException Ném ngoại lệ này nếu không tìm thấy người dùng với tên đăng nhập cung cấp.
     */
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found: " + username));

        return UserDetailsImpl.build(users);
    }
}
