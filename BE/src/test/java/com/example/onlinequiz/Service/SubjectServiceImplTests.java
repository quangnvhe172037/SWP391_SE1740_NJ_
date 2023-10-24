package com.example.onlinequiz.Service;

import static org.junit.jupiter.api.Assertions.*;
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

    @InjectMocks
    private SubjectServiceImp subjectService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private SubjectRepository subjectRepository;

    @Mock
    private SubjectPriceRepository subjectPriceRepository;

    @Mock
    private UserPaymentRepository userPaymentRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetSubjectDetail_ValidData_ReturnsResponse() throws ParseException {
        // Arrange
        Long userId = 3L;
        Long subjectId = 4L;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        Users mockUser = new Users(); // tạo đối tượng user giả lập
        mockUser.setId(3L);
        mockUser.setPassword("$2a$10$quS2hnY5Fglq29NNtu86OeUelo0hTyRElm3FyGaZZR9b/TCqT0Eg.");
        mockUser.setFirstName("An");
        mockUser.setLastName("Bui Gia");
        mockUser.setEmail("quangnv1911@gmail.com");
        mockUser.setMobile("334745645");
        mockUser.setGender(true);
        mockUser.setCreateDate(formatter.parse("2003-11-19"));
        mockUser.setEnabled(true);
        mockUser.setRole("CUSTOMER");

        when(userRepository.getById(userId)).thenReturn(mockUser);

        Subjects mockSubject = new Subjects(); // tạo đối tượng subject giả lập
        mockSubject.setSubjectID(4L);
        mockSubject.setSubjectName("HTML, JavaScript, & Bootstrap ");
        mockSubject.setSubjectCategory(new SubjectCategories(1, "Development"));
        mockSubject.setStatus(true);
        mockSubject.setImage("img/subject/subject 1.jpg");
        mockSubject.setDescription("A Comprehensive Guide for Beginners interested in learning HTML, JavaScript, & Bootstrap. Build Interactive Web Pages.");
        mockSubject.setCreateDate(formatter.parse("2023-09-28"));
        when(subjectRepository.getSubjectsBySubjectID(subjectId)).thenReturn(mockSubject);

        SubjectPrice mockSubjectPrice = new SubjectPrice(); // tạo đối tượng subject price giả lập
        mockSubjectPrice.setPreID(3L);
        mockSubjectPrice.setPrice(1000000L);
        mockSubjectPrice.setSubject(mockSubject);
        mockSubjectPrice.setStatus(true);
        when(subjectPriceRepository.findBySubjectAndAndStatus(mockSubject, true)).thenReturn(mockSubjectPrice);

        UserPayment mockUserPayment = new UserPayment(); // tạo đối tượng user payment giả lập
        mockUserPayment.setBillID(3L);
        mockUserPayment.setUsers(mockUser);
        mockUserPayment.setSubjectPrice(mockSubjectPrice);
        mockUserPayment.setStatus(true);
        mockUserPayment.setNotify("Success register");
        mockUserPayment.setPurchaseDate(formatter.parse("2023-09-28"));
        when(userPaymentRepository.findByUsersAndSubjectAndSubjectPriceAndStatus(mockUser, mockSubject, mockSubjectPrice, true)).thenReturn(mockUserPayment);

        // Act
        SubjectDetailResponse result = subjectService.getSubjectDetail(userId, subjectId);
        // Assert
        assertEquals(result.getBillId(), mockUserPayment.getBillID());
        // thêm các kiểm tra khác tùy thuộc vào logic của phương thức

    }

    @Test
    public void testGetSubjectDetail_NullUser_ReturnsNull() {
        // Arrange
        Long userId = 3L;
        Long subjectId = 4L;
        when(userRepository.getById(userId)).thenReturn(null);

        // Act
        SubjectDetailResponse result = subjectService.getSubjectDetail(userId, subjectId);

        // Assert
        assertNull(result);
    }

    @Test
    public void testGetSubjectDetail_UserPaymentNull_ReturnsResponseWithoutUserPayment() throws ParseException {
        // Arrange
        Long userId = 3L;
        Long subjectId = 4L;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        Users mockUser = new Users(); // Tạo đối tượng user giả lập
        // Cấu hình giả lập user
        mockUser.setCreateDate(formatter.parse("2003-11-19"));
        when(userRepository.getById(userId)).thenReturn(mockUser);

        Subjects mockSubject = new Subjects(); // Tạo đối tượng subject giả lập
        mockSubject.setCreateDate(formatter.parse("2023-09-28"));

        when(subjectRepository.getSubjectsBySubjectID(subjectId)).thenReturn(mockSubject);

        SubjectPrice mockSubjectPrice = new SubjectPrice(); // Tạo đối tượng subject price giả lập
        // Cấu hình giả lập subject price

        when(subjectPriceRepository.findBySubjectAndAndStatus(mockSubject, true)).thenReturn(mockSubjectPrice);

        when(userPaymentRepository.findByUsersAndSubjectAndSubjectPriceAndStatus(mockUser, mockSubject, mockSubjectPrice, true)).thenReturn(null);

        // Act
        SubjectDetailResponse result = subjectService.getSubjectDetail(userId, subjectId);
        // Assert
        assertNotNull(result);
    }

    @Test
    public void testGetSubjectDetail_NullSubjectPrice_ReturnsNull() {
        // Arrange
        Long userId = 3L;
        Long subjectId = 4L;

        // Giả lập user
        Users mockUser = new Users();
        mockUser.setId(3L);

        // Giả lập subject
        Subjects mockSubject = new Subjects();
        mockSubject.setSubjectID(4L);

        when(userRepository.getById(userId)).thenReturn(mockUser);
        when(subjectRepository.getSubjectsBySubjectID(subjectId)).thenReturn(mockSubject);
        when(subjectPriceRepository.findBySubjectAndAndStatus(mockSubject, true)).thenReturn(null);

        // Act
        SubjectDetailResponse result = subjectService.getSubjectDetail(userId, subjectId);

        // Assert
        assertNull(result);
    }


}
