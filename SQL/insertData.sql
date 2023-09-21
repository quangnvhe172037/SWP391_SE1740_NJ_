INSERT INTO `quizpractice`.`role`
(`roleid`,
`rolename`)
VALUES
(1, "Customer");

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

