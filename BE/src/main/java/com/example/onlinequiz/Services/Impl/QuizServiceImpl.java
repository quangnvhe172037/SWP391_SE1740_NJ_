package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Request.DeleteQuestRequest;
import com.example.onlinequiz.Payload.Request.QuizRequest;
import com.example.onlinequiz.Payload.Response.QuizInfoResponse;
import com.example.onlinequiz.Payload.Response.QuizInfoResponse;
import com.example.onlinequiz.Payload.Response.QuizSentenceResponse;
import com.example.onlinequiz.Repo.*;
import com.example.onlinequiz.Services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
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
    public void addQuestion(QuizRequest request, Long subjectName) {
        Subjects subjects = subjectRepository.getSubjectsBySubjectID(subjectName);
        if (subjects == null) {
            throw new RuntimeException("Subject not found");
        }
        QuizData quizData = new QuizData();
        quizData.setSubject(subjects);
        quizDataRepository.save(quizData);

        QuizQuestions questions = new QuizQuestions();
        questions.setQuestionData(request.getQuestion());
        questions.setQuizData(quizData);
        quizQuestionRepository.save(questions);

        List<String> answers = request.getAnswerOptions();
        String correctAnswer = request.getCorrectAnswer();
        String explaination = request.getExplanation();
        for (int i = 0; i < answers.size(); i++) {
            String answer = answers.get(i);
            QuizAnswers quizAnswers = new QuizAnswers();
            quizAnswers.setAnswerData(answer);
            quizAnswers.setQuizData(quizData);

            quizAnswers.setTrueAnswer("A".equalsIgnoreCase(correctAnswer) && i == 0 ||
                    "B".equalsIgnoreCase(correctAnswer) && i == 1 ||
                    "C".equalsIgnoreCase(correctAnswer) && i == 2 ||
                    "D".equalsIgnoreCase(correctAnswer) && i == 3);
            if (quizAnswers.isTrueAnswer()) {
                quizAnswers.setExplanation(explaination);
            }
            quizAnswerRepository.save(quizAnswers);
        }
    }

    @Override
    public List<QuizDetail> getQuizDetailByQuiz(Quizzes q) {
        return quizDetailRepository.getAllByQuizzes(q);
    }

    @Override
    public List<QuizSentenceResponse> getListQuizDataByQuizDetail(List<QuizDetail> qd) {
        try {
            List<QuizData> quizDataList = quizDataRepository.getAllByQuizDetailIsIn(qd);

            List<QuizSentenceResponse> data = new ArrayList<>();
            for (QuizData quizData : quizDataList
            ) {
                data.add(new QuizSentenceResponse(
                        quizData.getSentenceID(),
                        quizData.getQuizAnswers(),
                        quizData.getQuizQuestions()
                ));
            }

            return data;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }

    }

    @Override
    public void addNewQuiz(Quizzes q) {
        quizRepository.save(q);
    }
    public void deleteQuestion(DeleteQuestRequest request) {
        QuizData quizData = quizDataRepository.findQuizDataBySentenceID(request.getQuesId());
        if(quizData != null){
            QuizQuestions question = quizQuestionRepository.findQuizQuestionsByQuestionID(quizData.getQuizQuestions().getQuestionID());
            if(question != null){
                List<QuizAnswers> answers = quizAnswerRepository.findByQuizData(quizData);
                for(QuizAnswers quizAnswers : answers){
                    quizAnswerRepository.delete(quizAnswers);
                }
                quizQuestionRepository.delete(question);
                quizDataRepository.delete(quizData);
            } else {
                throw new RuntimeException("Question not found");
            }
        } else {
            throw new RuntimeException("Subject not found");
        }
    }
}
