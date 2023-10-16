package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.QuizData;
import com.example.onlinequiz.Model.QuizDetail;
import com.example.onlinequiz.Model.Quizzes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizDetailRepository  extends JpaRepository<QuizDetail, Long> {
//    QuizDetail getByQuizID(Long id);

    int countQuizDetailByQuizzes(Quizzes q);
    List<QuizDetail> getAllByQuizzes(Quizzes q);
//    List<QuizDetail> getAllByQuizID(Long id);


}
