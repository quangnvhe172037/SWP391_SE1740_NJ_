package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.QuizData;
import com.example.onlinequiz.Model.QuizDetail;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Subjects;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizDataRepository  extends JpaRepository<QuizData, Long> {
//    List<QuizData> findByQuizDetail_Quizzes_quizid(Long quizid);
    List<QuizData> findAllByQuizDetailIn(List<QuizDetail> qd);


    QuizData findByQuizDetail(QuizDetail q);
    List<QuizData> findBySubject_SubjectName(String subjectName);

    List<QuizData> findBySubject(Subjects subjects);

    QuizData findQuizDataBySentenceID(Long id);


    @Query(value="select sentence_id, subject_id from quiz_data a where a.subject_id= :subject", nativeQuery=true)
    List<Object[]> findAllBySubject(Long subject);

}
