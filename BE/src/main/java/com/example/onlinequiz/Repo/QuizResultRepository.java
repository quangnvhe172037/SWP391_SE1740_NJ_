package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Sliders;
import com.example.onlinequiz.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizResultRepository extends JpaRepository<QuizResults, Long> {
        QuizResults findByQuizzesAndUser(Quizzes q, Users u);

        List<QuizResults> findByUser(Users u);

}
