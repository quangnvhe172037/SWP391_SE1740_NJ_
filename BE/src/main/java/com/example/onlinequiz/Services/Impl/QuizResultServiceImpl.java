package com.example.onlinequiz.Services.Impl;

import ch.qos.logback.classic.pattern.DateConverter;
import com.example.onlinequiz.Model.QuizResultDetail;
import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.QuizResultResponse;
import com.example.onlinequiz.Repo.QuizRepository;
import com.example.onlinequiz.Repo.QuizResultDetailRepository;
import com.example.onlinequiz.Repo.QuizResultRepository;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Services.QuizResultService;
import com.example.onlinequiz.Services.QuizService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizResultServiceImpl implements QuizResultService {

    @Autowired
    private final QuizResultRepository quizResultRepository;

    @Autowired
    private final QuizRepository quizRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final QuizResultDetailRepository quizResultDetailRepository;


    @Override
    public QuizResultResponse getQuizResult(Quizzes q, Users u) {
        QuizResults qr = quizResultRepository.findByQuizzesAndUser(q, u);
        if(qr == null){
            return null;
        }


        SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy 'at' hh:mm a", Locale.ENGLISH);
        String formattedDate = dateFormat.format(qr.getDateTaken());

        QuizResultResponse result = new QuizResultResponse(
                qr.getResultID(),
                qr.getScore(),
                formattedDate,
                qr.getQuizzes().getQuizID(),
                qr.getCorrectAnswer(),
                qr.getNullAnswer(),
                qr.getFalseAnswer(),
                qr.getIsPass()
        );
        return result;
    }

    // Add new quiz result when user start exam
    @Override
    public void addNewQuizResult(Long quizId, Long userId) {
        Users user = userRepository.getById(userId);
        Quizzes quiz = quizRepository.findByQuizID(quizId);

        QuizResults quizResult = new QuizResults();
        quizResult.setQuizzes(quiz);
        quizResult.setUser(user);
        quizResult.setDateTaken(new Date());
        quizResultRepository.save(quizResult);

        QuizResultDetail quizResultDetail = new QuizResultDetail();
        quizResultDetail.setQuizResult(quizResult);
        quizResultDetailRepository.save(quizResultDetail);
    }
}
