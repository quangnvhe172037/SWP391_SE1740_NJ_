package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Lessons;

import java.util.List;

public interface LessonService {
    List<Lessons> getLessons(Long id);

    Lessons getLessonData(Long id);
}
