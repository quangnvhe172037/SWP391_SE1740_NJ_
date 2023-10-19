package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quiz_result_detail")
public class QuizResultDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_exam_detail")
    private Long quizExamDetail;

    @ManyToOne
    @JoinColumn(name = "result_id")
    private QuizResults quizResult;

    @ManyToOne
    @JoinColumn(name = "user_answer")
    private QuizAnswers userAnswer;

    @ManyToOne
    @JoinColumn(name = "sentence_id")
    private QuizData quizData;
}
