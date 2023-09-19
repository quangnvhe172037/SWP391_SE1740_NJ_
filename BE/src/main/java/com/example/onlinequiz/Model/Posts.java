package com.example.onlinequiz.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "post")
public class Posts {
    @Id
    @Column(name = "postid")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postID;

    @Column(name = "postdata", columnDefinition = "TEXT")
    private String postData;

    @ManyToOne
    @JoinColumn(name = "postcateid")
    private PostCategories postCategory;

    @ManyToOne
    @JoinColumn(name = "usersid")
    private Users user;

    @Column(name = "image", length = 256)
    private String image;

    @Column(name = "datecreate")
    private Date dateCreate;

    private boolean status;

    @Column(name = "updatedate")
    private Date updateDate;

    @Column(name = "briefinfor", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String briefInfor;

    @Column(name = "title", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String title;

}