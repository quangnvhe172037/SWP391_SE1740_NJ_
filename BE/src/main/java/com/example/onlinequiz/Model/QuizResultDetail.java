package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "QuizResultDetail")
public class QuizResultDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quizExamDetail")
    private Long quizExamDetail;

    @ManyToOne
    @JoinColumn(name = "resultID")
    private QuizResults quizResult;

    @ManyToOne
    @JoinColumn(name = "userAnswer")
    private QuizAnswers userAnswer;

    @ManyToOne
    @JoinColumn(name = "sentenceID")
    private QuizData quizData;
}
