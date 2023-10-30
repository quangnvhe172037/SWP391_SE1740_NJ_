package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.QuizQuestions;
import com.example.onlinequiz.Repo.QuizQuestionRepository;
import com.example.onlinequiz.Services.QuizQuestionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizQuestionServiceImpl implements QuizQuestionService {
    @Autowired
    private final QuizQuestionRepository quizQuestionRepository;

    @Override
    public void addNewQuestion(QuizQuestions quizQuestion) {
        quizQuestionRepository.save(quizQuestion);
    }

    @Override
    public QuizQuestions findByQuestionId(Long id) {
        return quizQuestionRepository.findQuizQuestionsByQuestionID(id);
    }
}
