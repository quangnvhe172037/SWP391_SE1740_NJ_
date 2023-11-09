package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubjectRepository extends JpaRepository<Subjects, Integer> {
    Subjects getSubjectsBySubjectID(Long id);

    Subjects findBySubjectName(String subjectName);

    @Query(value = "Select * from subject where subject_id in (select subject_id from wish_list where userid = ?1)",nativeQuery = true)
    List<Subjects> getSubjectsByWishList(Long id);

}
