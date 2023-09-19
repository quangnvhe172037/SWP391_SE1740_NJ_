package com.example.onlinequiz.Services.Impl;

import com.example.onlinequiz.Model.Sliders;
import com.example.onlinequiz.Repo.SliderRepository;
import com.example.onlinequiz.Services.SliderService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SliderServiceImpl implements SliderService {
    @Autowired
    private final SliderRepository sliderRepository;




    @Override
    public List<Sliders> getSliders() {
        return null;
    }


}
