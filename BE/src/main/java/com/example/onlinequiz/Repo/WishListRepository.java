package com.example.onlinequiz.Repo;

import com.example.onlinequiz.Model.WishList;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface WishListRepository extends JpaRepository<WishList, Long> {
    @Query(value = "Select * from wish_list where subject_id = ?1 and user_id = ?2",nativeQuery = true)
    WishList getWishListBySubjectAndUser(Long subjectID,Long userID);

    @Modifying
    @Query("DELETE from wish_list where user.id = :userID and subject.subjectID = :subjectID")
    void deleteWishList(Long userID,Long subjectID);
}