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
    @Column(name = "post_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postID;

    @Column(name = "post_data", columnDefinition = "TEXT")
    private String postData;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_cate_id")
    private PostCategories postCategory;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "image", length = 256)
    private String image;

    @Column(name = "date_create")
    private Date dateCreate;

    private boolean status;

    @Column(name = "update_date")
    private Date updateDate;

    @Column(name = "brief_info", columnDefinition = "TEXT")
    private String briefInfor;

    @Column(name = "title", length = 256, columnDefinition = "VARCHAR(256) CHARACTER SET utf8mb4")
    private String title;

}