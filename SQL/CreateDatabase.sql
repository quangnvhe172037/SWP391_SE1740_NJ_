-- Create the Database for the project

USE [master]
GO

--DROP DATABASE QuizPractice

-- DROP ALL TABLE
/*
DROP TABLE [dbo].[Role]
DROP TABLE [dbo].[User]
DROP TABLE [dbo].[PostCategory]
DROP TABLE Post	
DROP TABLE Account
DROP TABLE SubjectCategory
DROP TABLE Subject
DROP TABLE SubjectJoin
DROP TABLE SubjectTeacher
DROP TABLE SubjectPrice
DROP TABLE UserPayment
DROP TABLE LessonType
DROP TABLE Lesson
DROP TABLE Quiz
DROP TABLE QuestionLevel
DROP TABLE QuizData
DROP TABLE QuizQuestion
DROP TABLE QuizAnswer
DROP TABLE SimulationExam
DROP TABLE ExamResult
DROP TABLE Slider

*/

-- CREATE DATABASE
CREATE DATABASE QuizPractice
GO


USE QuizPractice
GO

-- CREATE TABLE Role
CREATE TABLE [dbo].[Role](
	roleID int,
	roleName nvarchar(256)
)

-- CREATE TABLE User
CREATE TABLE [dbo].[User](
	userID BIGINT primary key,
	fullName nvarchar(256),
	email varchar(256),
	mobile int,
	gender bit,
	createDate DATE,
	[image] varchar(256),
	[status] varchar(256),
	roleID nvarchar(256) foreign key references roleID(Role)
)

-- CREATE TABLE PostCategory
CREATE TABLE [dbo].[PostCategory](
	postCateID int,
	postCateName nvarchar(256)
)


-- CREATE TABLE Post
CREATE TABLE Post(
	postID BIGINT primary key,
	postData text,
	postCateID int foreign key references postCateID(PostCategory),
	userID BIGING foreign key references userID(User),
	image varchar(256),
	dateCreate datetime,
	status varchar(256),
	updateDate datetime,
	briefInfor nvarchar(256),
	title nvarchar(256)
)
	
-- CREATE TABLE Account
CREATE TABLE Account(
	email varchar(256),
	password varchar(256),
	userID BIGINt foreign key references userID(dbo.[User]),
	primary key (email, password, userID)
)
-- CREATE TABLE SubjectCategory
CREATE TABLE SubjectCategory(
	cateID int primary key,
	cateName nvarchar(256)
)
-- CREATE TABLE Subject
CREATE TABLE Subject(
	subjectID bigint primary key,
	subjectName nvarchar(256),
	cateID int foreign key references cateID(SubjectCategory),
	status varchar(256),
	image varchar(256),
	description nvarchar(256)
)
-- CREATE TABLE SubjectJoin
CREATE TABLE SubjectJoin(
	subjectID bigint foreign key references subjectID(Subject),
	userID bigint foreign key references userID(User),
	primary key (subjectID, userID)
)
-- CREATE TABLE SubjectTeacher
CREATE TABLE SubjectTeacher(
	subjectID bigint foreign key references subjectID(Subject),
	expertID bigint foreign key references userID(User),
	primary key (expertID, subjectID)
)

-- CREATE TABLE SubjectPrice
CREATE TABLE SubjectPrice(
	preID bigint primary key,
	price bigint,
	subjectID bigint foreign key references subjectID(Subject),
	duration datetime,
	status varchar(256)
)
-- CREATE TABLE UserPayment
CREATE TABLE UserPayment(
	billID bigint primary key,
	userID bigint foreign key references userID(User),
	preID bigint foreign key references preID(SubjectPrice),
	timeStart datetime,
	timeEnd datetime,
	status varchar(256),
	notify nvarchar(256),
	subjectID bigint foreign key references subjectID(Subject)
)
-- CREATE TABLE LessonType
CREATE TABLE LessonType(
	lessonTypeID int primary key,
	lessonTypeName nvarchar(256)
)

-- CREATE TABLE SubjectTopic 
CREATE TABLE SubjectTopic(
	topicID bigint primary key,
	topicName nvarchar(256),
	subjectID bigint foreign key references subjectID(Subject),
)

-- CREATE TABLE Lesson
CREATE TABLE Lesson(
	lessonID bigint primary key,
	lessonName nvarchar(256),
	status varchar(256),
	[order] int,
	videoLink varchar(256),
	topicID bigint foreign key references topicID(SubjectTopic),
	lessonTypeID nvarchar(256) references lessonTypeID(Subject),
)
-- CREATE TABLE Quiz
CREATE TABLE Quiz(
	quizID bigint primarykey,
	quizName nvarchar(256),
	status varchar(256),
	description nvarchar(256),
	lessonID bigint foreign key references lessonID(Lesson)
)
-- CREATE TABLE QuestionLevel
CREATE TABLE QuestionLevel(
	levelID int,
	levelName nvarchar(256)
)
-- CREATE TABLE QuizData
CREATE TABLE QuizData(
	sentenceID bigint primary key,
	quizID bigint foreign key references quizID(Quiz),
	explain nvarchar(256),
	levelID int foreign key references levelID(QuestionLevel)
)
-- CREATE TABLE QuizQuestion
CREATE TABLE QuizQuestion(
	questionID bigint primary key,
	questionData nvarchar(256),
	sentenceID bigint foreign key references sentenceID(QuizData)
)
-- CREATE TABLE QuizAnswer
CREATE TABLE QuizAnswer(
	answerID bigint primary key,
	answerData nvarchar(256),
	sentenceID bigint foreign key references sentenceID(QuizData),
	isTrueAnswer bit
)
-- CREATE TABLE Exam
CREATE TABLE Exam(
	examID bigint primary key,
	examName nvarchar(256),
	dateCreate datetime,
	durationTime datetime,
	passRate int,
	subjectID bigint foreign key references subjectID(Subject),
)
-- CREATE TABLE ExamResult
CREATE TABLE ExamResult(
	resultID bigint primary key,
	score int,
	userID BIGINt foreign key references userID(User),
	dateTaken datetime,
	examID BIGINt foreign key references examID(Exam),
)
-- CREATE TABLE Slider
CREATE TABLE Slider(
	sliderID bigint primary key,
	title nvarchar(256),
	image varchar(256),
	subjectID bigint foreign key references subjectID(Subject),
	status varchar(256),
	note nvarchar(256)
)
