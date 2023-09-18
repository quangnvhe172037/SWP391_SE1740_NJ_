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
@Table(name = "QuizExam")
public class QuizExams {
    @Id
    @Column(name = "quizID")
    private Long quizID;

    @Column(name = "quizName", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String quizName;

    @Column(name = "dateCreate")
    private Date dateCreate;

    @Column(name = "durationTime")
    private Date durationTime;

    @Column(name = "passRate")
    private int passRate;

    @ManyToOne
    @JoinColumn(name = "subjectID")
    private Subjects subject;

}
