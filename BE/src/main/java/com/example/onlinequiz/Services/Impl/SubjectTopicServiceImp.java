package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.SubjectTopics;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Repo.SubjectRepository;
import com.example.onlinequiz.Repo.SubjectTopicRepository;
import com.example.onlinequiz.Services.LessonService;
import com.example.onlinequiz.Services.SubjectTopicService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SubjectTopicServiceImp implements SubjectTopicService {
    @Autowired
    private final SubjectTopicRepository subjectTopicRepository;

    @Autowired
    private final SubjectRepository subjectRepository;

    @Override
    public List<SubjectTopics> getTopics(Long id) {
        Subjects s = subjectRepository.getSubjectsBySubjectID(id);

        return subjectTopicRepository.getAllBySubjectAndStatusIsTrueOrderByOrder(s);
    }

    @Override
    public SubjectTopics getSubjectTopic(Long id) {

        return subjectTopicRepository.findByTopicID(id);
    }

    @Override
    public void deleteSubjectTopic(Long subjectTopicId) {
        SubjectTopics subjectTopic = subjectTopicRepository.findByTopicID(subjectTopicId);
        subjectTopic.setStatus(false);
        subjectTopicRepository.save(subjectTopic);

    }

    @Override
    public void updateOrderSubjectTopic(Long subjectTopicId, Integer order, String name) {
        SubjectTopics subjectTopic = subjectTopicRepository.findByTopicID(subjectTopicId);
        subjectTopic.setOrder(order);
        subjectTopic.setTopicName(name);
        subjectTopicRepository.save(subjectTopic);
    }

    @Override
    public void addNewSubjectTopic(Long subjectId, String topicName, Integer order) {
        Subjects subject = subjectRepository.getSubjectsBySubjectID(subjectId);
        SubjectTopics topic = new SubjectTopics();
        topic.setTopicName(topicName);
        topic.setOrder(order);
        topic.setSubject(subject);

        subjectTopicRepository.save(topic);
    }

    @Override
    public void updateSubjectTopic(Long subjectTopicId, String topicName, Integer order) {
        SubjectTopics subjectTopic = subjectTopicRepository.findByTopicID(subjectTopicId);
        subjectTopic.setOrder(order);
        subjectTopic.setTopicName(topicName);
        subjectTopicRepository.save(subjectTopic);
    }
}
