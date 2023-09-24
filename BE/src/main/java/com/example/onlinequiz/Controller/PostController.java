package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Model.PostCategories;
import com.example.onlinequiz.Model.Posts;
import com.example.onlinequiz.Repo.PostRepository;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<Posts>> getPost(){
        List<Posts> listPost = postService.getAllPostsSortByDate();
//        System.out.println(listPost);
        return ResponseEntity.ok(listPost);
    }

    @GetMapping("/cate")
    @ResponseBody
    public ResponseEntity<List<PostCategories>> getCate(){
        List<PostCategories> listPostcate = postService.getAllPostCate();

        return ResponseEntity.ok(listPostcate);
    }

    @GetMapping("/randomPost")
    @ResponseBody
    public ResponseEntity<List<Posts>> getRandomPost(){
        List<Posts> listRandomPost = postService.getRandomPosts(2);
        return ResponseEntity.ok(listRandomPost);
    }

    @GetMapping("/view/{postId}")
    @ResponseBody
    public ResponseEntity<Posts> getPostById(
            @PathVariable Long postId
    ){
    Posts postFind = postService.getPostById(postId);
    return ResponseEntity.ok(postFind);

    }

    @GetMapping("/selectCate")
    @ResponseBody
    public ResponseEntity<List<Posts>> getPostByCateId(
//            @PathVariable Integer postcateid
    ){
        List<Posts> postsListByCate = postService.getPostByCateId(1);
        System.out.println(postsListByCate);
        return ResponseEntity.ok(postsListByCate);
    }
//    @PostMapping("/add")
//    public ResponseEntity<String> addPost(@RequestBody Posts post) {
//        postService.addPost(post);
//        return ResponseEntity.ok("add post success");
//    }
}
