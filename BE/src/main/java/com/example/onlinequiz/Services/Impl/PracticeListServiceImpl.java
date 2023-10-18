package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Repo.QuizRepository;
import com.example.onlinequiz.Repo.QuizResultRepository;
import com.example.onlinequiz.Repo.SubjectCategoriesRepository;
import com.example.onlinequiz.Services.PracticeListService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class PracticeListServiceImpl implements PracticeListService {
    @Autowired
    public final QuizResultRepository quizResultRepository;

    @Autowired
    public final QuizRepository quizRepository;

    @Autowired
    public final SubjectCategoriesRepository subjectCategoriesRepository;


    @Override
    public List<QuizResults> getListQuizResultByQuizID(Users u) {
        List<QuizResults> listQuizResult = quizResultRepository.findByUser(u);
        if (listQuizResult == null){
            return null;
        }

//        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
        return listQuizResult;

    }
}
