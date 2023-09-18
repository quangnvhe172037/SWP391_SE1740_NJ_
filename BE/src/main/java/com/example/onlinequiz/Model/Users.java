package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "User")
public class Users {
    @Id
    @Column(name = "userID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "firstName", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String firstName;

    @Column(name = "lastName", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String lastName;

    @NaturalId(mutable = true)
    private String email;

    private int mobile;

    private boolean gender;

    private Date createDate;

    private String image;

    private String password;

    @ManyToOne
    @JoinColumn(name = "roleID")
    private Roles role;

    @Column(name = "status")
    private boolean status;


}
