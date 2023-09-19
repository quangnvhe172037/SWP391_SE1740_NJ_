package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;


@Embeddable
public class SubjectJoinId implements Serializable {

    @JoinColumn(name = "subjectID")
    private Long subjectID;

    @JoinColumn(name = "users_id")
    private Long userID;
}
