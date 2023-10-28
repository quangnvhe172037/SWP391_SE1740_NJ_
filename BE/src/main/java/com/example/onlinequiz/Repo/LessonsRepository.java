package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Lessons;
import com.example.onlinequiz.Model.SubjectTopics;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonsRepository extends JpaRepository<Lessons, Long> {
    List<Lessons> findAllByTopic(SubjectTopics st);
    List<Lessons> findAllByTopicInAndStatusIsTrue(List<SubjectTopics> st);

    Lessons getLessonsByLessonIDOrderByOrder(Long id);

    Subjects findByLessonID(Long id);

}
