package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.QuizDetail;
import com.example.onlinequiz.Model.QuizResultDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizResultDetailRepository extends JpaRepository<QuizResultDetail, Long> {
}
