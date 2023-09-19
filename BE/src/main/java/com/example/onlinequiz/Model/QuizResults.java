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
@Table(name = "quizresult")
public class QuizResults {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resultid")
    private Long resultID;

    @Column(name = "score")
    private int score;

    @ManyToOne
    @JoinColumn(name = "usersid")
    private Users user;

    @Column(name = "datetaken")
    private Date dateTaken;

    @ManyToOne
    @JoinColumn(name = "quizid")
    private QuizExams quizExam;

    @Column(name = "correctanswer")
    private int correctAnswer;

}
