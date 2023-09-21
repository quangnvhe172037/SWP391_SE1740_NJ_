package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Sliders;
import com.example.onlinequiz.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SliderRepository extends JpaRepository<Sliders, Long> {


    Sliders findBySliderID(int id);

    void deleteBySliderID(int id);
}
