package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Repo.SliderRepository;
import com.example.onlinequiz.Repo.SubjectRepository;
import com.example.onlinequiz.Services.SubjectService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SubjectServiceImp implements SubjectService {

    @Autowired
    private final SubjectRepository subjectRepository;

    @Override
    public List<Subjects> getAllSubject() {
        return subjectRepository.findAll();
    }

    @Override
    public Subjects getSubjectById(Long id) {
        return subjectRepository.getSubjectsBySubjectID(id);
    }

    @Override
    public Subjects save(Subjects subjects) {
        return subjectRepository.save(subjects);
    }
}
