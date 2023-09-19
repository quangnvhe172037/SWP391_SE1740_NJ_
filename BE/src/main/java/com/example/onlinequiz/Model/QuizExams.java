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
@Table(name = "quizexam")
public class QuizExams {
    @Id
    @Column(name = "quizid")
    private Long quizID;

    @Column(name = "quizname", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String quizName;

    @Column(name = "datecreate")
    private Date dateCreate;

    @Column(name = "durationtime")
    private Date durationTime;

    @Column(name = "passrate")
    private int passRate;

    @ManyToOne
    @JoinColumn(name = "subjectid")
    private Subjects subject;

}
