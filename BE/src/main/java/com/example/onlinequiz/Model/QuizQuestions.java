package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "QuizQuestion")
public class QuizQuestions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "questionID")
    private Long questionID;

    @Column(name = "questionData", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String questionData;

    @ManyToOne
    @JoinColumn(name = "sentenceID")
    private QuizData quizData;
}
