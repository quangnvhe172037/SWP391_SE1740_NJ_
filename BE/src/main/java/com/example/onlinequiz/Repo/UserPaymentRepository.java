package com.example.onlinequiz.Repo;


import com.example.onlinequiz.Model.SubjectPrice;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Model.UserPayment;
import com.example.onlinequiz.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface UserPaymentRepository extends JpaRepository<UserPayment, Long> {

    boolean existsBySubjectAndUsers(Subjects s, Users u);

    UserPayment findByUsersAndSubjectAndSubjectPriceAndStatus(Users u, Subjects s, SubjectPrice sp, boolean i);

    @Query("SELECT COUNT(u) FROM UserPayment u WHERE u.purchaseDate >= :startOfMonth AND u.purchaseDate <= :endOfMonth")
    long countPaymentsInMonth(Date startOfMonth, Date endOfMonth);

    @Query("SELECT SUM(u.subjectPrice.price) FROM UserPayment u WHERE u.purchaseDate >= :startOfMonth AND u.purchaseDate <= :endOfMonth")
    Long calculatePriceInMonth(Date startOfMonth, Date endOfMonth);

    UserPayment findUserPaymentByBillID(Long billId);
}
