package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Sliders {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "sliderID")
    private Long sliderID;

    @Column(name = "title", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String title;

    @Column(name = "image", length = 256)
    private String image;

    @ManyToOne
    @JoinColumn(name = "subjectID")
    private Subjects subject;

    @Column(name = "status", length = 256)
    private String status;

    @Column(name = "note", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String note;
}
