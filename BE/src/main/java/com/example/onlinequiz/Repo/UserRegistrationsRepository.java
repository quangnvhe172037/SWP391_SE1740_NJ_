package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.UserPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRegistrationsRepository extends JpaRepository<UserPayment, Long> {
//    List<UserPayment> findAllByBillIDOrderByStatusAsc();
}
