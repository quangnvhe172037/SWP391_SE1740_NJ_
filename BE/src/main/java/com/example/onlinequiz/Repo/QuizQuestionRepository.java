package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.QuizData;
import com.example.onlinequiz.Model.QuizQuestions;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Services.QuizQuestionService;
import com.example.onlinequiz.Model.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizQuestionRepository extends JpaRepository<QuizQuestions, Long> {
    QuizQuestions getByQuizData(QuizData quizData);

    List<QuizQuestions> findByQuizData(QuizData quizData);

    QuizQuestions findQuizQuestionsByQuestionID(Long id);

}
