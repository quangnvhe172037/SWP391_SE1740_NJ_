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
@Table(name = "quiz_question")
public class QuizQuestions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionID;

    @Column(name = "question_data", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String questionData;

    @OneToOne
    @JoinColumn(name = "sentence_id")
    @JsonBackReference
    private QuizData quizData;
}
