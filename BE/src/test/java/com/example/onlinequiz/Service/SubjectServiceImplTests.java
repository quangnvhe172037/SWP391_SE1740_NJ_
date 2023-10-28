package com.example.onlinequiz.Service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

import com.example.onlinequiz.Model.*;
import com.example.onlinequiz.Payload.Response.SubjectDetailResponse;
import com.example.onlinequiz.Repo.SubjectPriceRepository;
import com.example.onlinequiz.Repo.SubjectRepository;
import com.example.onlinequiz.Repo.UserPaymentRepository;
import com.example.onlinequiz.Repo.UserRepository;
import com.example.onlinequiz.Services.Impl.SubjectServiceImp;
import com.example.onlinequiz.Services.SubjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

// import các gói cần thiết khác

public class SubjectServiceImplTests {

//    @Test
//    void testGetSubjectDetail_UserNull() {
//        // Arrange
//        Long userId = 1L;
//        Long subjectId = 1L;
//        UserRepository userRepository = mock(UserRepository.class);
//        when(userRepository.getById(userId)).thenReturn(null);
//        // Act
//        SubjectDetailResponse result = getSubjectDetail(userId, subjectId, userRepository, subjectRepository, subjectPriceRepository, userPaymentRepository);
//        // Assert
//        assertNull(result);
//    }
//
//    @Test
//    void testGetSubjectDetail_SubjectPriceNull() {
//        // Arrange
//        Long userId = 1L;
//        Long subjectId = 1L;
//        UserRepository userRepository = mock(UserRepository.class);
//        User someUser = new User(); // Điền thông tin cụ thể tùy thuộc vào logic trong hàm
//        when(userRepository.getById(userId)).thenReturn(someUser);
//        SubjectRepository subjectRepository = mock(SubjectRepository.class);
//        when(subjectRepository.getSubjectsBySubjectID(subjectId)).thenReturn(new Subject()); // Điền thông tin cụ thể tùy thuộc vào logic trong hàm
//        SubjectPriceRepository subjectPriceRepository = mock(SubjectPriceRepository.class);
//        when(subjectPriceRepository.findBySubjectAndAndStatus(any(), anyBoolean())).thenReturn(null);
//        // Act
//        SubjectDetailResponse result = getSubjectDetail(userId, subjectId, userRepository, subjectRepository, subjectPriceRepository, userPaymentRepository);
//        // Assert
//        assertNull(result);
//    }
//
//    // Tiếp tục viết các phương thức kiểm thử cho các trường hợp còn lại tương tự như trên.
//
//    @Test
//    void testGetSubjectDetail_ValidData() {
//        // Arrange
//        Long userId = 1L;
//        Long subjectId = 1L;
//        UserRepository userRepository = mock(UserRepository.class);
//        // Giả định các giá trị trả về từ các repository
//        // when(userRepository.someMethodCall()).thenReturn(someValue);
//        SubjectRepository subjectRepository = mock(SubjectRepository.class);
//        Subjects someSubject = new Subjects(); // Điền thông tin cụ thể tùy thuộc vào logic trong hàm
//        when(subjectRepository.getSubjectsBySubjectID(subjectId)).thenReturn(someSubject);
//        SubjectPriceRepository subjectPriceRepository = mock(SubjectPriceRepository.class);
//        SubjectPrice someSubjectPrice = new SubjectPrice(); // Điền thông tin cụ thể tùy thuộc vào logic trong hàm
//        when(subjectPriceRepository.findBySubjectAndAndStatus(any(), anyBoolean())).thenReturn(someSubjectPrice);
//        UserPaymentRepository userPaymentRepository = mock(UserPaymentRepository.class);
//        UserPayment someUserPayment = new UserPayment(); // Điền thông tin cụ thể tùy thuộc vào logic trong hàm
//        when(userPaymentRepository.findByUsersAndSubjectAndSubjectPriceAndStatus(any(), any(), any(), anyBoolean())).thenReturn(someUserPayment);
//        // Act
//        SubjectDetailResponse result = getSubjectDetail(userId, subjectId, userRepository, subjectRepository, subjectPriceRepository, userPaymentRepository);
//        // Assert
//        assertNotNull(result);
//        // Các kiểm tra khác tùy thuộc vào logic của hàm và các giá trị trả về mong đợi.
//    }



}
