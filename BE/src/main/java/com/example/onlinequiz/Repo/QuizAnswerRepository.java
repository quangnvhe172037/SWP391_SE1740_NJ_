package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.QuizAnswers;
import com.example.onlinequiz.Model.QuizData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizAnswerRepository extends JpaRepository<QuizAnswers, Long> {
    List<QuizAnswers> getQuizAnswersByQuizData(QuizData quizData);
}
