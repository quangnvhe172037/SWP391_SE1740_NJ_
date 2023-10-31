package com.example.onlinequiz.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quiz_answer")
public class QuizAnswers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "answer_id")
    private Long answerID;

    @Column(name = "answer_data", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String answerData;

    @ManyToOne
    @JoinColumn(name = "sentence_id")
    @JsonBackReference
    private QuizData quizData;

    @Column(name = "is_true_answer")
    private boolean isTrueAnswer;

    @Column(name = "explanation", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String explanation; // Trường giải thích
}
