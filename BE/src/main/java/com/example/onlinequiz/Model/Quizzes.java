package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Quiz")
public class Quizzes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quizID")
    private Long quizID;

    @Column(name = "quizName", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String quizName;

    @Column(name = "status", length = 256)
    private String status;

    @Column(name = "description", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String description;

    @ManyToOne
    @JoinColumn(name = "lessonID")
    private Lessons lesson;
}
