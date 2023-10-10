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

    @Column(name = "status")
    private boolean status;

    @Column(name = "order")
    private Integer order;

    @Column(name = "videolink", length = 256)
    private String videoLink;


    @Column(name = "lessoncontent")
    private String lessonContent;

    @ManyToOne
    @JoinColumn(name = "topicid")
    private SubjectTopics topic;

    @OneToOne
    @JoinColumn(name = "lessontypeid")
    private LessonType lessonType;
}
