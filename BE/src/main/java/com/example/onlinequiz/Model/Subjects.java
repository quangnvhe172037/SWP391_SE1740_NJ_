package com.example.onlinequiz.Model;

import jakarta.persistence.Column;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "subject")
public class Subjects {
    @Id
    @Column(name = "subject_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectID;

    @Column(name = "subject_name", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String subjectName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cate_id")
    private SubjectCategories subjectCategory;

    @Column(name = "status")
    private boolean status;

    @Column(name = "image", length = 256)
    private String image;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "create_date")
    private Date createDate;
}
