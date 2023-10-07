package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quizdata")
public class QuizData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sentenceid")
    private Long sentenceID;

    @ManyToOne
    @JoinColumn(name = "quizid")
    private Quizzes quiz;

    @Column(name = "lessonid")
    private Long lessonid;
}
