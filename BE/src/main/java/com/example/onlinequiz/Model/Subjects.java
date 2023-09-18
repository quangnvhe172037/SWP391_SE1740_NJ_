package com.example.onlinequiz.Model;

import jakarta.persistence.Column;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Subject")
public class Subjects {
    @Id
    @Column(name = "subjectID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectID;

    @Column(name = "subjectName", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String subjectName;

    @ManyToOne
    @JoinColumn(name = "cateID")
    private SubjectCategories subjectCategory;

    @Column(name = "status")
    private boolean status;

    @Column(name = "image", length = 256)
    private String image;

    @Column(name = "description", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String description;
}
