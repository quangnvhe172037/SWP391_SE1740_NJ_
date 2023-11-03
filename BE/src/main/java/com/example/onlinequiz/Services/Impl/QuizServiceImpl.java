package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Request.DeleteQuestRequest;
import com.example.onlinequiz.Payload.Request.QuizRequest;
import com.example.onlinequiz.Payload.Request.UpdateQuestionRequest;
import com.example.onlinequiz.Payload.Response.QuizInfoResponse;
import com.example.onlinequiz.Payload.Response.QuizInfoResponse;
import com.example.onlinequiz.Payload.Response.QuizSentenceResponse;
import com.example.onlinequiz.Payload.Response.QuizSentenceUserResponse;
import com.example.onlinequiz.Repo.*;
import com.example.onlinequiz.Services.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {
    @Autowired
    private final QuizRepository quizRepository;

    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final QuizDetailRepository quizDetailRepository;

    @Autowired
    private final SubjectRepository subjectRepository;

    @Autowired
    private final QuizDataRepository quizDataRepository;

    @Autowired
    private final QuizQuestionRepository quizQuestionRepository;

    @Autowired
    private final QuizResultRepository quizResultRepository;
    @Autowired
    private final QuizAnswerRepository quizAnswerRepository;

    @Autowired
    private final QuizResultDetailRepository quizResultDetailRepository;

    @Autowired
    private final SubjectsRepository subjectsRepository;


    @Override
    public Quizzes getQuizByLessonId(Long id) {
        return quizRepository.getQuizzesByLessonid(id);
    }

    @Override
    public Quizzes getQuizById(Long id) {
        Quizzes q = quizRepository.findByQuizID(id);
        return q;
    }

    @Override
    public QuizInfoResponse getQuizInfoById(Long id, Long userId) {
        Quizzes q = quizRepository.findByQuizID(id);
        Users user = userRepository.getById(userId);

        QuizResults quizResult = quizResultRepository.findFirstByQuizzesAndUserOrderByResultIDDesc(q, user);
        Long isDone;
        if(quizResult.getIsDone() == false){
            isDone = quizResult.getResultID();
        }else{
            isDone = null;
        }

        int count = quizDetailRepository.countQuizDetailByQuizzes(q);
        QuizInfoResponse quizInfoResponse = new QuizInfoResponse(
                q.getQuizID(),
                q.getQuizName(),
                q.isStatus(),
                q.getDescription(),
                q.getDateCreate(),
                q.getDurationTime(),
                q.getPassRate(),
                count,
                isDone

        );


        return quizInfoResponse;
    }

    @Override
    public void addQuestion(QuizRequest request, Long subjectName) {
        Subjects subjects = subjectRepository.getSubjectsBySubjectID(subjectName);
        if (subjects == null) {
            throw new RuntimeException("Subject not found");
        }
        QuizData quizData = new QuizData();
        quizData.setSubject(subjects);
        quizDataRepository.save(quizData);

        QuizQuestions questions = new QuizQuestions();
        questions.setQuestionData(request.getQuestion());
        questions.setQuizData(quizData);
        quizQuestionRepository.save(questions);

        List<String> answers = request.getAnswerOptions();
        String correctAnswer = request.getCorrectAnswer();
        String explaination = request.getExplanation();
        for (int i = 0; i < answers.size(); i++) {
            String answer = answers.get(i);
            QuizAnswers quizAnswers = new QuizAnswers();
            quizAnswers.setAnswerData(answer);
            quizAnswers.setQuizData(quizData);

            quizAnswers.setTrueAnswer("A".equalsIgnoreCase(correctAnswer) && i == 0 ||
                    "B".equalsIgnoreCase(correctAnswer) && i == 1 ||
                    "C".equalsIgnoreCase(correctAnswer) && i == 2 ||
                    "D".equalsIgnoreCase(correctAnswer) && i == 3);
            
            quizAnswers.setExplanation(explaination);
            quizAnswerRepository.save(quizAnswers);
        }
    }

    @Override
    public List<QuizDetail> getQuizDetailByQuiz(Quizzes q) {
        return quizDetailRepository.findAllByQuizzes(q);
    }

    @Override
    public List<QuizSentenceResponse> getListQuizDataByQuizDetail(List<QuizDetail> qd) {
        try {
            List<QuizData> quizDataList = quizDataRepository.getAllByQuizDetailIsIn(qd);

            List<QuizSentenceResponse> data = new ArrayList<>();
            for (QuizData quizData : quizDataList
            ) {
                data.add(new QuizSentenceResponse(
                        quizData.getSentenceID(),
                        quizData.getQuizAnswers(),
                        quizData.getQuizQuestions()
                ));
            }

            return data;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }

    }

    @Override
    public List<QuizSentenceUserResponse> getListAnswerQuizUser(List<QuizDetail> qd, QuizResults quizResults) {
        try {
            List<QuizData> quizDataList = quizDataRepository.getAllByQuizDetailIsIn(qd);
            System.out.println(quizDataList.size());
            QuizResultDetail quizResultDetail;
            List<QuizSentenceUserResponse> data = new ArrayList<>();


            for (QuizData quizData : quizDataList
            ) {
                quizResultDetail = quizResultDetailRepository.findQuizResultDetailByQuizDataAndQuizResult(quizData, quizResults);
                if(quizResultDetail.getUserAnswer() != null){
                    data.add(new QuizSentenceUserResponse(
                            quizData.getSentenceID(),
                            quizData.getQuizAnswers(),
                            quizData.getQuizQuestions(),
                            quizResultDetail.getUserAnswer().getAnswerID()
                    ));
                }else{
                    data.add(new QuizSentenceUserResponse(
                            quizData.getSentenceID(),
                            quizData.getQuizAnswers(),
                            quizData.getQuizQuestions(),
                            null


                    ));
                }

            }

            return data;
        } catch (Exception e) {
            System.out.println( " QuizServiceImpl - getListAnswerQuizUser"+e.getMessage());
            return null;
        }

    }

    @Override
    public void addNewQuiz(Quizzes q) {
        quizRepository.save(q);
    }

    public void deleteQuestion(DeleteQuestRequest request) {
        QuizData quizData = quizDataRepository.findQuizDataBySentenceID(request.getQuesId());
        if (quizData != null) {
            QuizQuestions question = quizQuestionRepository.findQuizQuestionsByQuestionID(quizData.getQuizQuestions().getQuestionID());
            if (question != null) {
                List<QuizAnswers> answers = quizAnswerRepository.findByQuizData(quizData);
                for (QuizAnswers quizAnswers : answers) {
                    quizAnswerRepository.delete(quizAnswers);
                }
                quizQuestionRepository.delete(question);
                quizDataRepository.delete(quizData);
            } else {
                throw new RuntimeException("Question not found");
            }
        } else {
            throw new RuntimeException("Subject not found");
        }
    }

    @Override
    public void addRandomQuestionsToQuiz(Long quizId, Long subjectId, int numberOfQuestions) {
        System.out.println("die here");
        List<QuizData> randomQuizData = getRandomQuizDataBySubject(subjectId, numberOfQuestions);
        System.out.println("1");
        Quizzes quiz = quizRepository.findByQuizID(quizId);
        List<QuizDetail> quizDetails = new ArrayList<>();
        System.out.println("randome quiz:"+randomQuizData);
        System.out.println(quiz);
        for (QuizData quizData : randomQuizData) {
            QuizDetail quizDetail = new QuizDetail();
            quizDetail.setQuizData(quizData);
            quizDetail.setQuizzes(quiz);
            quizDetails.add(quizDetail);
        }

        System.out.println(quizDetails);
        quizDetailRepository.saveAll(quizDetails);
    }

    public List<QuizData> getRandomQuizDataBySubject(Long subjectId, int numberOfQuestions) {
        System.out.println("hehe");
        Subjects s = subjectsRepository.findBySubjectID(subjectId);

        System.out.println("hehe1" + s);
        //die here
        List<QuizData> allQuizData = quizDataRepository.findBySubject(s);
        System.out.println("Quiz data taken:" + allQuizData);
        List<QuizData> randomQuizData = new ArrayList<>();

        //So cau quiz nho hon quiz trong db thi lay het
        if (allQuizData.size() <= numberOfQuestions) {
            return allQuizData;
        }

        Random random = new Random();
        while (randomQuizData.size() < numberOfQuestions) {
            int index = random.nextInt(allQuizData.size());
            randomQuizData.add(allQuizData.get(index));
            allQuizData.remove(index);
        }

        return randomQuizData;
    }
}
