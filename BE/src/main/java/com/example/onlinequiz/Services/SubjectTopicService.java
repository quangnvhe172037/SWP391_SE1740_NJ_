package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.SubjectTopics;
import com.example.onlinequiz.Model.Subjects;

import java.util.List;

public interface SubjectTopicService {
    List<SubjectTopics> getTopics(Long id);
}
