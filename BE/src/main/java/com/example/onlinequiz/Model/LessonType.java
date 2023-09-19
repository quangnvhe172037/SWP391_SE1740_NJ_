package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Lessontype")
public class LessonType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "lessontypeid")
    private int lessonTypeID;

    @Column(name = "lessontypename", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String lessonTypeName;
}
