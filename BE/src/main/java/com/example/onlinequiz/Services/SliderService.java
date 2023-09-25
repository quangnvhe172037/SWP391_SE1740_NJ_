package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Sliders;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface SliderService {
    List<Sliders> getSliders();

    Sliders findSlider(Long id);

    void delete(Long id);

    String storeImage(MultipartFile file, Long id);

    Sliders save(Sliders s);


}
