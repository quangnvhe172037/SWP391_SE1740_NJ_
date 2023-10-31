package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Response.QuestionResponse;
import com.example.onlinequiz.Repo.*;
import com.example.onlinequiz.Services.QuizDataService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizDataServiceImpl implements QuizDataService {
    @Autowired
    private final QuizDetailRepository quizDetailRepository;

    @Autowired
    private final QuizDataRepository quizDataRepository;

    @Autowired
    private final QuizRepository quizRepository;

    @Autowired
    private final QuizAnswerRepository quizAnswerRepository;

    @Autowired
    private final QuizQuestionRepository quizQuestionRepository;

    @Autowired
    private final SubjectRepository subjectRepository;

    @Override
    public List<QuizData> getAllQuizData(Long id) {
        Quizzes q = new Quizzes();
        List<QuizDetail> qd;
        List<QuizData> quizData;

        q = quizRepository.findByQuizID(id);
        qd = quizDetailRepository.getAllByQuizzes(q);

//        quizData = qd.stream()
//                .map(QuizDetail::getQuizData)
//                .collect(Collectors.toList());
        quizData = quizDataRepository.getAllByQuizDetailIsIn(qd);
        return quizData;
    }

    @Override
    public void addNewQuizData(QuizData quizData) {
        quizDataRepository.save(quizData);
    }

    @Override
    public List<QuestionResponse> getQuestionBySubjectName(Long subjectName) {
        Subjects subject = subjectRepository.getSubjectsBySubjectID(subjectName);
        if (subject == null) {
            return new ArrayList<>();
        }

        List<QuizData> quizDataList = quizDataRepository.findBySubject(subject);
        List<QuestionResponse> questionResponses = new ArrayList<>();

        for (QuizData quizData : quizDataList) {
            List<QuizAnswers> quizAnswers = quizAnswerRepository.findByQuizData(quizData);
            List<String> answerOptions = new ArrayList<>();
            String explanation = null;
            String correctAnswer = ""; // Để lưu trữ câu trả lời đúng

            for (int i = 0; i < quizAnswers.size(); i++) {
                answerOptions.add(quizAnswers.get(i).getAnswerData());
                if (quizAnswers.get(i).isTrueAnswer()) {
                    // Ánh xạ câu trả lời đúng thành A, B, C, D
                    correctAnswer = Character.toString((char) ('A' + i));
                    explanation = quizAnswers.get(i).getExplanation();
                }
            }

            List<QuizQuestions> quizQuestions = quizQuestionRepository.findByQuizData(quizData);

            // Kiểm tra xem danh sách câu hỏi có ít nhất một câu hỏi hay không
            if (!quizQuestions.isEmpty()) {
                String questionData = quizQuestions.get(0).getQuestionData(); // Lấy câu hỏi đầu tiên

                QuestionResponse questionResponse = new QuestionResponse(quizData.getSentenceID(), questionData, answerOptions, explanation, correctAnswer);
                questionResponses.add(questionResponse);
            }
        }

        return questionResponses;
    }

    @Override
    public QuizData findById(Long id) {
        return quizDataRepository.findQuizDataBySentenceID(id);
    }

}

//    @Override
//    public Object getQuizData(Long id) {
//        QuizData quizData = quizDataRepository.getReferenceById(id);
//        QuizQuestions question = quizQuestionRepository.getByQuizData(quizData);
//        List<QuizAnswers> answers = quizAnswerRepository.getQuizAnswersByQuizData(quizData);
//
//
//        return;
//    }

