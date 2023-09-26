package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Subjects;

import java.util.List;

public interface SubjectService {
    List<Subjects> getAllSubject();

    Subjects getSubjectById(Long id);
}
