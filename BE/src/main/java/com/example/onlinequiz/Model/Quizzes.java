package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "quiz")
public class Quizzes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quiz_id")
    private Long quizID;

    @Column(name = "quiz_name", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String quizName;

    @Column(name = "status")
    private boolean status;

    @Column(name = "description", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String description;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subjects subject;

    @Column(name = "lesson_id")
    private Long lessonid;

    @ManyToOne
    @JoinColumn(name = "quiz_type_id")
    private QuizTypes quizTypes;

    @Column(name = "date_create")
    private Date dateCreate;

    @Column(name = "duration_time")
    private Time durationTime;

    @Column(name = "pass_rate")
    private int passRate;

}
