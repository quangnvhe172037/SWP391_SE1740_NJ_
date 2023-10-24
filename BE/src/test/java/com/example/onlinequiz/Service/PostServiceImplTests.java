package com.example.onlinequiz.Service;

import com.example.onlinequiz.Services.Impl.PostServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PostServiceImplTests {

    @InjectMocks
    private PostServiceImpl yourService; // Chỉnh sửa YourService thành tên lớp dịch vụ của bạn

    @Mock
    private Files files; // Thay thế Files bằng lớp Files thực tế của bạn

    @Test
    public void testStoreImage() throws IOException {
        // Tạo đối tượng MultipartFile giả lập
        MockMultipartFile mockMultipartFile = new MockMultipartFile(
                "file",
                "test.jpg",
                "image/jpeg",
                "test data".getBytes()
        );

        // Thiết lập giả lập cho phương thức Files.copy
        when(Files.copy(mockMultipartFile.getInputStream(), Paths.get("testDir/posts", "image post 1.jpg"), StandardCopyOption.REPLACE_EXISTING))
                .thenReturn(1L);

        // Gọi phương thức cần kiểm tra
        String result = yourService.storeImage(mockMultipartFile, 1L);

        // Kiểm tra kết quả trả về
        assertEquals("img/posts/image post 1.jpg", result);
    }
}

