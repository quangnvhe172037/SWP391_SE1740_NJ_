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
@Table(name = "QuizResult")
public class QuizResults {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resultID")
    private Long resultID;

    @Column(name = "score")
    private int score;

    @ManyToOne
    @JoinColumn(name = "userID")
    private Users user;

    @Column(name = "dateTaken")
    private Date dateTaken;

    @ManyToOne
    @JoinColumn(name = "quizID")
    private QuizExams quizExam;

    @Column(name = "correctAnswer")
    private int correctAnswer;
    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;
}
