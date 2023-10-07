

INSERT INTO `quizpractice`.`users`
(`usersid`,
`password`,
`first_name`,
`last_name`,
`email`,
`mobile`,
`gender`,
`createdate`,
`image`,
`is_enabled`,
`role`)
VALUES
(1,
"$2a$10$quS2hnY5Fglq29NNtu86OeUelo0hTyRElm3FyGaZZR9b/TCqT0Eg.",
"admin",
"admin_sub",
"quanpdhe170415@fpt.edu.vn",
0334745645,
1,
"2003-11-19",
"",
1,
"ADMIN"),
(2,
"$2a$10$quS2hnY5Fglq29NNtu86OeUelo0hTyRElm3FyGaZZR9b/TCqT0Eg.",
"marketing",
"marketing_sub",
"vquang191103@gmail.com",
0334745645,
1,
"2003-11-19",
"",
1,
"MARKETING"),
(3,
"$2a$10$quS2hnY5Fglq29NNtu86OeUelo0hTyRElm3FyGaZZR9b/TCqT0Eg.",
"customer",
"customer_sub",
"quangnv1911@gmail.com",
0334745645,
1,
"2003-11-19",
"",
1,
"CUSTOMER")
;


INSERT INTO `quizpractice`.`subjectcategory`
(`cateid`,
`catename`)
VALUES
(1, "IT"),
(2, "Economy"),
(3, "Design");


INSERT INTO `quizpractice`.`subject`
(`subjectid`,
`subjectname`,
`cateid`,
`status`,
`image`,
`description`)
VALUES
(1, "SWP", 1, 1, "img/sliders/download (1).jpg", "Day la lop hoc swp"),
(2, "FER", 1, 1, "img/sliders/download (2).jpg", "Day la lop hoc FER");

INSERT INTO `quizpractice`.`sliders`
(`sliderid`,
`image`,
`note`,
`status`,
`title`,
`subjectid`)
VALUES
(1, "img/sliders/download (1).jpg", "Đây là khóa học 1", 1, "Bạn nên học khóa học này 1", 1),
(2, "img/sliders/download (2).jpg", "Đây là khóa học 2", 1, "Bạn nên học khóa học này 2", 1),
(3, "img/sliders/download (3).jpg", "Đây là khóa học 3", 1, "Bạn nên học khóa học này 3", 1),
(4, "img/sliders/download (4).jpg", "Đây là khóa học 4", 1, "Bạn nên học khóa học này 4", 1),
(5, "img/sliders/download (5).jpg", "Đây là khóa học 5", 1, "Bạn nên học khóa học này 5", 1),
(6, "img/sliders/download (6).jpg", "Đây là khóa học 6", 1, "Bạn nên học khóa học này 6", 1),
(7, "img/sliders/download (7).jpg", "Đây là khóa học 7", 1, "Bạn nên học khóa học này 7", 1),
(8, "img/sliders/download (8).jpg", "Đây là khóa học 8", 1, "Bạn nên học khóa học này 8", 1),
(9, "img/sliders/download.jpg", "Đây là khóa học 9", 1, "Bạn nên học khóa học này 9", 1),
(10, "img/sliders/images.jpg", "Đây là khóa học 10", 1, "Bạn nên học khóa học này 10", 1);


INSERT INTO postcategory (postcatename) VALUES ('Front-End'),('Back-End'),('No-End');


INSERT INTO post (postdata, postcateid, usersid, image, datecreate, status, updatedate, briefinfor, title)
VALUES ('Nội dung bài viết 3', 2, 1, 'img/posts/duongdananh2.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 3'),
 ('Nội dung bài viết 4', 2, 1, 'img/posts/duongdananh3.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 4'),
('Nội dung bài viết 5', 2, 1, 'img/posts/duongdananh5.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 5'),
('Nội dung bài viết 6', 2, 1, 'img/posts/duongdananh3.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 6'),
('Nội dung bài viết 7', 2, 1, 'img/posts/duongdananh2.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuuu', 'Tiêu đề bài viết 7');



