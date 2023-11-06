package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.QuizResultDetail;
import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.Users;

import java.util.List;

public interface PracticeListService {
    List<QuizResults> getListQuizResultByQuizID(Users u);

    List<QuizResults> getListQuizResultDetail(Users u, Subjects s);

    QuizResults getQuizResultByQuizId(Long resultid);

    void deleteQuizResult(Long resultId);

    void deleteQuizResultDetail(QuizResultDetail result);
}
