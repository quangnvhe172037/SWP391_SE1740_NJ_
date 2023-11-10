-- MySQL Workbench Forward Engineering


-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema swp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema swp
-- -----------------------------------------------------
 DROP SCHEMA quiz_practice;
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `quiz_practice` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;



-- -----------------------------------------------------
-- Table `swp`.`account`
-- -----------------------------------------------------


USE `quiz_practice` ;


-- -----------------------------------------------------
-- Table `quiz_practice`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`users` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(256) NOT NULL,
  `first_name` VARCHAR(256) CHARACTER SET 'utf8mb4' ,
  `last_name` VARCHAR(256) CHARACTER SET 'utf8mb4',
  `email` VARCHAR(256) DEFAULT NULL,
  `mobile` INT  DEFAULT NULL,
  `gender` BIT(1)  DEFAULT NULL,
  `create_date` DATE  DEFAULT NULL,
  `image` VARCHAR(256)  DEFAULT NULL,
  `is_enabled` BIT  DEFAULT NULL,
  `role` VARCHAR(256) NOT NULL ,
  PRIMARY KEY (`user_id`),
  INDEX `role` (`role` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`subjectcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`subject_category` (
  `cate_id` INT NOT NULL AUTO_INCREMENT,
  `cate_name` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  PRIMARY KEY (`cate_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`subject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`subject` (
  `subject_id` BIGINT NOT NULL AUTO_INCREMENT,
  `subject_name` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `cate_id` INT NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `image` VARCHAR(256) NULL DEFAULT NULL,
  `description` TEXT CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `create_date` DATETIME NOT NULL,
  PRIMARY KEY (`subject_id`),
  INDEX `cate_id` (`cate_id` ASC) VISIBLE,
  CONSTRAINT `subject_ibfk_1`
    FOREIGN KEY (`cate_id`)
    REFERENCES `quiz_practice`.`subject_category` (`cate_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `quiz_practice`.`subjecttopic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`subject_topic` (
  `topic_id` BIGINT NOT NULL AUTO_INCREMENT,
  `topic_name` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `subject_topic_order` INT NULL DEFAULT NULL,
  `subject_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`topic_id`),
  INDEX `subject_id` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `subject_topic_ibfk_1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `quiz_practice`.`subject` (`subject_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`lessontype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`lesson_type` (
  `lesson_type_id` INT NOT NULL AUTO_INCREMENT,
  `lesson_type_name` VARCHAR(256) CHARACTER SET 'utf8mb4' NULL DEFAULT NULL,
  PRIMARY KEY (`lesson_type_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`lesson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`lesson` (
  `lesson_id` BIGINT NOT NULL AUTO_INCREMENT,
  `lesson_name` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `lesson_order` INT NULL DEFAULT NULL,
  `video_link` VARCHAR(256) NULL DEFAULT NULL,
  `topic_id` BIGINT NULL DEFAULT NULL,
  `lesson_type_id` INT NULL DEFAULT NULL,
  `lesson_content` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`lesson_id`),
  INDEX `topic_id` (`topic_id` ASC) VISIBLE,
  INDEX `lesson_type_id` (`lesson_type_id` ASC) VISIBLE,
  CONSTRAINT `lesson_ibfk_1`
    FOREIGN KEY (`topic_id`)
    REFERENCES `quiz_practice`.`subject_topic` (`topic_id`),
  CONSTRAINT `lesson_ibfk_2`
    FOREIGN KEY (`lesson_type_id`)
    REFERENCES `quiz_practice`.`lesson_type` (`lesson_type_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`postcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`post_category` (
  `post_cate_id` INT NOT NULL AUTO_INCREMENT,
  `post_cate_name` VARCHAR(256) CHARACTER SET 'utf8mb4' NULL DEFAULT NULL,
  PRIMARY KEY (`post_cate_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`post` (
  `post_id` BIGINT NOT NULL AUTO_INCREMENT,
  `post_data` TEXT NULL DEFAULT NULL,
  `post_cate_id` INT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  `image` VARCHAR(256) NULL DEFAULT NULL,
  `date_create` DATETIME NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `update_date` DATETIME NULL DEFAULT NULL,
  `brief_info` TEXT CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `title` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  INDEX `post_cate_id` (`post_cate_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `post_ibfk_1`
    FOREIGN KEY (`post_cate_id`)
    REFERENCES `quiz_practice`.`post_category` (`post_cate_id`),
  CONSTRAINT `post_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `quiz_practice`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `quiz_practice`.`quiz_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`quiz_data` (
  `sentence_id` BIGINT NOT NULL AUTO_INCREMENT,
  `subject_id` BIGINT NOT NULL,
  PRIMARY KEY (`sentence_id`),
  INDEX `sentence_id` (`sentence_id` ASC) VISIBLE,
    CONSTRAINT `quiz_data_ibfk_1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `quiz_practice`.`subject` (`subject_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `quiz_practice`.`quiz_answer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`quiz_answer` (
  `answer_id` BIGINT NOT NULL AUTO_INCREMENT,
  `answer_data` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `sentence_id` BIGINT NULL DEFAULT NULL,
  `is_true_answer` BIT(1) NULL DEFAULT NULL,
  `explanation` VARCHAR(256) NULL DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  INDEX `sentence_id` (`sentence_id` ASC) VISIBLE,
  CONSTRAINT `quiz_answer_ibfk_1`
    FOREIGN KEY (`sentence_id`)
    REFERENCES `quiz_practice`.`quiz_data` (`sentence_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`quiz_question`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`quiz_question` (
  `question_id` BIGINT NOT NULL AUTO_INCREMENT,
  `question_data` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `sentence_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`question_id`),
  INDEX `sentence_id` (`sentence_id` ASC) VISIBLE,
  CONSTRAINT `quiz_question_ibfk_1`
    FOREIGN KEY (`sentence_id`)
    REFERENCES `quiz_practice`.`quiz_data` (`sentence_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `quiz_practice`.`quiz_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`quiz_type` (
  `quiz_type_id` BIGINT NOT NULL AUTO_INCREMENT,
  `quiz_type_name` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  PRIMARY KEY (`quiz_type_id`),
  INDEX `quiz_type_id` (`quiz_type_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `quiz_practice`.`quiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`quiz` (
  `quiz_id` BIGINT NOT NULL AUTO_INCREMENT,
  `quiz_name` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `description` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `subject_id` BIGINT NULL DEFAULT NULL,
  `lesson_id` BIGINT NULL DEFAULT NULL,
  `quiz_type_id` BIGINT NOT NULL,
  `date_create` DATETIME NULL DEFAULT NULL,
  `duration_time` INT NULL DEFAULT NULL,
  `pass_rate` INT NULL DEFAULT NULL,
  PRIMARY KEY (`quiz_id`),
  INDEX `subject_id` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `quiz_ibfk_1`
   FOREIGN KEY (`subject_id`)
    REFERENCES `quiz_practice`.`subject` (`subject_id`),
    CONSTRAINT `quiz_ibfk_2`
   FOREIGN KEY (`quiz_type_id`)
    REFERENCES `quiz_practice`.`quiz_type` (`quiz_type_id`),
    CONSTRAINT `quiz_ibfk_3`
   FOREIGN KEY (`lesson_id`)
    REFERENCES `quiz_practice`.`lesson` (`lesson_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- -----------------------------------------------------
-- Table `quiz_practice`.`quiz_detail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`quiz_detail` (
  `quiz_detail_id` BIGINT NOT NULL AUTO_INCREMENT,
  `sentence_id` BIGINT NULL DEFAULT NULL,
   `quiz_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`quiz_detail_id`),
  INDEX `quiz_id` (`quiz_id` ASC) VISIBLE,
  CONSTRAINT `quiz_detail_ibfk_1`
    FOREIGN KEY (`sentence_id`)
    REFERENCES `quiz_practice`.`quiz_data` (`sentence_id`),
    CONSTRAINT `quiz_detail_ibfk_2`
    FOREIGN KEY (`quiz_id`)
    REFERENCES `quiz_practice`.`quiz` (`quiz_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `quiz_practice`.`examlevel
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`exam_level` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `num_quest` INT,
  `quiz_id` BIGINT,
  PRIMARY KEY (`id`),
  CONSTRAINT `examlevel_ibfk_1`
    FOREIGN KEY (`quiz_id`)
    REFERENCES `quiz_practice`.`quiz` (`quiz_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`quiz_result`
-- -------------------------------------examlevel----------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`quiz_result` (
  `result_id` BIGINT NOT NULL AUTO_INCREMENT,
  `score` INT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  `date_taken` DATETIME NULL DEFAULT NULL,
  `date_end` DATETIME NULL DEFAULT NULL,
  `quiz_id` BIGINT NULL DEFAULT NULL,
  `correct_answer` INT NULL DEFAULT NULL,
  `null_answer` INT NULL DEFAULT NULL,
  `false_answer` INT NULL DEFAULT NULL,
  `is_done` BIT(1) NULL DEFAULT NULL,
  `is_pass` BIT(1) NULL DEFAULT FALSE,
  PRIMARY KEY (`result_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `quiz_id` (`quiz_id` ASC) VISIBLE,
  CONSTRAINT `quiz_result_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `quiz_practice`.`users` (`user_id`),
  CONSTRAINT `quiz_result_ibfk_2`
    FOREIGN KEY (`quiz_id`)
    REFERENCES `quiz_practice`.`quiz` (`quiz_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`quiz_resultdetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`quiz_result_detail` (
  `quiz_exam_detail` BIGINT NOT NULL AUTO_INCREMENT,
  `result_id` BIGINT NULL DEFAULT NULL,
  `user_answer` BIGINT NULL DEFAULT NULL,
  `sentence_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`quiz_exam_detail`),
  INDEX `result_id` (`result_id` ASC) VISIBLE,
  INDEX `user_answer` (`user_answer` ASC) VISIBLE,
  INDEX `sentence_id` (`sentence_id` ASC) VISIBLE,
  CONSTRAINT `quiz_result_detail_ibfk_1`
    FOREIGN KEY (`result_id`)
    REFERENCES `quiz_practice`.`quiz_result` (`result_id`),
  CONSTRAINT `quiz_resultdetail_ibfk_2`
    FOREIGN KEY (`user_answer`)
    REFERENCES `quiz_practice`.`quiz_answer` (`answer_id`),
  CONSTRAINT `quiz_result_detail_ibfk_3`
    FOREIGN KEY (`sentence_id`)
    REFERENCES `quiz_practice`.`quiz_data` (`sentence_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`slider`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`sliders` (
  `slider_id` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `image` VARCHAR(256) NULL DEFAULT NULL,
  `subject_id` BIGINT NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `note` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  PRIMARY KEY (`slider_id`),
  INDEX `subject_id` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `slider_ibfk_1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `quiz_practice`.`subject` (`subject_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`subject_join`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`subject_join` (
`subject_join_id` BIGINT NOT NULL AUTO_INCREMENT,
  `subject_id` BIGINT NOT NULL ,
  `user_id` BIGINT NOT NULL,
	`is_pass` BIT NULL DEFAULT NULL,
  PRIMARY KEY (`subject_join_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `subject_join_ibfk_1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `quiz_practice`.`subject` (`subject_id`),
  CONSTRAINT `subject_join_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `quiz_practice`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`subjectprice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`subject_price` (
  `pre_id` BIGINT NOT NULL AUTO_INCREMENT,
  `price` BIGINT NULL DEFAULT NULL,
  `subject_id` BIGINT NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  PRIMARY KEY (`pre_id`),
  INDEX `subject_id` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `subject_price_ibfk_1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `quiz_practice`.`subject` (`subject_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`subjectteacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`subject_teacher` (
`subject_teacher_id` BIGINT NOT NULL AUTO_INCREMENT,
  `subject_id` BIGINT NULL,
  `user_id` BIGINT NULL,
  PRIMARY KEY (`subject_teacher_id`),
  INDEX `subject_id` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `subject_teacher_ibfk_1`
    FOREIGN KEY (`subject_id`)
    REFERENCES `quiz_practice`.`subject` (`subject_id`),
  CONSTRAINT `subject_teacher_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `quiz_practice`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quiz_practice`.`user_payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quiz_practice`.`user_payment` (
  `bill_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NULL DEFAULT NULL,
  `pre_id` BIGINT NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `notify` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `subject_id` BIGINT NULL DEFAULT NULL,
  `purchase_date` DATETIME NOT NULL,
  PRIMARY KEY (`bill_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `pre_id` (`pre_id` ASC) VISIBLE,
  INDEX `subject_id` (`subject_id` ASC) VISIBLE,
  CONSTRAINT `user_payment_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `quiz_practice`.`users` (`user_id`),
  CONSTRAINT `user_payment_ibfk_2`
    FOREIGN KEY (`pre_id`)
    REFERENCES `quiz_practice`.`subject_price` (`pre_id`),
  CONSTRAINT `user_payment_ibfk_3`
    FOREIGN KEY (`subject_id`)
    REFERENCES `quiz_practice`.`subject` (`subject_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- Create 
CREATE TABLE IF NOT EXISTS `quiz_practice`.`verification_token` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(256) CHARACTER SET 'utf8mb4',
  `expiration_time` DATETIME NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `verification_token_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `quiz_practice`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


CREATE TABLE IF NOT EXISTS `quiz_practice`.`wish_list`(
	 `id` BIGINT NOT NULL AUTO_INCREMENT,
      `user_id` BIGINT NULL DEFAULT NULL,
       `subject_id` BIGINT NOT NULL,
       PRIMARY KEY (`id`),
       INDEX `user_id` (`user_id` ASC) VISIBLE,
       CONSTRAINT `wish_list_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `quiz_practice`.`users` (`user_id`),
    CONSTRAINT `wish_list_ibfk_2`
    FOREIGN KEY (`subject_id`)
    REFERENCES `quiz_practice`.`subject` (`subject_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;