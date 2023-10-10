package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Lessons;
import com.example.onlinequiz.Model.Quizzes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuizRepository extends JpaRepository<Quizzes, Long> {
    Quizzes getQuizzesByLessonid(Long id);
}
