package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.UserPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRegistrationsRepository extends JpaRepository<UserPayment, Long> {
}
