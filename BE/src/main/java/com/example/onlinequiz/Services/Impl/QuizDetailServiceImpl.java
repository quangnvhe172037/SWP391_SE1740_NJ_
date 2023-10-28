package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.QuizDetail;
import com.example.onlinequiz.Repo.QuizDetailRepository;
import com.example.onlinequiz.Services.QuizDetailService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class QuizDetailServiceImpl implements QuizDetailService {
    @Autowired
    private final QuizDetailRepository quizDetailRepository;

    @Override
    public void addNewQuizDetail(QuizDetail quizDetail) {
        quizDetailRepository.save(quizDetail);
    }
}
