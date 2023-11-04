package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.QuizData;
import com.example.onlinequiz.Model.QuizDetail;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizDataRepository  extends JpaRepository<QuizData, Long> {
//    List<QuizData> findByQuizDetail_Quizzes_quizid(Long quizid);
    List<QuizData> getAllByQuizDetailIsIn(List<QuizDetail> qd);


    List<QuizData> findBySubject_SubjectName(String subjectName);

    List<QuizData> findBySubject(Subjects subjects);

    QuizData findQuizDataBySentenceID(Long id);

    List<QuizData> findAllBySubject(Subjects subject);

}
