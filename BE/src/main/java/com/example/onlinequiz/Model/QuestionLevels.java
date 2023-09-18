package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "QuestionLevel")
public class QuestionLevels {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "levelID")
    private int levelID;

    @Column(name = "levelName", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String levelName;
}
