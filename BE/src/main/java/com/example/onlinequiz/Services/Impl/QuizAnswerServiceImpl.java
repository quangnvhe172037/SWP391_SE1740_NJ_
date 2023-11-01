package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.QuizAnswers;
import com.example.onlinequiz.Repo.QuizAnswerRepository;
import com.example.onlinequiz.Services.QuizAnswerService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizAnswerServiceImpl implements QuizAnswerService {
    @Autowired
    private final QuizAnswerRepository quizAnswerRepository;

    @Override
    public void addNewAnswer(QuizAnswers quizAnswer) {
        quizAnswerRepository.save(quizAnswer);
    }

    @Override
    public QuizAnswers findAllByAnswerId(Long id) {
        return quizAnswerRepository.findQuizAnswersByAnswerID(id);
    }
}
