package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subjectteacher")
public class SubjectTeachers {
    @EmbeddedId
    private SubjectTeacherId id;

    @ManyToOne
    @MapsId("subjectid")
    @JoinColumn(name = "subjectid")
    private Subjects subject;

    @ManyToOne
    @MapsId("usersid")
    @JoinColumn(name = "usersid")
    private Users expert;
}
