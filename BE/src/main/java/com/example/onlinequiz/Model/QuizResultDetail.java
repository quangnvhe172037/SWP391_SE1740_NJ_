package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quizresultdetail")
public class QuizResultDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quizexamdetail")
    private Long quizExamDetail;

    @ManyToOne
    @JoinColumn(name = "resultid")
    private QuizResults quizResult;

    @ManyToOne
    @JoinColumn(name = "useranswer")
    private QuizAnswers userAnswer;

    @ManyToOne
    @JoinColumn(name = "sentenceid")
    private QuizData quizData;
}
