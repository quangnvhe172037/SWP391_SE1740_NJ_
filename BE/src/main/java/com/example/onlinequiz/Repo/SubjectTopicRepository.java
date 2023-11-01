package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Lessons;
import com.example.onlinequiz.Model.SubjectTopics;
import com.example.onlinequiz.Model.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubjectTopicRepository extends JpaRepository<SubjectTopics, Long> {
    List<SubjectTopics> getAllBySubjectAndStatusIsTrueOrderByOrder(Subjects id);

    SubjectTopics findByTopicID(Long id);


}
