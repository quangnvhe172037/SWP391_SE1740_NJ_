package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 10)
    private Long id;

    @Column(name = "email", unique = true, length = 50)
    private String email;
    @Column(name = "picture", nullable = false)
    private String picture;
    @Column(name = "password", nullable = false, length = 50)
    private String password;

    @Column(name = "name", nullable = false, length = 50)
    private String username;
    @ManyToMany(fetch = FetchType.LAZY)//Fetchtype.Lazy là chỉ khi nào truy cập đến mới load
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "roles_id"))
    private Set<Role> roles = new HashSet<>();

    public Users(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
