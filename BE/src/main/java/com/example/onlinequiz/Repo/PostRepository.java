package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Posts, Long> {
    List<Posts> findAllByOrderByDateCreateDesc();


}
