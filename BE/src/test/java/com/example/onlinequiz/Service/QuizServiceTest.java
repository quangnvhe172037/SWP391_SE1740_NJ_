package com.example.onlinequiz.Service;

import com.example.onlinequiz.Model.QuizAnswers;
import com.example.onlinequiz.Model.QuizData;
import com.example.onlinequiz.Model.QuizQuestions;
import com.example.onlinequiz.Model.Subjects;
import com.example.onlinequiz.Payload.Request.QuizRequest;
import com.example.onlinequiz.Repo.QuizAnswerRepository;
import com.example.onlinequiz.Repo.QuizDataRepository;
import com.example.onlinequiz.Repo.QuizQuestionRepository;
import com.example.onlinequiz.Repo.SubjectRepository;
import com.example.onlinequiz.Services.Impl.QuizServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.InjectMocks;


import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.*;

public class QuizServiceTest {
    @InjectMocks
    private QuizServiceImpl yourService;

    @Mock
    private SubjectRepository subjectRepository;

    @Mock
    private QuizDataRepository quizDataRepository;

    @Mock
    private QuizQuestionRepository quizQuestionRepository;

    @Mock
    private QuizAnswerRepository quizAnswerRepository;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddQuestion() {
        // Tạo đối tượng Mock để giả lập Subjects
        Subjects subjects = new Subjects();
        when(subjectRepository.findBySubjectName(anyString())).thenReturn(subjects);

        // Tạo đối tượng QuizRequest
        QuizRequest request = new QuizRequest();
        request.setQuestionData("What is the capital of France?");
        request.setAnswerOptions(Arrays.asList("Paris", "Berlin", "London", "Madrid"));
        request.setCorrectAnswer("A");
        request.setExplanation("Paris is the capital of France.");

        // Gọi hàm cần kiểm tra
        yourService.addQuestion(request, "Geography");

        // Kiểm tra xem các phương thức save đã được gọi đúng số lần và với đúng đối tượng
        verify(quizDataRepository, times(1)).save(any(QuizData.class));
        verify(quizQuestionRepository, times(1)).save(any(QuizQuestions.class));
        verify(quizAnswerRepository, times(4)).save(any(QuizAnswers.class));
    }

    @Test
    public void testAddQuestionWithValidSubject() {
        // Tạo đối tượng Mock để giả lập Subjects
        Subjects subjects = new Subjects();
        when(subjectRepository.findBySubjectName(anyString())).thenReturn(subjects);

        // Tạo đối tượng QuizRequest
        QuizRequest request = new QuizRequest();
        request.setQuestionData("What is the capital of France?");
        request.setAnswerOptions(Arrays.asList("Paris", "Berlin", "London", "Madrid"));
        request.setCorrectAnswer("A");
        request.setExplanation("Paris is the capital of France.");

        // Gọi hàm cần kiểm tra
        yourService.addQuestion(request, "Geography");

        // Kiểm tra xem các phương thức save đã được gọi đúng số lần và với đúng đối tượng
        verify(quizDataRepository, times(1)).save(any(QuizData.class));
        verify(quizQuestionRepository, times(1)).save(any(QuizQuestions.class));
        verify(quizAnswerRepository, times(4)).save(any(QuizAnswers.class));
    }

    @Test
    public void testAddQuestionWithInvalidSubject() {
        // Giả lập trường hợp không tìm thấy môn học (invalid subject)
        when(subjectRepository.findBySubjectName(anyString())).thenReturn(null);

        // Tạo đối tượng QuizRequest
        QuizRequest request = new QuizRequest();
        request.setQuestionData("What is the capital of France?");
        request.setAnswerOptions(Arrays.asList("Paris", "Berlin", "London", "Madrid"));
        request.setCorrectAnswer("A");
        request.setExplanation("Paris is the capital of France.");

        // Gọi hàm cần kiểm tra
        try {
            yourService.addQuestion(request, "Geography");
            fail("Expected RuntimeException, but it didn't occur.");
        } catch (RuntimeException e) {
            // Kiểm tra xem ngoại lệ đã được ném như mong muốn
            assertEquals("Subject not found", e.getMessage());
        }

        // Đảm bảo rằng không có phương thức save nào được gọi
        verify(quizDataRepository, never()).save(any(QuizData.class));
        verify(quizQuestionRepository, never()).save(any(QuizQuestions.class));
        verify(quizAnswerRepository, never()).save(any(QuizAnswers.class));
    }

    @Test
    public void testAddQuestionWithInvalidCorrectAnswer() {
        // Giả lập môn học hợp lệ
        Subjects subjects = new Subjects();
        when(subjectRepository.findBySubjectName(anyString())).thenReturn(subjects);

        // Tạo đối tượng QuizRequest với correctAnswer không hợp lệ
        QuizRequest request = new QuizRequest();
        request.setQuestionData("What is the capital of France?");
        request.setAnswerOptions(Arrays.asList("Paris", "Berlin", "London", "Madrid"));
        request.setCorrectAnswer("E"); // Không phải A, B, C, hoặc D
        request.setExplanation("Paris is the capital of France.");

        // Gọi hàm cần kiểm tra
        try {
            yourService.addQuestion(request, "Geography");
            fail("Expected IllegalArgumentException, but it didn't occur.");
        } catch (IllegalArgumentException e) {
            // Kiểm tra xem ngoại lệ đã được ném như mong muốn
            assertEquals("Correct answer must be A, B, C, or D", e.getMessage());
        }

        // Đảm bảo rằng không có phương thức save nào được gọi
        verify(quizDataRepository, never()).save(any(QuizData.class));
        verify(quizQuestionRepository, never()).save(any(QuizQuestions.class));
        verify(quizAnswerRepository, never()).save(any(QuizAnswers.class));
    }

    @Test
    public void testAddQuestionWithNullRequest() {
        // Giả lập môn học hợp lệ
        Subjects subjects = new Subjects();
        when(subjectRepository.findBySubjectName(anyString())).thenReturn(subjects);

        // Tạo đối tượng QuizRequest là null
        QuizRequest request = null;

        // Gọi hàm cần kiểm tra
        try {
            yourService.addQuestion(request, "Geography");
            fail("Expected IllegalArgumentException, but it didn't occur.");
        } catch (IllegalArgumentException e) {
            // Kiểm tra xem ngoại lệ đã được ném như mong muốn
            assertEquals("QuizRequest cannot be null", e.getMessage());
        }

        // Đảm bảo rằng không có phương thức save nào được gọi
        verify(quizDataRepository, never()).save(any(QuizData.class));
        verify(quizQuestionRepository, never()).save(any(QuizQuestions.class));
        verify(quizAnswerRepository, never()).save(any(QuizAnswers.class));
    }
}
