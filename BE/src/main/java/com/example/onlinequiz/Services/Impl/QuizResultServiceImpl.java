package com.example.onlinequiz.Services.Impl;

import ch.qos.logback.classic.pattern.DateConverter;
import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Request.QuizSentenceSubmitRequest;
import com.example.onlinequiz.Payload.Request.UpdateQuizAnswerRequest;
import com.example.onlinequiz.Payload.Response.QuizResultResponse;
import com.example.onlinequiz.Repo.*;
import com.example.onlinequiz.Services.QuizResultService;
import com.example.onlinequiz.Services.QuizService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
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
    private final QuizAnswerRepository quizAnswerRepository;
    @Autowired
    private final QuizDetailRepository quizDetailRepository;
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final QuizDataRepository quizDataRepository;
    @Autowired
    private final QuizResultDetailRepository quizResultDetailRepository;


    @Override
    public QuizResultResponse getQuizResultResponse(Quizzes q, Users u) {
        QuizResults qr = quizResultRepository.findFirstByQuizzesAndUserOrderByScoreDesc(q, u);
        if (qr == null) {
            return null;
        }


        SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy 'at' hh:mm a", Locale.ENGLISH);
        String formattedDate = dateFormat.format(qr.getDateTaken());

        QuizResultResponse result = new QuizResultResponse(qr.getResultID(), qr.getScore(), formattedDate, qr.getQuizzes().getQuizID(), qr.getCorrectAnswer(), qr.getNullAnswer(), qr.getFalseAnswer(), qr.getIsPass());
        return result;
    }

    @Override
    public QuizResultResponse getUserQuizResultResponse(Long resultId) {
        QuizResults qr = quizResultRepository.findByResultID(resultId);
        if (qr == null) {
            return null;
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("MMMM d, yyyy 'at' hh:mm a", Locale.ENGLISH);
        String formattedDate = dateFormat.format(qr.getDateTaken());

        QuizResultResponse result = new QuizResultResponse(qr.getResultID(), qr.getScore(), formattedDate, qr.getQuizzes().getQuizID(), qr.getCorrectAnswer(), qr.getNullAnswer(), qr.getFalseAnswer(), qr.getIsPass());
        return result;
    }

    // Add new quiz result when user start exam
    @Override
    public Long addNewQuizResult(Long quizId, Long userId) {
        try {
            Users user = userRepository.getById(userId);
            Quizzes quiz = quizRepository.findByQuizID(quizId);

            QuizResults quizResult = new QuizResults();

            List<QuizDetail> quizDetailList = quizDetailRepository.findAllByQuizzes(quiz);


            quizResult.setQuizzes(quiz);
            quizResult.setUser(user);
            quizResultRepository.save(quizResult);

            for (QuizDetail quizDetail : quizDetailList) {
                QuizResultDetail quizResultDetail = new QuizResultDetail();
                quizResultDetail.setQuizResult(quizResult);
                quizResultDetail.setQuizData(quizDetail.getQuizData());
                quizResultDetailRepository.save(quizResultDetail);
            }
            return quizResult.getResultID();
        } catch (Exception e) {
            System.out.println("Add new Quiz Result - QuizResultService: " + e.getMessage());
        }


        return null;
    }

    @Override
    public QuizResults getQuizResult(Long resultId) {
        return quizResultRepository.findByResultID(resultId);
    }


    @Override
    public void updateTimeDoQuiz(QuizResults quizResult, int minutesToAdd) {
        Date currentDate = new Date();
        quizResult.setDateTaken(currentDate);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        calendar.add(Calendar.MINUTE, minutesToAdd);
        if (quizResult.getDateEnd() == null) {
            quizResult.setDateEnd(calendar.getTime());
        }

        quizResultRepository.save(quizResult);
    }

    @Override
    public String updateDataQuizResult(List<QuizSentenceSubmitRequest> quizSentenceSubmitList, Long quizId, Long resultId, Long userId) {
        try {
            Users user = userRepository.getById(userId);
            Quizzes quiz = quizRepository.findByQuizID(quizId);

            QuizResults quizResult = quizResultRepository.findByResultID(resultId);

            if (quizResult.getUser().getId() != userId) {
                return null;
            }

            List<QuizResultDetail> quizResultDetailList = quizResultDetailRepository.findAllByQuizResult(quizResult);
            for (QuizSentenceSubmitRequest quizSentenceSubmit : quizSentenceSubmitList) {
                QuizResultDetail quizResultDetail = quizResultDetailRepository.findQuizResultDetailByQuizDataAndAndQuizResult(quizDataRepository.findQuizDataBySentenceID(quizSentenceSubmit.getSentenceId()), quizResult);
                if (quizResult.getDateEnd().after(quizSentenceSubmit.getTimeSubmit()) && quizAnswerRepository.findQuizAnswersByAnswerID(quizSentenceSubmit.getUserAnswer()) != null) {
                    quizResultDetail.setUserAnswer(quizAnswerRepository.findQuizAnswersByAnswerID(quizSentenceSubmit.getUserAnswer()));
                }
            }
            return "Update success";
        } catch (Exception e) {
            System.out.println("QuizResultServiceImpl - updateDataQuizResult" + e.getMessage());
        }
        return null;

    }

    @Override
    public Boolean submitDataQuizResult(List<QuizSentenceSubmitRequest> quizSentenceSubmitList, Long quizId, Long resultId, Long userId) {
        try {
            Users user = userRepository.getById(userId);
            Quizzes quiz = quizRepository.findByQuizID(quizId);

            QuizResults quizResult = quizResultRepository.findByResultID(resultId);
            quizResult.setIsDone(true);
            List<QuizResultDetail> quizResultDetailList = quizResultDetailRepository.findAllByQuizResult(quizResult);
            for (QuizSentenceSubmitRequest quizSentenceSubmit : quizSentenceSubmitList) {
                QuizResultDetail quizResultDetail = quizResultDetailRepository.findQuizResultDetailByQuizDataAndAndQuizResult(quizDataRepository.findQuizDataBySentenceID(quizSentenceSubmit.getSentenceId()), quizResult);
                if (quizResult.getDateEnd().after(quizSentenceSubmit.getTimeSubmit()) && quizAnswerRepository.findQuizAnswersByAnswerID(quizSentenceSubmit.getUserAnswer()) != null) {
                    quizResultDetail.setUserAnswer(quizAnswerRepository.findQuizAnswersByAnswerID(quizSentenceSubmit.getUserAnswer()));
                }
            }

            if (submitUserExam(quizResultDetailList, quizResult, quiz)) {
                return true;
            }


        } catch (Exception e) {
            System.out.println("QuizResultServiceImpl - updateDataQuizResult" + e.getMessage());
            return null;
        }
        return false;
    }


    private Boolean submitUserExam(List<QuizResultDetail> quizResultDetailList, QuizResults quizResult, Quizzes quiz) {
        int correctAnswer = 0;
        int nullAnswer = 0;
        int falseAnswer = 0;
        int score = 0;
        Boolean isPass = null;
        QuizAnswers quizAnswer, userAnswer;

        try {
            for (QuizResultDetail quizResultDetail : quizResultDetailList
            ) {

                userAnswer = quizResultDetail.getUserAnswer();
                if (userAnswer == null) {
                    nullAnswer++;
                }else if (userAnswer.isTrueAnswer()) {
                    correctAnswer++;
                }else if (!userAnswer.isTrueAnswer()) {
                    falseAnswer++;
                }
            }

            quizResult.setCorrectAnswer(correctAnswer);
            quizResult.setFalseAnswer(falseAnswer);
            quizResult.setNullAnswer(nullAnswer);
            score = (int)Math.round (((double)correctAnswer / quizResultDetailList.size()) * 100);
            quizResult.setScore(score);
            if (score >= quiz.getPassRate()) {
                quizResult.setIsPass(true);
            } else {
                quizResult.setIsPass(false);
            }
            System.out.println(correctAnswer);
            System.out.println(quizResultDetailList.size());
            System.out.println(score);
            System.out.println(isPass);
            quizResultRepository.save(quizResult);
            return true;
        } catch (Exception e) {
            System.out.println("QuizResultServiceImpl - submitUserExam" + e.getMessage());
            return false;
        }


    }
}
