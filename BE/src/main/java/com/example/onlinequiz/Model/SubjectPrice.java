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
@Table(name = "subjectprice")
public class SubjectPrice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "preid")
    private Long preID;

    @Column(name = "price")
    private Long price;

    @ManyToOne
    @JoinColumn(name = "subjectid")
    private Subjects subject;

    @Column(name = "duration")
    private Date duration;

    @Column(name = "status")
    private boolean status;

}
