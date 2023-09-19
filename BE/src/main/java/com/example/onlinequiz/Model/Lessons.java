package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lesson")
public class Lessons {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lessonid")
    private Long lessonID;

    @Column(name = "lessonname", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String lessonName;

    @Column(name = "status", length = 256)
    private String status;

    @Column(name = "order")
    private int order;

    @Column(name = "videolink", length = 256)
    private String videoLink;

    @ManyToOne
    @JoinColumn(name = "topicid")
    private SubjectTopics topic;

    @ManyToOne
    @JoinColumn(name = "lessontypeid")
    private LessonType lessonType;
}
