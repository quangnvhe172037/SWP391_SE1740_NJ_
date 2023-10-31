package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subject_topic")
public class SubjectTopics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topic_id")
    private Long topicID;

    @Column(name = "topic_name", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String topicName;

    @Column(name = "status")
    private boolean status = true;

    @Column(name = "subject_topic_order")
    private Integer order;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subjects subject;
}
