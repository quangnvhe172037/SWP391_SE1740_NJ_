-- Index
-- 1. users
-- 2. subject_category
-- 3. subject
-- 4. subject_topic
-- 5. lesson_type
-- 6. lesson
-- 7. post_category
-- 8. post
-- 9. quiz_data
-- 10. quiz_answer
-- 11. quiz_question
-- 12. quiz_type
-- 13. quiz
-- 14. quiz_detail 
-- 15. exam_level
-- 16. quiz_result
-- 17. quiz_result_detail
-- 18. sliders
-- 19. subject_join
-- 20. subject_price
-- 21. subject_teacher
-- 22. user_payment
-- 23. verification_token


-- Insert field

-- 1. Insert to users

INSERT INTO `quiz_practice`.`users`
(`user_id`,
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



-- 2. Insert to subject_category


INSERT INTO `quiz_practice`.`subject_category`
(`cate_id`,`cate_name`)
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



-- 3. Insert to subject
INSERT INTO `quiz_practice`.`subject`
(`subject_id`,
`subject_name`,
`cate_id`,
`status`,
`image`,
`description`,
`create_date`)
VALUES
(1, "Statistics / Data Analysis in SPSS: Inferential Statistics", 1, 1, "img/subject/subject 1.jpg", "Increase Your Data Analytic Skills – Highly Valued And Sought After By Employers", "2020-06-05"),
(2, "FER", 1, 1, "img/subject/subject 1.jpg", "Day la lop hoc FER", "2023-09-29"),
(3, "SWT", 1, 1, "img/subject/subject 1.jpg", "Day la lop hoc FER", "2023-09-28"),
(4, "HTML, JavaScript, & Bootstrap ", 1, 1, "img/subject/subject 1.jpg", "A Comprehensive Guide for Beginners interested in learning HTML, JavaScript, & Bootstrap. Build Interactive Web Pages.", "2023-09-28");

-- 4. Insert to subject_topic

INSERT INTO `quiz_practice`.`subject_topic`
(`topic_id`,
`topic_name`,
`status`,
`subject_topic_order`,
`subject_id`)
VALUES
(1, "HTML Development",true, 1, 4),
(2, "Javascript Development",true, 2, 4),
(3, "Bootstrap Development",true, 3, 4);


-- 5. Insert to lesson_type

INSERT INTO `quiz_practice`.`lesson_type`
(`lesson_type_id`,
`lesson_type_name`)
VALUES
(1, "quiz"),
(2, "video"),
(3, "content");


-- 6. Insert to lesson

INSERT INTO `quiz_practice`.`lesson`
(`lesson_id`,
`lesson_name`,
`status`,
`lesson_order`,
`video_link`,
`topic_id`,
`lesson_type_id`,
`lesson_content`)
VALUES
(1, "Introduect to HTML", true, 1,"salY_Sm6mv4?si=tcrUkJTunS_4oocG", 1, 2, null),
(2, "Practice HTML", true, 2, null,1, 1, null),
(3, "Note about HTML", true, 3, null, 1,3, "Bạn cần hoàn thành bài trên"),
(4, "Introduce to CSS", true, 4,null, 2, 3, "Bạn cần làm bài này"),
(5, "Introduce to Boostrap", true, 5, null,3, 3, "Bạn cần làm bài này"),
(6, "Practice Javascript", true, 6, null, 3, 1, null);



-- 7. Insert to post_category

INSERT INTO `quiz_practice`.`post_category`
(`post_cate_id`,
`post_cate_name`)
VALUES (1, "Development"),
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


-- 8. Insert to post
-- 9. Insert to quiz_data

INSERT INTO `quiz_practice`.`quiz_data`
(`sentence_id`,
`subject_id`)
VALUES
(1, 4),
(2, 4),
(3, 4),
(4, 4),
(5, 4),
(6, 4),
(7, 4),
(8, 4),
(9, 4),
(10, 4),
(11, 4),
(12, 4);


-- 10. Insert to quiz_answer

INSERT INTO `quiz_practice`.`quiz_answer`
(`answer_id`,
`answer_data`,
`sentence_id`,
`is_true_answer`,
`explanation`)
VALUES
(1 ,"HTML stands for Hyper Text Markup Language", 1, 1, ""),
( 2, "HTML stands for High Text Markup Language", 1, 0, ""),
( 3, "HTML stands for Hyperlinks and Text Markup Language", 1, 0, ""),
( 4, "HTML stands for Home Tool Markup Language", 1, 0, ""),
( 5, "The correct element for the largest heading is <h1>", 2, 1, ""),
( 6, "The correct element for the largest heading is <heading>", 2, 0, ""),
( 7, "The correct element for the largest heading is <h6>", 2, 0, ""),
( 8, "The correct element for the largest heading is <head>", 2, 0, ""),
( 9, "Web network", 3, 0, ""),
( 10, "Web server", 3, 0, ""),
( 11, "Web browser", 3, 1, ""),
( 12, "Web matrix", 3, 0, "");


-- 11. Insert to quiz_question

INSERT INTO `quiz_practice`.`quiz_question`
(`question_id`,
`question_data`,
`sentence_id`)
VALUES
(1, "What does HTML stand for?", 1),
(2, "What is the correct HTML element for the largest heading?", 2),
(3, "Which of the following is used to read an HTML page and render it?",3);



-- 12. Insert to quiz_type

INSERT INTO `quiz_practice`.`quiz_type`
(`quiz_type_id`,
`quiz_type_name`)
VALUES
(1, "LEARNING"),
(2, "PRACTICE"),
(3, "EXAM");


-- 13. Insert to quiz

INSERT INTO `quiz_practice`.`quiz`
(`quiz_id`,
`quiz_name`,
`status`,
`description`,
`subject_id`,
`lesson_id`,
`quiz_type_id`,
`date_create`,
`duration_time`,
`pass_rate`)
VALUES
 (1, "Practice HTML", 1, "", 4, 2, 1, "2023-10-09", 60, 50),
 (2, "Practice Javascript", 1, "", 4, 6, 1, "2023-10-09", 60, 50),
  (3, "Practice Final", 1, "", 4, null, 1, "2023-10-09", 60, 50);


-- 14. Insert to quiz_detail 

INSERT INTO `quiz_practice`.`quiz_detail`
(`quiz_detail_id`,
`sentence_id`,
`quiz_id`)
VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1),
(11, 11, 1),
(12, 12, 1);


