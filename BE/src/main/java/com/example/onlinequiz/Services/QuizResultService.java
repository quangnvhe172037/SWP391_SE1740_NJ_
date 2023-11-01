package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Request.QuizSentenceSubmitRequest;
import com.example.onlinequiz.Payload.Request.UpdateQuizAnswerRequest;
import com.example.onlinequiz.Payload.Response.QuizResultResponse;
import com.example.onlinequiz.Repo.QuizResultRepository;

import java.util.Date;
import java.util.List;

public interface QuizResultService {

    QuizResultResponse getQuizResultResponse(Quizzes q, Users u);

    QuizResultResponse getUserQuizResultResponse(Long resultId);

    Long addNewQuizResult(Long quizId, Long userId);

    QuizResults getQuizResult(Long resultId);



    void updateTimeDoQuiz(QuizResults quizResult, int minute);

    String updateDataQuizResult(List<QuizSentenceSubmitRequest> quizSentenceSubmitRequestList, Long quizId, Long resultId, Long userId);
    Boolean submitDataQuizResult(List<QuizSentenceSubmitRequest> quizSentenceSubmitRequestList, Long quizId, Long resultId, Long userId);


}