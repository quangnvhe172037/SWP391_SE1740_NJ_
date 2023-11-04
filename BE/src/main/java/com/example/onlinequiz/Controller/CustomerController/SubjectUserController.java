package com.example.onlinequiz.Controller.CustomerController;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Response.QuizResultResponse;
import com.example.onlinequiz.Payload.Response.SubjectDetailResponse;
import com.example.onlinequiz.Repo.SubjectRepository;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Repo.WishListRepository;
import com.example.onlinequiz.Services.Impl.SubjectServiceImp;
import com.example.onlinequiz.Services.Impl.UserPaymentServiceImpl;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/user/subject")
public class SubjectUserController {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final SubjectRepository subjectRepository;
    @Autowired
    private final WishListRepository wishListRepository;
    @Autowired
    private final SubjectServiceImp subjectService;

    @Autowired
    private final UserPaymentServiceImpl userPaymentService;


    @Autowired
    private final UserServiceImpl userService;

    @GetMapping("/get")
    public ResponseEntity<SubjectDetailResponse> getQuizResult(
            @RequestParam Long subjectId,
            @RequestParam Long userId
    ) {
        try {
            SubjectDetailResponse result = subjectService.getSubjectDetail(userId, subjectId);

            if (result != null) {

                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.notFound().build();
            }

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/addToWishList")
    public ResponseEntity<?> addToWishList(
            @RequestParam Long subjectId,
            @RequestParam Long userId
    ) {
        try {
            WishList wishList = new WishList();
            Users user = userRepository.getById(userId);
            Subjects subjects = subjectRepository.getSubjectsBySubjectID(subjectId);
            wishList.setUser(user);
            wishList.setSubject(subjects);
            wishListRepository.save(wishList);
            return ResponseEntity.ok(wishList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/wishlist")
    public ResponseEntity<WishList> wishlistSubject(
            @RequestParam Long subjectId,
            @RequestParam Long userId
    ) {
        try {
            WishList wishList = wishListRepository.getWishListBySubjectAndUser(subjectId,userId);
            if(wishList != null){
                return ResponseEntity.ok(wishList);
            }
            else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/subjects-wishlist")
    public ResponseEntity<List<Subjects>> getubjectsWishList(
            @RequestParam Long userId
    ) {
        try {
            return ResponseEntity.ok(subjectRepository.getSubjectsByWishList(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/deletesubjectwishlist")
    public ResponseEntity<List<Subjects>> deleteSubjectList(
            @RequestParam Long userId,
            @RequestParam Long subjectId
    ) {
        try {
            wishListRepository.deleteWishList(userId,subjectId);
            return ResponseEntity.ok(subjectRepository.getSubjectsByWishList(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
