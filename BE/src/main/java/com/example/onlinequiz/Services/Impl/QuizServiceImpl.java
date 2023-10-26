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

//    @Override
//    public List<QuizRequest> getQuestionsBySubjectName(String subjectName) {
//        // Sử dụng subjectRepository để tìm môn học dựa trên tên
//        Subjects subject = subjectRepository.findBySubjectName(subjectName);
//
//        if (subject != null) {
//            // Sử dụng quizDataRepository để lấy danh sách câu hỏi dựa trên môn học
//            List<QuizData> quizDataList = quizDataRepository.findBySubjectId(subject);
//
//            List<QuizRequest> questions = new ArrayList<>();
//
//            // Lặp qua danh sách câu hỏi và tạo các đối tượng QuizRequest
//            for (QuizData quizData : quizDataList) {
//                List<QuizQuestions> quizQuestionsList = quizQuestionRepository.findByQuizData(quizData);
//
//                for (QuizQuestions question : quizQuestionsList) {
//                    List<QuizAnswers> answers = quizAnswerRepository.findByQuizData(quizData);
//
//                    QuizRequest quizRequest = new QuizRequest();
//                    quizRequest.setQuestionData(question.getQuestionData());
//
//                    List<String> answerOptions = new ArrayList<>();
//                    String correctAnswer = "";
//
//                    for (int i = 0; i < answers.size(); i++) {
//                        answerOptions.add(answers.get(i).getAnswerData());
//                        if (answers.get(i).isTrueAnswer()) {
//                            if (i == 0) {
//                                correctAnswer = "A";
//                            } else if (i == 1) {
//                                correctAnswer = "B";
//                            } else if (i == 2) {
//                                correctAnswer = "C";
//                            } else if (i == 3) {
//                                correctAnswer = "D";
//                            }
//                            quizRequest.setExplanation(answers.get(i).getExplanation());
//                        }
//                    }
//
//                    quizRequest.setAnswerOptions(answerOptions);
//                    quizRequest.setCorrectAnswer(correctAnswer);
//
//                    questions.add(quizRequest);
//                }
//            }
//
//            return questions;
//        } else {
//            // Trả về danh sách rỗng nếu không tìm thấy môn học
//            return Collections.emptyList();
//        }
//    }
}
