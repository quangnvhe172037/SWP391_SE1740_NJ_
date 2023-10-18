package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Request.QuizRequest;
import com.example.onlinequiz.Payload.Response.QuizInfoResponse;
import com.example.onlinequiz.Payload.Response.QuizInfoResponse;
import com.example.onlinequiz.Repo.*;
import com.example.onlinequiz.Services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {
    @Autowired
    private final QuizRepository quizRepository;

    @Autowired
    private final QuizDetailRepository quizDetailRepository;

    @Autowired
    private final SubjectRepository subjectRepository;

    @Autowired
    private final QuizDataRepository quizDataRepository;

    @Autowired
    private final QuizQuestionRepository quizQuestionRepository;

    @Autowired
    private final QuizAnswerRepository quizAnswerRepository;
    @Override
    public Quizzes getQuizByLessonId(Long id) {
        return quizRepository.getQuizzesByLessonid(id);
    }

    @Override
    public Quizzes getQuizById(Long id) {
        Quizzes q = quizRepository.findByQuizID(id);
        return q;
    }

    @Override
    public QuizInfoResponse getQuizInfoById(Long id) {
        Quizzes q = quizRepository.findByQuizID(id);
        int count = quizDetailRepository.countQuizDetailByQuizzes(q);
        QuizInfoResponse quizInfoResponse = new QuizInfoResponse(
                q.getQuizID(),
                q.getQuizName(),
                q.isStatus(),
                q.getDescription(),
                q.getDateCreate(),
                q.getDurationTime(),
                q.getPassRate(),
                count
        );


        return quizInfoResponse;
    }

    @Override
    public void addQuestion(QuizRequest request, String subjectName) {
        Subjects subjects = subjectRepository.findBySubjectName(subjectName);
        if (subjects == null) {
            throw new RuntimeException("Subject not found");
        }
        QuizData quizData = new QuizData();
        quizData.setSubject(subjects);
        quizDataRepository.save(quizData);

        QuizQuestions questions = new QuizQuestions();
        questions.setQuestionData(request.getQuestionData());
        questions.setQuizData(quizData);
        quizQuestionRepository.save(questions);

        List<String> answers = request.getAnswerOptions();
        String correctAnswer = request.getCorrectAnswer();
        for(String answer : answers){
            QuizAnswers quizAnswers = new QuizAnswers();
            quizAnswers.setAnswerData(answer);
            quizAnswers.setQuizData(quizData);
            quizAnswers.setTrueAnswer(answer.equals(correctAnswer));
            quizAnswerRepository.save(quizAnswers);
        }
    }
}
