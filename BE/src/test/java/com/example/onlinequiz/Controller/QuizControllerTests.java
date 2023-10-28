package com.example.onlinequiz.Controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.example.onlinequiz.Controller.FourRoleController.QuizController;
import com.example.onlinequiz.Model.Quizzes;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Payload.Response.QuizResultResponse;
import com.example.onlinequiz.Services.Impl.QuizResultServiceImpl;
import com.example.onlinequiz.Services.Impl.QuizServiceImpl;
import com.example.onlinequiz.Services.Impl.UserServiceImpl;
import com.example.onlinequiz.Services.QuizResultService;
import com.example.onlinequiz.Services.QuizService;
import com.example.onlinequiz.Services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class QuizControllerTests {

    private QuizServiceImpl quizService;
    private UserServiceImpl userService;
    private QuizResultServiceImpl quizResultService;
    private QuizController quizController;

    @BeforeEach
    void setUp() {
        quizService = mock(QuizServiceImpl.class);
        userService = mock(UserServiceImpl.class);
        quizResultService = mock(QuizResultServiceImpl.class);
        quizController = new QuizController(quizService, userService, quizResultService);
    }

    @Test
    void testGetQuizResult_Success() {
        // Mock data
        Quizzes quizzes = new Quizzes();
        when(quizService.getQuizById(1L)).thenReturn(quizzes);

        Users users = new Users();
        when(userService.getUserById(1L)).thenReturn(users);

        QuizResultResponse quizResultResponse = new QuizResultResponse();
        when(quizResultService.getQuizResult(quizzes, users)).thenReturn(quizResultResponse);

        // Test
        ResponseEntity<QuizResultResponse> response = quizController.getQuizResult(1L, 1L);
        assert response.getStatusCode().is2xxSuccessful();
    }

    @Test
    void testGetQuizResult_QuizNotFound() {
        when(quizService.getQuizById(1L)).thenReturn(null);

        ResponseEntity<QuizResultResponse> response = quizController.getQuizResult(1L, 1L);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void testGetQuizResult_UserNotFound() {
        Quizzes quizzes = new Quizzes();
        when(quizService.getQuizById(1L)).thenReturn(quizzes);
        when(userService.getUserById(1L)).thenReturn(null);

        ResponseEntity<QuizResultResponse> response = quizController.getQuizResult(1L, 1L);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void testGetQuizResult_QuizResultNotFound() {
        Quizzes quizzes = new Quizzes();
        Users users = new Users();
        when(quizService.getQuizById(1L)).thenReturn(quizzes);
        when(userService.getUserById(1L)).thenReturn(users);
        when(quizResultService.getQuizResult(quizzes, users)).thenReturn(null);

        ResponseEntity<QuizResultResponse> response = quizController.getQuizResult(1L, 1L);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    void testGetQuizResult_Exception() {
        when(quizService.getQuizById(1L)).thenThrow(new RuntimeException("Some error"));

        ResponseEntity<QuizResultResponse> response = quizController.getQuizResult(1L, 1L);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }


    @Test
    void testGetQuizResult_AllNull() {
        when(quizService.getQuizById(1L)).thenReturn(null);
        when(userService.getUserById(1L)).thenReturn(null);
        when(quizResultService.getQuizResult(null, null)).thenReturn(null);

        ResponseEntity<QuizResultResponse> response = quizController.getQuizResult(1L, 1L);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void testGetQuizResult_QuizNotNullUserNull() {
        Quizzes quizzes = new Quizzes();
        when(quizService.getQuizById(1L)).thenReturn(quizzes);
        when(userService.getUserById(1L)).thenReturn(null);

        ResponseEntity<QuizResultResponse> response = quizController.getQuizResult(1L, 1L);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void testGetQuizResult_UserNotNullQuizNull() {
        Users users = new Users();
        when(quizService.getQuizById(1L)).thenReturn(null);
        when(userService.getUserById(1L)).thenReturn(users);

        ResponseEntity<QuizResultResponse> response = quizController.getQuizResult(1L, 1L);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void testGetQuizResult_ExceptionInQuizResultService() {
        Quizzes quizzes = new Quizzes();
        Users users = new Users();
        when(quizService.getQuizById(1L)).thenReturn(quizzes);
        when(userService.getUserById(1L)).thenReturn(users);
        when(quizResultService.getQuizResult(quizzes, users)).thenThrow(new RuntimeException("Some error"));

        ResponseEntity<QuizResultResponse> response = quizController.getQuizResult(1L, 1L);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    void testGetQuizResult_QuizIdAndUserIdZero() {
        ResponseEntity<QuizResultResponse> response = quizController.getQuizResult(0L, 0L);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }
}

