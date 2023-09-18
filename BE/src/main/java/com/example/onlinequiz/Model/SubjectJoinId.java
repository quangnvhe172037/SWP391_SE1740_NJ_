package com.example.onlinequiz.Model;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class SubjectJoinId implements Serializable {
    private Long subjectID;
    private Long userID;
}
