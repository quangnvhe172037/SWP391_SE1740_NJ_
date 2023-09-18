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
@Data
public class UserRegistrationDetails implements UserDetails {
    private String userName;
    private String password;
    private boolean isEnabled;
    private List<GrantedAuthority> authorities;
    public UserRegistrationDetails(Users users) {
        this.userName = users.getEmail();
        this.password = users.getPassword();
        this.isEnabled = users.isEnabled();
        this.authorities = Arrays.stream(users.getRole()
                        .split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }


    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
