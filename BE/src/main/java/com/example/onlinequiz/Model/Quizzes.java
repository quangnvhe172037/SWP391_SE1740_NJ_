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
    @Column(name = "quizid")
    private Long quizID;

    @Column(name = "quizname", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String quizName;

    @Column(name = "status")
    private boolean status;

    @Column(name = "description", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String description;

    @ManyToOne
    @JoinColumn(name = "subjectid")
    private Subjects subject;

    private Long lessonid;

    @ManyToOne
    @JoinColumn(name = "quiztypeid")
    private QuizTypes quizTypes;

    @Column(name = "datecreate")
    private Date dateCreate;

    @Column(name = "durationtime")
    private Time durationTime;

    @Column(name = "passrate")
    private int passRate;

}
