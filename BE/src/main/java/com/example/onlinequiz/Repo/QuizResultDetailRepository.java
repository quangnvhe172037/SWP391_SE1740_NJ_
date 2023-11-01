package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.QuizData;
import com.example.onlinequiz.Model.QuizDetail;
import com.example.onlinequiz.Model.QuizResultDetail;
import com.example.onlinequiz.Model.QuizResults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultDetailRepository extends JpaRepository<QuizResultDetail, Long> {

    QuizResultDetail findQuizResultDetailByQuizDataAndQuizResult(QuizData quizData, QuizResults quizResult);

    List<QuizResultDetail> findAllByQuizResult(QuizResults quizResult);
    QuizResultDetail findQuizResultDetailByQuizDataAndAndQuizResult(QuizData quizData, QuizResults quizResult);

    List<QuizResultDetail> findAllByQuizData(QuizData quizData);
}
