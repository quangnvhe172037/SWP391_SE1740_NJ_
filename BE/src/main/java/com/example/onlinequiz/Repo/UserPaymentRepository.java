package com.example.onlinequiz.Repo;


import com.example.onlinequiz.Model.SubjectPrice;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserPaymentRepository extends JpaRepository<UserPayment, Long> {

    boolean existsBySubjectAndUsers(Subjects s, Users u);

    UserPayment findByUsersAndSubjectAndSubjectPriceAndStatus(Users u, Subjects s, SubjectPrice sp, boolean i);
}
