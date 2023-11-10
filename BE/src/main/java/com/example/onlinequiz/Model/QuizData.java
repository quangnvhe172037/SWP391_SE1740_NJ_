package com.example.onlinequiz.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quiz_data")
public class QuizData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sentence_id")
    private Long sentenceID;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subjects subject;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "quizData")
    @JsonManagedReference
    private List<QuizAnswers> quizAnswers;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "quizData")
    @JsonManagedReference
    private QuizQuestions quizQuestions;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "quizData")
    @JsonBackReference
    private List<QuizDetail> quizDetail;
}
