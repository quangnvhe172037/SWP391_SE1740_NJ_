package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.SubjectCategories;
import org.springframework.data.jpa.repository.JpaRepository;
// Day la chu thich cho SubjectCategoriesRepo
public interface SubjectCategoriesRepository extends JpaRepository<SubjectCategories, Integer> {
}
