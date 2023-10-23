package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Payload.Response.SubjectDetailResponse;

import java.util.List;

public interface SubjectService {
    List<Subjects> getAllSubject();

    Subjects getSubjectById(Long id);

    Subjects save(Subjects subjects);

    SubjectDetailResponse getSubjectDetail(Long userId, Long subjectId);
}
