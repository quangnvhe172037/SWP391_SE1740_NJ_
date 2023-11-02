package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.QuizTypes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizTypesRepository extends JpaRepository<QuizTypes, Long> {
    QuizTypes findByQuizTypeID(Long id);
}
