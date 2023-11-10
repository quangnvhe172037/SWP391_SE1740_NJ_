package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.PostCategories;
import com.example.onlinequiz.Model.Posts;

import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.PostListResponse;
import com.example.onlinequiz.Repo.PostCategoryRepository;
import com.example.onlinequiz.Repo.PostRepository;
import com.example.onlinequiz.Services.PostService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

    @Value("${file.upload-dir}") // Đường dẫn đến thư mục lưu trữ tệp ảnh (được cấu hình trong application.properties)
    private String uploadDir;

    @Override
    public List<PostCategories> getAllPostCate() {
        return postCateRepository.findAll();
    }

    @Override
    public List<Posts> getAllPosts() {
        return postRepository.findAllByStatusIs(true);
    }

    @Override
    public List<Posts> getAllPostsSortByDate() {
        return postRepository.findAll();
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
    public Posts getPostById(Long postid) {
        return postRepository.findPostsByPostID(postid);
    }

    @Override
    public List<Posts> getPostByCateId(Integer cateId) {
        return postRepository.findPostsByPostCategory(cateId);
    }

    @Override
    public PostCategories getPostCate(Long id) {
        return postCateRepository.getById(id);
    }
//    @Override
//    public void addPost(Posts post) {
//        postRepository.save(post);
//    }

    @Override
    public String storeImage(MultipartFile file, Long id) {
        String imageUrl = "";
        try {
            // Tạo đường dẫn đến thư mục lưu trữ tệp ảnh
            String fileName = "image post " + String.valueOf(id) + "." + FilenameUtils.getExtension(file.getOriginalFilename());
            System.out.println(id);
            Path targetPath = Paths.get(uploadDir + "/posts", fileName);

            // Lưu tệp ảnh vào thư mục lưu trữ
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            // Trả về đường dẫn tới tệp ảnh vừa tải lên
            imageUrl = uploadDir + "/" + file.getOriginalFilename();

            return "img/posts/" + fileName;
        } catch (IOException e) {
            e.printStackTrace();

        }
        return "Error when save image";
    }

    @Override
    public void updatePost(Posts p) {

        System.out.println(p.isStatus());
        postRepository.save(p);
    }

    @Override
    public List<PostListResponse> getAllPostByUser(Users u) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

        List<Posts> lp = postRepository.findPostsByUserOrderByPostIDDesc(u);
        List<PostListResponse> postListResponses = new ArrayList<>();
        for (Posts p : lp ) {
            postListResponses.add(
                    new PostListResponse(
                           p.getPostID(),
                           p.getPostCategory().getId(),
                           p.getTitle(),
                           p.isStatus(),
                           p.getImage(),
                           dateFormat.format(p.getUpdateDate()),
                            p.getPostCategory().getName(),
                            p.getBriefInfor()
                    )
            );

        }

        return postListResponses;
    }

    @Override
    public PostListResponse updateStatus(Posts newPost) {
        Posts p = postRepository.save(newPost);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        PostListResponse pr = new PostListResponse(
                p.getPostID(),
                p.getPostCategory().getId(),
                p.getTitle(),
                p.isStatus(),
                p.getImage(),
                dateFormat.format(p.getUpdateDate()),
                p.getPostCategory().getName(),
                p.getBriefInfor()
        );

        return pr;
    }

    @Override
    public void delete(Long id) {
        postRepository.deleteById(id);

    }


}
