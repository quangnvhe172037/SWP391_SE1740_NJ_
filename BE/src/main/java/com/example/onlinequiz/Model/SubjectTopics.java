package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "SubjectTopic")
public class SubjectTopics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topicID")
    private Long topicID;

    @Column(name = "topicName", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String topicName;

    @ManyToOne
    @JoinColumn(name = "subjectID")
    private Subjects subject;
}
