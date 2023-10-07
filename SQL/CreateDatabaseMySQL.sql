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

-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `quizpractice` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;



-- -----------------------------------------------------
-- Table `swp`.`account`
-- -----------------------------------------------------


USE `quizpractice` ;


-- -----------------------------------------------------
-- Table `quizpractice`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`users` (
  `usersid` BIGINT NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`usersid`),
  INDEX `role` (`role` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`subjectcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`subjectcategory` (
  `cateid` INT NOT NULL AUTO_INCREMENT,
  `catename` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  PRIMARY KEY (`cateID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`subject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`subject` (
  `subjectid` BIGINT NOT NULL AUTO_INCREMENT,
  `subjectname` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `cateid` INT NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `image` VARCHAR(256) NULL DEFAULT NULL,
  `description` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  PRIMARY KEY (`subjectid`),
  INDEX `cateid` (`cateid` ASC) VISIBLE,
  CONSTRAINT `subject_ibfk_1`
    FOREIGN KEY (`cateid`)
    REFERENCES `quizpractice`.`subjectcategory` (`cateid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `quizpractice`.`subjecttopic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`subjecttopic` (
  `topicid` BIGINT NOT NULL AUTO_INCREMENT,
  `topicname` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `subjectid` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`topicid`),
  INDEX `subjectid` (`subjectid` ASC) VISIBLE,
  CONSTRAINT `subjecttopic_ibfk_1`
    FOREIGN KEY (`subjectid`)
    REFERENCES `quizpractice`.`subject` (`subjectid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`lessontype`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`lessonType` (
  `lessontypeid` INT NOT NULL AUTO_INCREMENT,
  `lessontypename` VARCHAR(256) CHARACTER SET 'utf8mb4' NULL DEFAULT NULL,
  PRIMARY KEY (`lessonTypeID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`lesson`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`lesson` (
  `lessonid` BIGINT NOT NULL AUTO_INCREMENT,
  `lessonname` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `status` bit,
  `order` INT NULL DEFAULT NULL,
  `videolink` VARCHAR(256) NULL DEFAULT NULL,
  `topicid` BIGINT NULL DEFAULT NULL,
  `lessontypeid` INT NULL DEFAULT NULL,
  PRIMARY KEY (`lessonid`),
  INDEX `topicid` (`topicid` ASC) VISIBLE,
  INDEX `lessontypeid` (`lessontypeid` ASC) VISIBLE,
  CONSTRAINT `lesson_ibfk_1`
    FOREIGN KEY (`topicid`)
    REFERENCES `quizpractice`.`subjecttopic` (`topicid`),
  CONSTRAINT `lesson_ibfk_2`
    FOREIGN KEY (`lessontypeid`)
    REFERENCES `quizpractice`.`lessontype` (`lessontypeid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`postcategory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`postcategory` (
  `postcateid` INT NOT NULL AUTO_INCREMENT,
  `postcatename` VARCHAR(256) CHARACTER SET 'utf8mb4' NULL DEFAULT NULL,
  PRIMARY KEY (`postcateid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`post` (
  `postid` BIGINT NOT NULL AUTO_INCREMENT,
  `postdata` TEXT NULL DEFAULT NULL,
  `postcateid` INT NULL DEFAULT NULL,
  `usersid` BIGINT NULL DEFAULT NULL,
  `image` VARCHAR(256) NULL DEFAULT NULL,
  `datecreate` DATETIME NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `updatedate` DATETIME NULL DEFAULT NULL,
  `briefinfor` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `title` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  PRIMARY KEY (`postid`),
  INDEX `postcateid` (`postcateid` ASC) VISIBLE,
  INDEX `usersid` (`usersid` ASC) VISIBLE,
  CONSTRAINT `post_ibfk_1`
    FOREIGN KEY (`postcateid`)
    REFERENCES `quizpractice`.`postcategory` (`postCateID`),
  CONSTRAINT `post_ibfk_2`
    FOREIGN KEY (`usersid`)
    REFERENCES `quizpractice`.`users` (`usersid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `quizpractice`.`quiz`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`quiz` (
  `quizid` BIGINT NOT NULL AUTO_INCREMENT,
  `quizname` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `description` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `subjectid` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`quizid`),
  INDEX `lessonid` (`lessonid` ASC) VISIBLE,
  CONSTRAINT `quiz_ibfk_1`
   FOREIGN KEY (`subjectid`)
    REFERENCES `quizpractice`.`subject` (`subjectid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`quizdata`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`quizdata` (
  `sentenceid` BIGINT NOT NULL AUTO_INCREMENT,
  `quizid` BIGINT NULL DEFAULT NULL,
  `lessonid` BIGINT NULL,
  PRIMARY KEY (`sentenceid`),
  INDEX `quizid` (`quizid` ASC) VISIBLE,
  CONSTRAINT `quizdata_ibfk_1`
    FOREIGN KEY (`quizid`)
    REFERENCES `quizpractice`.`quiz` (`quizid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`quizanswer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`quizanswer` (
  `answerid` BIGINT NOT NULL AUTO_INCREMENT,
  `answerdata` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `sentenceid` BIGINT NULL DEFAULT NULL,
  `istrueanswer` BIT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`answerID`),
  INDEX `sentenceID` (`sentenceid` ASC) VISIBLE,
  CONSTRAINT `quizanswer_ibfk_1`
    FOREIGN KEY (`sentenceid`)
    REFERENCES `quizpractice`.`quizdata` (`sentenceid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`quizexam`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`quizexam` (
  `quizid` BIGINT NOT NULL AUTO_INCREMENT,
  `quizname` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `datecreate` DATETIME NULL DEFAULT NULL,
  `durationtime` DATETIME NULL DEFAULT NULL,
  `passrate` INT NULL DEFAULT NULL,
  `subjectid` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`quizid`),
  INDEX `subjectid` (`subjectid` ASC) VISIBLE,
  CONSTRAINT `quizexam_ibfk_1`
    FOREIGN KEY (`subjectid`)
    REFERENCES `quizpractice`.`subject` (`subjectid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `quizpractice`.`examlevel
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`examlevel` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `num_quest` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `quizid` BIGINT,
  PRIMARY KEY (`id`),
  CONSTRAINT `examlevel_ibfk_1`
    FOREIGN KEY (`quizid`)
    REFERENCES `quizpractice`.`quizexam` (`quizid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`quizquestion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`quizquestion` (
  `questionid` BIGINT NOT NULL AUTO_INCREMENT,
  `questiondata` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `sentenceid` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`questionid`),
  INDEX `sentenceID` (`sentenceid` ASC) VISIBLE,
  CONSTRAINT `quizquestion_ibfk_1`
    FOREIGN KEY (`sentenceid`)
    REFERENCES `quizpractice`.`quizdata` (`sentenceid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`quizresult`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`quizresult` (
  `resultid` BIGINT NOT NULL AUTO_INCREMENT,
  `score` INT NULL DEFAULT NULL,
  `usersid` BIGINT NULL DEFAULT NULL,
  `datetaken` DATETIME NULL DEFAULT NULL,
  `quizid` BIGINT NULL DEFAULT NULL,
  `correctanswer` INT NULL DEFAULT NULL,
  PRIMARY KEY (`resultid`),
  INDEX `usersid` (`usersid` ASC) VISIBLE,
  INDEX `quizid` (`quizid` ASC) VISIBLE,
  CONSTRAINT `quizresult_ibfk_1`
    FOREIGN KEY (`usersid`)
    REFERENCES `quizpractice`.`users` (`usersid`),
  CONSTRAINT `quizresult_ibfk_2`
    FOREIGN KEY (`quizid`)
    REFERENCES `quizpractice`.`quizexam` (`quizid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`quizresultdetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`quizresultdetail` (
  `quizexamdetail` BIGINT NOT NULL AUTO_INCREMENT,
  `resultid` BIGINT NULL DEFAULT NULL,
  `useranswer` BIGINT NULL DEFAULT NULL,
  `sentenceid` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`quizexamdetail`),
  INDEX `resultid` (`resultid` ASC) VISIBLE,
  INDEX `useranswer` (`useranswer` ASC) VISIBLE,
  INDEX `sentenceid` (`sentenceid` ASC) VISIBLE,
  CONSTRAINT `quizresultdetail_ibfk_1`
    FOREIGN KEY (`resultid`)
    REFERENCES `quizpractice`.`quizresult` (`resultid`),
  CONSTRAINT `quizresultdetail_ibfk_2`
    FOREIGN KEY (`useranswer`)
    REFERENCES `quizpractice`.`quizanswer` (`answerid`),
  CONSTRAINT `quizresultdetail_ibfk_3`
    FOREIGN KEY (`sentenceid`)
    REFERENCES `quizpractice`.`quizdata` (`sentenceid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`slider`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`sliders` (
  `sliderid` BIGINT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `image` VARCHAR(256) NULL DEFAULT NULL,
  `subjectid` BIGINT NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `note` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  PRIMARY KEY (`sliderid`),
  INDEX `subjectid` (`subjectid` ASC) VISIBLE,
  CONSTRAINT `slider_ibfk_1`
    FOREIGN KEY (`subjectid`)
    REFERENCES `quizpractice`.`subject` (`subjectid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`subjectjoin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`subjectjoin` (
  `subjectid` BIGINT NOT NULL ,
  `usersid` BIGINT NOT NULL,
  PRIMARY KEY (`subjectid`, `usersid`),
  INDEX `usersid` (`usersid` ASC) VISIBLE,
  CONSTRAINT `subjectjoin_ibfk_1`
    FOREIGN KEY (`subjectid`)
    REFERENCES `quizpractice`.`Subject` (`subjectid`),
  CONSTRAINT `subjectjoin_ibfk_2`
    FOREIGN KEY (`usersid`)
    REFERENCES `quizpractice`.`users` (`usersid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`subjectprice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`subjectprice` (
  `preid` BIGINT NOT NULL AUTO_INCREMENT,
  `price` BIGINT NULL DEFAULT NULL,
  `subjectid` BIGINT NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  PRIMARY KEY (`preid`),
  INDEX `subjectID` (`subjectid` ASC) VISIBLE,
  CONSTRAINT `subjectprice_ibfk_1`
    FOREIGN KEY (`subjectid`)
    REFERENCES `quizpractice`.`subject` (`subjectid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`subjectteacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`subjectteacher` (
  `subjectid` BIGINT NOT NULL,
  `usersid` BIGINT NOT NULL,
  PRIMARY KEY (`usersid`, `subjectid`),
  INDEX `subjectid` (`subjectid` ASC) VISIBLE,
  CONSTRAINT `subjectteacher_ibfk_1`
    FOREIGN KEY (`subjectid`)
    REFERENCES `quizpractice`.`subject` (`subjectid`),
  CONSTRAINT `subjectteacher_ibfk_2`
    FOREIGN KEY (`usersid`)
    REFERENCES `quizpractice`.`users` (`usersid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;



-- -----------------------------------------------------
-- Table `quizpractice`.`userpayment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `quizpractice`.`userpayment` (
  `billid` BIGINT NOT NULL AUTO_INCREMENT,
  `usersid` BIGINT NULL DEFAULT NULL,
  `preid` BIGINT NULL DEFAULT NULL,
  `status` BIT NULL DEFAULT NULL,
  `notify` VARCHAR(256) CHARACTER SET 'utf8mb4'  NULL DEFAULT NULL,
  `subjectid` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`billid`),
  INDEX `usersid` (`usersid` ASC) VISIBLE,
  INDEX `preid` (`preid` ASC) VISIBLE,
  INDEX `subjectid` (`subjectid` ASC) VISIBLE,
  CONSTRAINT `userpayment_ibfk_1`
    FOREIGN KEY (`usersid`)
    REFERENCES `quizpractice`.`users` (`usersid`),
  CONSTRAINT `userpayment_ibfk_2`
    FOREIGN KEY (`preid`)
    REFERENCES `quizpractice`.`subjectprice` (`preid`),
  CONSTRAINT `userpayment_ibfk_3`
    FOREIGN KEY (`subjectid`)
    REFERENCES `quizpractice`.`subject` (`subjectid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

-- Create 
CREATE TABLE IF NOT EXISTS `quizpractice`.`verification_token` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(256) CHARACTER SET 'utf8mb4',
  `expiration_time` DATETIME NULL,
  `usersid` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `usersid` (`usersid` ASC) VISIBLE,
  CONSTRAINT `verification_token_ibfk_1`
    FOREIGN KEY (`usersid`)
    REFERENCES `quizpractice`.`users` (`usersid`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;

