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
    @Column(name = "lesson_id")
    private Long lessonID;

    @Column(name = "lesson_name", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String lessonName;

    @Column(name = "status")
    private boolean status = true;

    @Column(name = "lesson_order")
    private Integer order;

    @Column(name = "video_link", length = 256)
    private String videoLink;


    @Column(name = "lesson_content")
    private String lessonContent;

    @ManyToOne
    @JoinColumn(name = "topic_id")
    private SubjectTopics topic;

    @OneToOne
    @JoinColumn(name = "lesson_type_id")
    private LessonType lessonType;
}
