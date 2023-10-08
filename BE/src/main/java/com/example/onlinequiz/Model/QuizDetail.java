package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quizdetail")
public class QuizDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quizdetailid")
    private Long quizDetailID;

    @ManyToOne
    @MapsId("sentenceid")
    @JoinColumn(name = "sentenceid")
    private QuizData quizData;

    @ManyToOne
    @JoinColumn(name = "quizid")
    private Quizzes quizzes;
}