-- 15. Insert to exam_level
-- 16. Insert to quiz_result

INSERT INTO `quiz_practice`.`quiz_result`
(`result_id`,
`score`,
`user_id`,
`date_taken`,
`quiz_id`,
`correct_answer`,
`null_answer`,
`false_answer`,
`is_pass`)
VALUES
(1,77,3,"2023-05-11",1,5,4,8,1),
 (2, 23,3,"2023-05-11",2,5,4,8,1);
-- (45,4,"2023-05-11",3,6,9,1,1),
-- (20,4,"2023-05-11",4,12,3,5,1),
-- (13,4,"2023-05-11",5,9,1,3,1);


-- 17. Insert to quiz_result_detail



-- 18. Insert to sliders

INSERT INTO `quiz_practice`.`sliders`
(`slider_id`,
`image`,
`title`,
`subject_id`,
`note`,
`status`)
VALUES
(1, "img/sliders/html-course-banner.png", "Đây là khóa học 1", 1, "Bạn nên học khóa học này 1", 1),
(2, "img/sliders/banner 2.png", "Đây là khóa học 2", 2, "Bạn nên học khóa học này 2", 1);


-- 19. Insert to subject_join


-- 20. Insert to subject_price


INSERT INTO `quiz_practice`.`subject_price`
(`pre_id`,
`price`,
`subject_id`,
`status`)
VALUES
(1, 1000000, 2, 1),
(2, 1000000, 3, 1),
(3, 1000000, 4, 1);


-- 21. Insert to subject_teacher



-- 22. Insert to user_payment

INSERT INTO `quiz_practice`.`user_payment`
(`bill_id`,
`user_id`,
`pre_id`,
`status`,
`notify`,
`subject_id`,
`purchase_date`)
VALUES(1,3,1,0,'Success register',2,'2023-09-28'),
(2,3,2,1,'Success register',2,'2023-09-28'),
(3,3,3,1,'Success register',4,'2023-09-28');


-- 23. Insert to verification_token

