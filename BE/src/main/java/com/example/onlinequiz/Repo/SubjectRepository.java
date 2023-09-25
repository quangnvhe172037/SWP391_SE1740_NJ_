package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subjects, Integer> {
    Subjects getSubjectsBySubjectID(Long id);
}
