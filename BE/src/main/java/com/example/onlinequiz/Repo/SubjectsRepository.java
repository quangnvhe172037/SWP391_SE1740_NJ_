package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectsRepository extends JpaRepository<Subjects, Long> {
    Subjects findBySubjectID(Long subjectId);
}
