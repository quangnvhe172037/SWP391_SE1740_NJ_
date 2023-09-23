package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.PostCategories;
import com.example.onlinequiz.Model.Posts;

import java.util.List;

public interface PostService {
    List<PostCategories> getAllPostCate();

    List<Posts> getAllPosts();

    List<Posts> getAllPostsSortByDate();

    List<Posts> getRandomPosts(int numberOfPosts);
//    void addPost(Posts post);
}
