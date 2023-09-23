package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.PostCategories;
import com.example.onlinequiz.Model.Posts;

import com.example.onlinequiz.Repo.PostCategoryRepository;
import com.example.onlinequiz.Repo.PostRepository;
import com.example.onlinequiz.Services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {
    @Autowired
    private final PostRepository postRepository;

    @Autowired
    private final PostCategoryRepository postCateRepository;

    @Override
    public List<PostCategories> getAllPostCate(){
        return  postCateRepository.findAll();
    }

    @Override
    public List<Posts> getAllPosts() {
        return postRepository.findAll();
    }

    @Override
    public List<Posts> getAllPostsSortByDate(){
        return  postRepository.findAllByOrderByDateCreateDesc();
    }

    @Override
    public List<Posts> getRandomPosts(int numberOfPosts) {
        List<Posts> allPosts = postRepository.findAll();
        int totalPosts = allPosts.size();

        if (totalPosts <= numberOfPosts) {
            return allPosts;
        }

        Random random = new Random();
        return random.ints(0, totalPosts)
                .distinct()
                .limit(numberOfPosts)
                .mapToObj(allPosts::get)
                .collect(Collectors.toList());
    }

    @Override
    public Posts getPostById(Long postid){
        return postRepository.findPostsByPostID(postid);
    }
//    @Override
//    public void addPost(Posts post) {
//        postRepository.save(post);
//    }
}
