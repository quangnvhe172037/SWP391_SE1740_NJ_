

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
"ADMIN");


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
VALUES ('In the era of rapid technological advancement, data-driven technologies have emerged as powerful tools that can transform industries, shape societies, and enhance human lives. These innovations, fueled by the relentless accumulation of data, have brought unprecedented opportunities./n However, as we embrace the potential of these technologies, it is crucial to recognize and address the ethical considerations that accompany them. In this op-ed, we embark on an exploration of the ethical complexities surrounding data-driven technology and propose strategies to safeguard ethical practices./n

Lulu was out for her usual morning walk when she took a wrong turn and found herself in the woods. She tried to retrace her steps, but soon realized she was lost. She began to panic, but then she remembered her training and started using her nose to sniff out a way home./n She met all kinds of creatures along the way, but she was too scared to speak to them. Eventually, her nose led her to a house made of dog treats. It looked delicious, but she knew better than to eat anything she found in the woods. Suddenly, an evil witch appeared and tried to trap Lulu in the house. But Lulu was too smart for her and used her nose to find the door and escape. She was finally home safe and sound, and she vowed never to wander off the path again./n
', 2, 1, 'img/posts/duongdananh2.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 3'),
 ('[A use case (UC) describes a sequence of interactions between a system and an external actor that results in the actor being able to achieve some outcome of value. The names of use cases are always written in the form of a verb followed by an object./n Select strong, descriptive names to make it evident from the name that the use case will deliver/n something valuable for some user]', 2, 1, 'img/posts/duongdananh3.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 4'),
('Data-driven technology, often powered by artificial intelligence and machine learning, has the capacity to revolutionize healthcare, transportation, education, and countless other domains./nThese technologies excel at pattern recognition, data analysis, and automation, enabling us to make more informed decisions and streamline processes. They offer the promise of improved medical diagnoses, safer autonomous vehicles, and personalized learning experiences, among many other benefits./n', 2, 1, 'img/posts/duongdananh5.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 5'),
('Data-driven technology, often powered by artificial intelligence and machine learning, has the capacity to revolutionize healthcare, transportation, education, and countless other domains./nThese technologies excel at pattern recognition, data analysis, and automation, enabling us to make more informed decisions and streamline processes. They offer the promise of improved medical diagnoses, safer autonomous vehicles, and personalized learning experiences, among many other benefits./n
Yet, with great power comes great responsibility. The ethical considerations tied to data-driven technology are myriad, ranging from privacy concerns to algorithmic bias and the potential for mass surveillance. As we rush headlong into this data-driven future, it is imperative that we pause to consider the potential harms and how to mitigate them.
', 2, 1, 'img/posts/duongdananh3.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 6'),
('Data-driven technology, often powered by artificial intelligence and machine learning, has the capacity to revolutionize healthcare, transportation, education, and countless other domains./nThese technologies excel at pattern recognition, data analysis, and automation, enabling us to make more informed decisions and streamline processes. They offer the promise of improved medical diagnoses, safer autonomous vehicles, and personalized learning experiences, among many other benefits./n
Yet, with great power comes great responsibility. The ethical considerations tied to data-driven technology are myriad, ranging from privacy concerns to algorithmic bias and the potential for mass surveillance. As we rush headlong into this data-driven future, it is imperative that we pause to consider the potential harms and how to mitigate them.
', 2, 1, 'img/posts/duongdananh2.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuuu', 'Tiêu đề bài viết 7');



