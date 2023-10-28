package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Lessons;
import com.example.onlinequiz.Model.Subjects;

import java.util.List;

public interface LessonService {
    List<Lessons> getLessons(Long id);

    Lessons getLessonData(Long id);

    Subjects getSubjectByLesson(Long id);

    void addNewLesson(Lessons l);
}
