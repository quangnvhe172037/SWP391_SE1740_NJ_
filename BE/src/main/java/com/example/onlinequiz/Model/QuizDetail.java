package com.example.onlinequiz.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quiz_detail")
public class QuizDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_detail_id")
    private Long quizDetailID;

    @BatchSize(size = 5)
    @OneToOne
    @JsonManagedReference
    @JoinColumn(name = "sentence_id")
    private QuizData quizData;

    @BatchSize(size = 5)
    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "quiz_id")
    private Quizzes quizzes;


}
