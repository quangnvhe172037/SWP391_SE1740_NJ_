package com.example.onlinequiz.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "SubjectCategory")
public class SubjectCategories {
    @Id
    @Column(name = "cateID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cateID;

    @Column(name = "cateName", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String cateName;
}
