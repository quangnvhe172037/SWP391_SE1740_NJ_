package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Account")
public class Accounts {
    @Id
    @Column(name = "email", length = 256)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String email;

    @Column(name = "password", length = 256)
    private String password;

    @ManyToOne
    @JoinColumn(name = "userID")
    private Users user;

    @Column(name = "status")
    private boolean isEnabled = false;

}
