package com.example.onlinequiz.Services;

import com.example.onlinequiz.Model.Sliders;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface SliderService {
    List<Sliders> getSliders();

    Sliders findSlider(int id);

    void save(Sliders slider);

    void delete(long id);

    String storeImage(MultipartFile file, int id);
}
