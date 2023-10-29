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
        List<SubjectTopics> st = subjectTopicRepository.getAllBySubjectAndStatusIsTrueOrderByOrder(s);
        return lessonsRepository.findAllByTopicInAndStatusIsTrueOrderByOrder(st);
    }

    @Override
    public Lessons getLessonData(Long id) {

        return lessonsRepository.getLessonsByLessonID(id);
    }

    @Override
    public Subjects getSubjectByLesson(Long id) {

        return lessonsRepository.findByLessonID(id);

    }

    @Override
    public void addNewLesson(Lessons l) {
        lessonsRepository.save(l);
    }

    @Override
    public void deleteLesson(Long lessonId) {
        Lessons lesson = lessonsRepository.getLessonsByLessonID(lessonId);
        lesson.setStatus(false);
        lessonsRepository.save(lesson);


    }

    @Override
    public void updateOrderLesson(Long lessonId, Integer order, String name) {
        Lessons lesson = lessonsRepository.getLessonsByLessonID(lessonId);
        lesson.setOrder(order);
        lesson.setLessonName(name);
        lessonsRepository.save(lesson);
    }
}
