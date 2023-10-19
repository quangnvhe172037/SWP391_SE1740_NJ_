-- Insert to subjectcategory
INSERT INTO `quizpractice`.`subjectcategory`
(`cateid`,`catename`)
VALUES
(1, "Development"),
(2, "Business"),
(3, "Finance & Accounting"),
(4,"IT & Software"),
(5,"Office Productivity"),
(6,"Personal Development"),
(7,"Design"),
(8,"Marketing"),
(9,"Lifestyle"),
(10,"Photography & Video"),
(11,"Health & Fitness"),
(12,"Music"),
(13,"Teaching & Academics");

-- Insert to subject
INSERT INTO `quizpractice`.`subject`
(`subjectid`,
`subjectname`,
`cateid`,
`status`,
`image`,
`description`,
`createdate`)
VALUES
(1, "Statistics / Data Analysis in SPSS: Inferential Statistics", 1, 1, "img/subject/subject 1.jpg", "Increase Your Data Analytic Skills – Highly Valued And Sought After By Employers", "2020-06-05"),
(2, "FER", 1, 1, "img/subject/subject 1.jpg", "Day la lop hoc FER", "2023-09-29"),
(3, "SWT", 1, 1, "img/subject/subject 1.jpg", "Day la lop hoc FER", "2023-09-28"),
(4, "HTML, JavaScript, & Bootstrap ", 1, 1, "img/subject/subject 1.jpg", "A Comprehensive Guide for Beginners interested in learning HTML, JavaScript, & Bootstrap. Build Interactive Web Pages.", "2023-09-28");

INSERT INTO `quizpractice`.`quiztype`
(`quiztypeid`,
`quiztypename`)
VALUES
(1, "LEARNING"),
(2, "PRACTICE"),
(3, "EXAM");


INSERT INTO `quizpractice`.`users`
(`usersid`,
`password`,
`first_name`,
`last_name`,
`email`,
`mobile`,
`gender`,
`create_date`,
`image`,
`is_enabled`,
`role`)
VALUES
(1, "$2a$10$quS2hnY5Fglq29NNtu86OeUelo0hTyRElm3FyGaZZR9b/TCqT0Eg.", "Quang", "Nguyen Vinh", "quanpdhe170415@fpt.edu.vn",0334745645,1,"2003-11-19","",1,"ADMIN"),
(2,"$2a$10$quS2hnY5Fglq29NNtu86OeUelo0hTyRElm3FyGaZZR9b/TCqT0Eg.","Quan","Pham Duc","vquang191103@gmail.com",0334745645,1,"2003-11-19","",1,"MARKETING"),
(3,"$2a$10$quS2hnY5Fglq29NNtu86OeUelo0hTyRElm3FyGaZZR9b/TCqT0Eg.","An","Bui Gia","quangnv1911@gmail.com",0334745645,1,"2003-11-19","",1,"CUSTOMER"),
(4, "$2a$10$quS2hnY5Fglq29NNtu86OeUelo0hTyRElm3FyGaZZR9b/TCqT0Eg.", "An", "Nguyen Thanh", "quangss310@gmail.com", 0334987654, 1, "2003-11-19","", 1, "EXPERT");

-- insert cho userpayment
INSERT INTO `quizpractice`.`subjectprice` (price, subjectid, status)
VALUES (100, 1, true),
(1500,2,true),
(2000, 3, true);


--insert cho quiz result
insert into quizresult(score, usersid, datetaken, quizid, correctanswer,nullanswer, falseanswer, ispass)
values(77,4,"2023-05-11",1,5,4,8,1),
(23,4,"2023-05-11",1,5,4,8,1),
(45,4,"2023-05-11",1,6,9,1,1),
(20,4,"2023-05-11",1,12,3,5,1),
(13,4,"2023-05-11",1,9,1,3,1),

insert into `quizpractice`.`userpayment` (usersid,preid, status,notify,subjectid,purchasedate)
values(1,1,true,'Success register',2,'2023/09/28'),
(1,2,false,'Success register',2,'2023/09/28'),
(1,3,false,'Success register',2,'2023/09/28');

INSERT INTO `quizpractice`.`subjecttopic`
(`topicid`,
`topicname`,
`subjectid`,
`order`)
VALUES
(1, "HTML Development", 4, 1),
(2, "Javascript Development", 4, 2),
(3, "Bootstrap Development", 4, 3);


