package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quizdetail")
public class QuizDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quizdetailid")
    private Long quizDetailID;

    @BatchSize(size = 5)
    @ManyToOne
    @JoinColumn(name = "sentenceid")
    private QuizData quizData;

    @BatchSize(size = 5)
    @ManyToOne
    @JoinColumn(name = "quizid")
    private Quizzes quizzes;


}
