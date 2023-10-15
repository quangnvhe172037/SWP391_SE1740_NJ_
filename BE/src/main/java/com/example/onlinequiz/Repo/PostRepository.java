package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Posts;
import com.example.onlinequiz.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Posts, Long> {
    List<Posts> findAllByOrderByDateCreateDesc();


    Posts findPostsByPostID(Long postId);

    List<Posts> findPostsByPostCategory(Integer cateId);
//    void getPostsByUser

    List<Posts> findPostsByUser(Users u);
}
