package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quizanswer")
public class QuizAnswers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answerid")
    private Long answerID;

    @Column(name = "answerdata", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String answerData;

    @ManyToOne
    @JoinColumn(name = "sentenceid")
    private QuizData quizData;

    @Column(name = "istrueanswer")
    private boolean isTrueAnswer;
}
