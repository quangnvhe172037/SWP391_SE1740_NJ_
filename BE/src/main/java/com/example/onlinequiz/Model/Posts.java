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
@Table(name = "Post")
public class Posts {
    @Id
    @Column(name = "postID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postID;

    @Column(name = "postData", columnDefinition = "TEXT")
    private String postData;

    @ManyToOne
    @JoinColumn(name = "postCateID")
    private PostCategories postCategory;

    @ManyToOne
    @JoinColumn(name = "userID")
    private Users user;

    @Column(name = "image", length = 256)
    private String image;

    @Column(name = "dateCreate")
    private Date dateCreate;

    private boolean status;

    @Column(name = "updateDate")
    private Date updateDate;

    @Column(name = "briefInfor", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String briefInfor;

    @Column(name = "title", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String title;

}
