package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Repo.QuizRepository;
import com.example.onlinequiz.Services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {
    @Autowired
    private final QuizRepository quizRepository;

    @Override
    public Quizzes getQuizById(Long id) {
        return quizRepository.getQuizzesByLessonid(id);
    }
}
