package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.PostCategories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostCategoryRepository extends JpaRepository<PostCategories, Integer> {
}
