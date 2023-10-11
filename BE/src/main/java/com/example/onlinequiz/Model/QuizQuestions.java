package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quizquestion")
public class QuizQuestions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "questionid")
    private Long questionID;

    @Column(name = "questiondata", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String questionData;

    @OneToOne
    @JoinColumn(name = "sentenceid")
    private QuizData quizData;
}
