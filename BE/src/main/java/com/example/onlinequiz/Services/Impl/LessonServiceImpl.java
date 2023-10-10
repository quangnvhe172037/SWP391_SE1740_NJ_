package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.Lessons;
import com.example.onlinequiz.Model.SubjectTopics;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Repo.LessonsRepository;
import com.example.onlinequiz.Repo.SubjectRepository;
import com.example.onlinequiz.Repo.SubjectTopicRepository;
import com.example.onlinequiz.Services.LessonService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonServiceImpl implements LessonService {
    @Autowired
    private final LessonsRepository lessonsRepository;

    @Autowired
    private final SubjectTopicRepository subjectTopicRepository;

    @Autowired
    private final SubjectRepository subjectRepository;

    @Override
    public List<Lessons> getLessons(Long id) {
        Subjects s = subjectRepository.getSubjectsBySubjectID(id);
        List<SubjectTopics> st = subjectTopicRepository.getAllBySubject(s);
        return lessonsRepository.findAllByTopicIn(st);
    }
}
