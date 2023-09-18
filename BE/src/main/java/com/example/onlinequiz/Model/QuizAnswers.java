package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "QuizAnswer")
public class QuizAnswers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answerID")
    private Long answerID;

    @Column(name = "answerData", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String answerData;

    @ManyToOne
    @JoinColumn(name = "sentenceID")
    private QuizData quizData;

    @Column(name = "isTrueAnswer")
    private boolean isTrueAnswer;
}
