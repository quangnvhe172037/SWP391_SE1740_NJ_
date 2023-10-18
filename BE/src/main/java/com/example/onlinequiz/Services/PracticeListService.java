package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.Users;

import java.util.List;

public interface PracticeListService {
    List<QuizResults> getListQuizResultByQuizID(Users u);


}
