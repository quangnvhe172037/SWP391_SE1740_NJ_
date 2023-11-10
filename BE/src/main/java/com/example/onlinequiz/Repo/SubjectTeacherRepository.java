package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.SubjectTeachers;
import com.example.onlinequiz.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectTeacherRepository extends JpaRepository<SubjectTeachers, Long> {

    List<SubjectTeachers> findAllByExpert(Users expert);
}
