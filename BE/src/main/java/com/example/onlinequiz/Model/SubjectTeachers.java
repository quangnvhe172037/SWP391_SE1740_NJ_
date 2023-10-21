package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subject_teacher")
public class SubjectTeachers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_teacher_id")
    private Long subjectTeacherId;

    @ManyToOne
    @MapsId("subject_id")
    @JoinColumn(name = "subject_id")
    private Subjects subject;

    @ManyToOne
    @MapsId("user_id")
    @JoinColumn(name = "user_id")
    private Users expert;
}
