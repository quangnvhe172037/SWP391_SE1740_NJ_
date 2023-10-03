package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.SubjectCategories;
import com.example.onlinequiz.Repo.SubjectCategoriesRepository;
import com.example.onlinequiz.Services.CategorySubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategorySubjectService {
    @Autowired
    private SubjectCategoriesRepository subjectCategoriesRepository;
    @Override
    public List<SubjectCategories> getAll() {
        return subjectCategoriesRepository.findAll();
    }
}
