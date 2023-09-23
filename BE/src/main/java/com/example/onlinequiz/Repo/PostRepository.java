package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Posts, Long> {
    List<Posts> findAllByOrderByDateCreateDesc();

<<<<<<< HEAD
    Posts findPostsByPostID(Long postId);
=======
    void getPostsByUser
>>>>>>> ea7fc8cd99807ef98212ec9d8e0565e6e6f9ff88
}