INSERT INTO `quizpractice`.`lessontype`
(`lessontypeid`,
`lessontypename`)
VALUES
(1, "quiz"),
(2, "video"),
(3, "content");


INSERT INTO `quizpractice`.`lesson`
(`lessonid`,
`lessonname`,
`status`,
`videolink`,
`topicid`,
`lessontypeid`,
`order`)
VALUES
(1, "Introduect to HTML", 1, "salY_Sm6mv4?si=tcrUkJTunS_4oocG", 1, 2, 1);
INSERT INTO `quizpractice`.`lesson`
(`lessonid`,
`lessonname`,
`status`,
`topicid`,
`lessontypeid`,
`order`)
VALUES
(2, "Practice HTML", 1, 1, 1, 2);

INSERT INTO `quizpractice`.`lesson`
(`lessonid`,
`lessonname`,
`status`,
`topicid`,
`lessontypeid`,
`lessoncontent`,
`order`)
VALUES
(3, "Note about HTML", 1, 1, 3, "Bạn cần hoàn thành bài trên",3);

INSERT INTO `quizpractice`.`lesson`
(`lessonid`,
`lessonname`,
`status`,
`topicid`,
`lessontypeid`,
`lessoncontent`,
`order`)
VALUES
(4, "Introduce to CSS", 1, 2, 3, "Bạn cần làm bài này", 4);

INSERT INTO `quizpractice`.`lesson`
(`lessonid`,
`lessonname`,
`status`,
`topicid`,
`lessontypeid`,
`lessoncontent`,
`order`)
VALUES
(5, "Introduce to Boostrap", 1, 3, 3, "Bạn cần làm bài này", 5);


INSERT INTO `quizpractice`.`quiz`
(`quizid`,
`quizname`,
`status`,
`description`,
`subjectid`,
`lessonid`,
`quiztypeid`,
`datecreate`,
`durationtime`,
`passrate`)
VALUES
(1, "Practice HTML", 1, "", 4, 2, 1, "2023-10-09", "01:00:00", 50);

INSERT INTO `quizpractice`.`quizdata`
(`sentenceid`,
`subjectid`)
VALUES
(1, 4),
(2, 4),
(3, 4),
(4, 4);

INSERT INTO `quizpractice`.`quizanswer`
(`answerid`,
`answerdata`,
`sentenceid`,
`istrueanswer`)
VALUES
(1 ,"HTML stands for Hyper Text Markup Language", 1, 1),
( 2, "HTML stands for High Text Markup Language", 1, 0),
( 3, "HTML stands for Hyperlinks and Text Markup Language", 1, 0),
( 4, "HTML stands for Home Tool Markup Language", 1, 0),
( 5, "The correct element for the largest heading is <h1>", 2, 1),
( 6, "The correct element for the largest heading is <heading>", 2, 0),
( 7, "The correct element for the largest heading is <h6>", 2, 0),
( 8, "The correct element for the largest heading is <head>", 2, 0),
( 9, "Web network", 2, 0),
( 10, "Web server", 2, 0),
( 11, "Web browser", 2, 1),
( 12, "Web matrix", 2, 0);

INSERT INTO `quizpractice`.`quizquestion`
(`questionid`,
`questiondata`,
`sentenceid`)
VALUES
(1, "What does HTML stand for?", 1),
(2, "What is the correct HTML element for the largest heading?", 2),
(3, "Which of the following is used to read an HTML page and render it?",3);




INSERT INTO `quizpractice`.`quizdetail`
(`quizdetailid`,
`sentenceid`,
`quizid`)
VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1);


INSERT INTO `quizpractice`.`quizresult`
(`resultid`,
`score`,
`usersid`,
`datetaken`,
`quizid`,
`correctanswer`,
`nullanswer`,
`falseanswer`,
`ispass`)
VALUES
(1, 66, 3, "2023-10-16", 1, 1, 1,1, 1),
(1, 77, 5, "2023-10-16", 1, 5, 4,8, 1);


INSERT INTO `quizpractice`.`sliders`
(`sliderid`,
`image`,
`note`,
`status`,
`title`,
`subjectid`)
VALUES
(1, "img/sliders/html-course-banner.png", "Đây là khóa học 1", 1, "Bạn nên học khóa học này 1", 1),
(2, "img/sliders/html-course-banner.jpg", "Đây là khóa học 2", 1, "Bạn nên học khóa học này 2", 1),
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


