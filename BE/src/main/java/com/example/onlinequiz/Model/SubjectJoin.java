package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.security.auth.Subject;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "SubjectJoin")
public class SubjectJoin {
    @EmbeddedId
    private SubjectJoinId id;

    @ManyToOne
    @MapsId("subjectID")
    @JoinColumn(name = "subjectID")
    private Subjects subject;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users user;
}
