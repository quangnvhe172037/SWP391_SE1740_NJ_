package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.QuizResultDetail;
import com.example.onlinequiz.Model.QuizResults;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Repo.QuizRepository;
import com.example.onlinequiz.Repo.QuizResultDetailRepository;
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

    @Autowired
    public final QuizResultDetailRepository quizResultDetailRepository;


    @Override
    public List<QuizResults> getListQuizResultByQuizID(Users u) {
        List<QuizResults> listQuizResult = quizResultRepository.findByUser(u);
        if (listQuizResult == null){
            return null;
        }

//        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy", Locale.ENGLISH);
        return listQuizResult;

    }

    @Override
    public List<QuizResults> getListQuizResultDetail(Users u, Subjects s) {
        List<QuizResults> quizResultsList = quizResultRepository.findByUserAndQuizzes_Subject(u,s);
        if(quizResultsList == null){
            System.out.println("error");
            return null;
        }
        return quizResultsList;
    }

    @Override
    public QuizResults getQuizResultByQuizId(Long resultid) {
        try{
            QuizResults quizResults = quizResultRepository.findByResultID(resultid);
            if(quizResults == null){
                throw  new RuntimeException("Quiz result not found");
            }else{
                return quizResults;
            }
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public void deleteQuizResult(Long resultId) {
        quizResultRepository.deleteById(resultId);
    }

    @Override
    public void deleteQuizResultDetail(QuizResultDetail result) {
        quizResultDetailRepository.deleteByQuizResult(result);
    }

}
