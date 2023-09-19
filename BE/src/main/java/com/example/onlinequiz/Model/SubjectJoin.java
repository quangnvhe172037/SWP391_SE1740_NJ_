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
@Table(name = "subjectjoin")
public class SubjectJoin {
    @EmbeddedId
    private SubjectJoinId id;

    @ManyToOne
    @MapsId("subjectid")
    @JoinColumn(name = "subjectid")
    private Subjects subject;

    @ManyToOne
    @JoinColumn(name = "usersid")
    private Users user;
}
