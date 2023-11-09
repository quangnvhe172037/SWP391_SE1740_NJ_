package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface UserRegistrationsRepository extends JpaRepository<UserPayment, Long> {
        List<UserPayment> findByUsersAndStatus(Users u, boolean status);

        UserPayment findByBillID(int BillID);

        UserPayment save(UserPayment userPayment);
}
