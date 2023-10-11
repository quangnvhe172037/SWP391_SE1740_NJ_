package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Repo.*;
import com.example.onlinequiz.Services.QuizDataService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Override
    public List<QuizData> getAllQuizData(Long id) {
        Quizzes q = new Quizzes();
        List<QuizDetail> qd;
        List<QuizData> quizData;
        System.out.println(id);

            q = quizRepository.findByQuizID(id);
            qd = quizDetailRepository.getAllByQuizzes(q);
            quizData = qd.stream()
                    .map(QuizDetail::getQuizData)
                    .collect(Collectors.toList());

        return quizData;
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



}
