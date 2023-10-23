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
@Table(name = "subject_price")
public class SubjectPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pre_id")
    private Long preID;

    @Column(name = "price")
    private Long price = 0L;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subjects subject;


    @Column(name = "status")
    private boolean status;

}
