package com.example.onlinequiz.Controller.PublicController;

import com.example.onlinequiz.Model.PostCategories;
import com.example.onlinequiz.Model.Posts;
import com.example.onlinequiz.Repo.PostRepository;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "*")
@RequestMapping("/posts")
public class PostController {
    @Autowired
    private final PostService postService;


    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Posts>> getPost() {
        try {
            System.out.println("hehe");
            List<Posts> listPost = postService.getAllPostsSortByDate();
            if (listPost != null) {

        System.out.println(listPost);
                return ResponseEntity.ok(listPost);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/cate")
    @ResponseBody
    public ResponseEntity<List<PostCategories>> getCate() {

        try {

            List<PostCategories> listPostcate = postService.getAllPostCate();
            if (listPostcate != null) {
                return ResponseEntity.ok(listPostcate);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/randomPost")
    @ResponseBody
    public ResponseEntity<List<Posts>> getRandomPost() {
        try {

            List<Posts> listRandomPost = postService.getRandomPosts(2);
            if (listRandomPost != null) {

                return ResponseEntity.ok(listRandomPost);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/view/{postId}")
    @ResponseBody
    public ResponseEntity<Posts> getPostById(@PathVariable Long postId) {
        try {

            Posts postFind = postService.getPostById(postId);
            if (postFind != null) {

                return ResponseEntity.ok(postFind);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


    }

    @GetMapping("/selectCate")
    @ResponseBody
    public ResponseEntity<List<Posts>> getPostByCateId(
//            @PathVariable Integer postcateid
    ) {
        try {

            List<Posts> postsListByCate = postService.getPostByCateId(1);
            System.out.println(postsListByCate);
            return ResponseEntity.ok(postsListByCate);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }


    }
//    @PostMapping("/add")
//    public ResponseEntity<String> addPost(@RequestBody Posts post) {
//        postService.addPost(post);
//        return ResponseEntity.ok("add post success");
//    }
}
