package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subjecttopic")
public class SubjectTopics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topicid")
    private Long topicID;

    @Column(name = "topicname", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String topicName;

    @Column(name = "order")
    private Integer order;

    @ManyToOne
    @JoinColumn(name = "subjectid")
    private Subjects subject;
}
