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
@Table(name = "quiz_result")
public class QuizResults {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Long resultID;

    @Column(name = "score")
    private int score;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "date_taken")
    private Date dateTaken;

    @Column(name = "date_end")
    private Date dateEnd;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quizzes quizzes;

    @Column(name = "correct_answer")
    private int correctAnswer = 0;

    @Column(name = "null_answer")
    private int nullAnswer = 0;

    @Column(name = "false_answer")
    private int falseAnswer = 0;

    @Column(name = "is_pass")
    private Boolean isPass = false;

    @Column(name = "is_done")
    private Boolean isDone = false;

}
