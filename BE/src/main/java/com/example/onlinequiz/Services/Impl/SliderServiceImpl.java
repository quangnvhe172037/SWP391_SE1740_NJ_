package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.Sliders;
import com.example.onlinequiz.Repo.SliderRepository;
import com.example.onlinequiz.Services.SliderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SliderServiceImpl implements SliderService {
    @Autowired
    private final SliderRepository sliderRepository;

    @Value("${file.upload-dir}") // Đường dẫn đến thư mục lưu trữ tệp ảnh (được cấu hình trong application.properties)
    private String uploadDir;

    @Override
    public List<Sliders> getSliders() {

        return sliderRepository.findAll();
    }

    @Override
    public Sliders findSlider(int id) {
        return sliderRepository.findBySliderID(id);
    }

    @Override
    public void save(Sliders slider) {
        sliderRepository.save(slider);
    }

    @Override
    public void delete(long id) {
        sliderRepository.deleteBySliderID(id);
    }

    // Lưu ảnh vào project
    @Override
    public String storeImage( MultipartFile file, int id) {
        String imageUrl = "";
        try {
            // Tạo đường dẫn đến thư mục lưu trữ tệp ảnh
            String fileName = "image sliders " +String.valueOf(id) + FilenameUtils.getExtension(file.getOriginalFilename());
            Path targetPath = Paths.get(uploadDir + "/sliders", fileName);

            // Lưu tệp ảnh vào thư mục lưu trữ
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            // Trả về đường dẫn tới tệp ảnh vừa tải lên
            imageUrl = uploadDir + "/" + file.getOriginalFilename();

            return "img/sliders/" + fileName;
        } catch (IOException e) {
            e.printStackTrace();

        }
        return "Error when save image";
    }




}
