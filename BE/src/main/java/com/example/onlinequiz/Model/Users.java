package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class Users {
    @Id
    @Column(name = "usersid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty
    @Size(max = 20)
    private String firstName;
    @NotEmpty
    @Size(max = 20)
    private String lastName;

    @NaturalId(mutable = true)
    @Email
    private String email;

    private String mobile;

    @Null
    private boolean gender;


    private LocalDate createdate;

    private String image;


    private String password;

    private String role;

    private boolean isEnabled = false;
}
