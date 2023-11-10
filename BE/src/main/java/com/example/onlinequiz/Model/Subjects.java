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
    // Ten khoa hoc
    @Column(name = "subject_name", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String subjectName;
    // Loai khoa hoc
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cate_id")
    private SubjectCategories subjectCategory;
    // Trang thai khoa hoc
    @Column(name = "status")
    private boolean status;
    //Anh khoa hoc
    @Column(name = "image", length = 256)
    private String image;
    //Mieu ta khoa hoc
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    //Ngay tao khoa hoc
    @Column(name = "create_date")
    private Date createDate;

    @Transient
    private Long price;
}
