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
@Table(name = "user_payment")
public class UserPayment {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "bill_id")
    private Long billID;
    @ManyToOne
    @JoinColumn(name = "pre_id")
    private SubjectPrice subjectPrice;

    @Column(name = "status")
    private boolean status;

    @Column(name = "notify", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String notify;

    @Column(name = "purchase_date")
    private Date purchaseDate;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subjects subject;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users users;
}
