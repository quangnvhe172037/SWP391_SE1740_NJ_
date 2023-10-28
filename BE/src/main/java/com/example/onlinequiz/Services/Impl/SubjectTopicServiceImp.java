package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.SubjectTopics;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Repo.SubjectRepository;
import com.example.onlinequiz.Repo.SubjectTopicRepository;
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

        return subjectTopicRepository.getAllBySubjectOrderByOrder(s);
    }

    @Override
    public SubjectTopics getSubjectTopic(Long id) {

        return subjectTopicRepository.getById(id);
    }
}
