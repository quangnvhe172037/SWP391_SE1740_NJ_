package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "SubjectTeacher")
public class SubjectTeachers {
    @EmbeddedId
    private SubjectTeacherId id;

    @ManyToOne
    @MapsId("subjectID")
    @JoinColumn(name = "subjectID")
    private Subjects subject;

    @ManyToOne
    @MapsId("expertID")
    @JoinColumn(name = "expertID")
    private Users expert;
}
