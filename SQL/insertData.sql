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
(2, "Practice HTML", 1, 1, 1, 2),
(6, "Practice Javascript", 1, 3, 1, 6);

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
(1, "Practice HTML", 1, "", 4, 2, 1, "2023-10-09", "01:00:00", 50),
(2, "Practice Javascript", 1, "", 4, 6, 1, "2023-10-09", "01:00:00", 50);

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
(2, 77, 3, "2023-10-16", 2, 5, 4,8, 1);

Delete  from `sliders` where sliderid = 2;

INSERT INTO `quizpractice`.`sliders`
(`sliderid`,
`image`,
`note`,
`status`,
`title`,
`subjectid`)
VALUES
(1, "img/sliders/html-course-banner.png", "Đây là khóa học 1", 1, "Bạn nên học khóa học này 1", 1),
(2, "img/sliders/banner 2.png", "Đây là khóa học 2", 1, "Bạn nên học khóa học này 2", 1);



INSERT INTO postcategory(postcateid  ,postcatename) 
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


-- INSERT INTO post (postdata, postcateid, usersid, image, datecreate, status, updatedate, briefinfor, title)
-- VALUES 
-- ("<h3>1. Tr\u00ecnh so\u1ea1n th\u1ea3o code</h3><p><br></p><p><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fcode.visualstudio.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\"><img src=\"https://codingheroes.io/resources/img/logos/vscode.png\" alt=\"https://codingheroes.io/resources/img/logos/vscode.png\"></a></p><blockquote>Visual studio code: l\u00e0 1 tr\u00ecnh so\u1ea1n th\u1ea3o code \u0111\u01b0\u1ee3c nhi\u1ec1u ng\u01b0\u1eddi s\u1eed d\u1ee5ng nh\u1ea5t hi\u1ec7n nay v\u1edbi kh\u1ea3 n\u0103ng code \u0111\u01b0\u1ee3c nhi\u1ec1u ng\u00f4n ng\u1eef v\u00e0 r\u1ea5t nhi\u1ec1u extension h\u1ed5 tr\u1ee3 cho vi\u1ec7c code</blockquote><h3>2. Ngu\u1ed3n h\u1ecdc HTML, CSS, JS,...</h3><p><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fwww.w3schools.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">W3School</a></p><blockquote>W3School: l\u00e0 1 trang web h\u1ecdc code mi\u1ec5n ph\u00ed \u0111ang tin c\u1eady v\u1edbi nhi\u1ec1u b\u00e0i gi\u1ea3ng ch\u1ea5t l\u01b0\u1ee3ng c\u00f3 \u0111\u1ea7y \u0111\u1ee7 c\u1ea3 l\u00fd thuy\u1ebft l\u1eadn th\u1ef1c h\u00e0nh v\u1edbi nhi\u1ec1u b\u00e0i code m\u1eabu ngay sau nh\u1eefng ki\u1ebfn th\u1ee9c l\u00fd thuy\u1ebft c\u1ef1c k\u1ef3 tr\u1ef1c quan.</blockquote><p><a href=\"https://developer.mozilla.org/en-US/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">MDN Web Docs</a></p><blockquote>MDN Docs: nh\u01b0 m\u1ed9t kho th\u01b0 vi\u1ec7n \u0111\u1ecbnh ngh\u0129a c\u00e1c thu\u1ed9c t\u00ednh, ch\u1ee9c n\u0103ng v\u00e0 c\u00e1ch s\u1eed d\u1ee5ng c\u1ee7a c\u00e1c th\u1ebb, h\u00e0m, c\u00e2u l\u1ec7nh... c\u1ee7a c\u00e1c ng\u00f4n ng\u1eef nh\u01b0 HTML, CSS, Javascript,... v\u00f4 c\u00f9ng \u0111\u1ea7y \u0111\u1ee7 v\u00e0 ch\u00ednh x\u00e1c</blockquote><h4>V\u00e0 1 s\u1ed1 trang web kh\u00e1c nh\u01b0:</h4><p><br></p><ul><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fcss-tricks.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">CSS-Trick</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fstackoverflow.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Stack Overflow</a></li><li><a href=\"https://fullstack.edu.vn/\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">F8</a></li><li>...</li></ul><h3>3. Ngu\u1ed3n ch\u1ee9a c\u00e1c font ch\u1eef th\u01b0\u1eddng hay \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng:</h3><p><br></p><ul><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Ffonts.google.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Google Font</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fwww.fontsquirrel.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Fontsquirrel</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fwww.myfonts.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Myfont</a></li></ul><h3>4. Ngu\u1ed3n ch\u1ee9a c\u00e1c m\u00e0u s\u1eafc th\u01b0\u1eddng hay \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng:</h3><p><br></p><ul><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Ftailwindcss.com%2Fdocs%2Fcustomizing-colors\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Tailwind Colors</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fcoolors.co%2Fcontrast-checker%2F112a46-acc8e5\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Coolors Contrast Checker</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fflatuicolors.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Flat UI Colors</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fwww.colorhunt.co%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Colorhunt Palettes</a></li></ul><h3>5. Ngu\u1ed3n ch\u1ee9a c\u00e1c kho \u1ea3nh tr\u1ef1c tuy\u1ebfn th\u01b0\u1eddng hay \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng:</h3><p><br></p><ul><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Funsplash.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Unsplash</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fwww.pexels.com%2Fvi-vn%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Pexels</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fundraw.co%2Fillustrations\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">unDraw</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fpixabay.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Pixaby</a></li></ul><h3>6. Ngu\u1ed3n ch\u1ee9a c\u00e1c Icon th\u01b0\u1eddng hay \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng:</h3><p><br></p><ul><li><a href=\"https://fullstack.edu.vn/external-url?continue=http%3A%2F%2Ffontawesome.io%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Font Awesome</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fionic.io%2Fionicons\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Ionicons</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Ficons8.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Icons8</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fheroicons.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Hero Icons</a></li></ul><h3>7. Ngu\u1ed3n ch\u1ee9a c\u00e1c m\u1eabu design \u0111\u1eb9p th\u01b0\u1eddng hay \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng:</h3><p><br></p><ul><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fdribbble.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Dribbble</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fland-book.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Land Book</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fonepagelove.com%2Finspiration\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">One Page Love</a></li><li><a href=\"https://fullstack.edu.vn/external-url?continue=https%3A%2F%2Fscreenlane.com%2F\" rel=\"noopener noreferrer\" target=\"_blank\" style=\"color: var(--primary-color)	\">Screelane</a></li></ul><p><br></p>",
--  4, 2, 'img/posts/image post 1.jpg', '2023-10-19 08:19:44', 1, '2023-10-19 08:19:44', 'C\u00e1c ngu\u1ed3n t\u00e0i nguy\u00ean cho 1 FE Dev', 'C\u00e1c ngu\u1ed3n t\u00e0i nguy\u00ean h\u1eefu \u00edch cho 1 front-end developer');
-- ('Nội dung bài viết 4', 2, 2, 'img/posts/duongdananh3.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 4'),
-- ('Nội dung bài viết 5', 2, 2, 'img/posts/duongdananh5.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 5'),
-- ('Nội dung bài viết 6', 2, 2, 'img/posts/duongdananh3.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuu', 'Tiêu đề bài viết 6'),
-- ('Nội dung bài viết 7', 2, 2, 'img/posts/duongdananh2.jpg', '2023-09-29', 1, '2023-09-30', 'Thông tin ngắn gọn sieeuuu', 'Tiêu đề bài viết 7');


