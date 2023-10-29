package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.SubjectTopics;
import com.example.onlinequiz.Model.Subjects;

import java.util.List;

public interface SubjectTopicService {
    List<SubjectTopics> getTopics(Long id);

    SubjectTopics getSubjectTopic(Long id);

    void deleteSubjectTopic(Long subjectTopicId);

    void updateOrderSubjectTopic(Long subjectTopicId, Integer order, String name);

    void addNewSubjectTopic(Long subjectId, String topicName, Integer order);

    void updateSubjectTopic(Long subjectTopicId, String topicName, Integer order);


}
