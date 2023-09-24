package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Repo.SubjectsRepository;
import com.example.onlinequiz.Services.SubjectService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SubjectServiceImpl implements SubjectService {
    @Autowired
    private final SubjectsRepository subjectsRepository;
    @Override
    public List<Subjects> getAll() {
        return subjectsRepository.findAll();
    }
}
