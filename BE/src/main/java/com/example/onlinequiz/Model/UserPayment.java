package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "userpayment")
public class UserPayment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "billid")
    private Long billID;
    @ManyToOne
    @JoinColumn(name = "preid")
    private SubjectPrice subjectPrice;

    @Column(name = "status")
    private boolean status;

    @Column(name = "notify", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String notify;

    @Column(name = "purchasedate")
    private Date purchase_date;

    @ManyToOne
    @JoinColumn(name = "subjectid")
    private Subjects subject;

    @ManyToOne
    @JoinColumn(name = "usersid")
    private Users users;
}
