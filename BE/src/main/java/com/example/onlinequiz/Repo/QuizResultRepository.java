package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResults, Long> {
        QuizResults findFirstByQuizzesAndUserOrderByResultIDDesc(Quizzes q, Users u);

        QuizResults findFirstByQuizzesAndUserOrderByScoreDesc(Quizzes q, Users u);

        List<QuizResults> findByUser(Users u);

        List<QuizResults> findByUserAndQuizzes_Subject(Users u, Subjects s);


        QuizResults findByResultID(Long resultId);




}
