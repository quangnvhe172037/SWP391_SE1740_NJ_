package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostListResponse {
    private Long postId;
    private int postCategoryId;
    private String title;
    private boolean status;
    private String image;
    private String updateDate;
    private String postCateName;
    private String brief;
}
