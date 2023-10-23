package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Sliders;
import com.example.onlinequiz.Model.SubjectPrice;
import com.example.onlinequiz.Model.Subjects;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectPriceRepository extends JpaRepository<SubjectPrice, Long> {
    SubjectPrice findBySubjectAndAndStatus(Subjects s, boolean b);
}
