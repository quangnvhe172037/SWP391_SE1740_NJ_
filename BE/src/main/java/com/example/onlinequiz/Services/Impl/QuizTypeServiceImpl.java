package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.QuizTypes;
import com.example.onlinequiz.Repo.QuizTypesRepository;
import com.example.onlinequiz.Services.QuizTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizTypeServiceImpl implements QuizTypeService {
    @Autowired
    public final QuizTypesRepository quizTypesRepository;

    @Override
    public QuizTypes getQuizTypeById(Long id) {
        return quizTypesRepository.findByQuizTypeID(id);
    }
}
