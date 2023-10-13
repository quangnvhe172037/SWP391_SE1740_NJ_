package com.example.onlinequiz.Controller.MarketingController;

import com.example.onlinequiz.Model.Lessons;
import com.example.onlinequiz.Model.Posts;
import com.example.onlinequiz.Model.Sliders;
import com.example.onlinequiz.Services.Impl.PostServiceImpl;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@CrossOrigin(value = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/marketing/post")
@AllArgsConstructor
public class PostMarketingController {

    @Autowired
    private final PostServiceImpl postService;

    @Autowired
    private final UserServiceImpl userService;


    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<Posts> addNewPost(
            @RequestParam(name = "title") String title,
            @RequestParam(name = "data") String data,
            @RequestParam(name = "cateid") Long cateId,
            @RequestParam(name = "image") MultipartFile file,
            @RequestParam(name = "brief") String brief,
            @RequestParam(name = "email") String email

            ) {
        try {
            Posts post = new Posts();
            System.out.println(post.getPostID());
            post.setPostCategory(postService.getPostCate(cateId));
            post.setPostData(data);
            post.setTitle(title);
            post.setBriefInfor(brief);
            post.setStatus(false);

            post.setUser(userService.getUserByEmail(email));
            post.setDateCreate(new Date());
            post.setUpdateDate(new Date());
            postService.updatePost(post);
            post.setImage(postService.storeImage(file, post.getPostID()));
            // Cập nhật dữ liệu của post từ updatedPostData
            postService.updatePost(post);
            return ResponseEntity.ok(post);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
