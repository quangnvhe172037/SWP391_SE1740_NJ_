package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.QuizResultResponse;
import com.example.onlinequiz.Repo.QuizResultRepository;
import com.example.onlinequiz.Services.QuizResultService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizResultServiceImpl implements QuizResultService {

    @Autowired
    private final QuizResultRepository quizResultRepository;

    @Override
    public QuizResultResponse getQuizResult(Quizzes q, Users u) {
        QuizResults qr = quizResultRepository.findByQuizzesAndUser(q, u);
        QuizResultResponse result = new QuizResultResponse(
                qr.getResultID(),
                qr.getScore(),
                qr.getDateTaken(),
                qr.getQuizzes().getQuizID(),
                qr.getCorrectAnswer(),
                qr.getNullAnswer(),
                qr.getFalseAnswer()
        );
        return result;
    }
}
