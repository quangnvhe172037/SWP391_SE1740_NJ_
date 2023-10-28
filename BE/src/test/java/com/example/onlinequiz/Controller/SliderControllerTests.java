package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Controller.PublicController.SliderController;
import com.example.onlinequiz.Model.Sliders;
import com.example.onlinequiz.Services.Impl.SliderServiceImpl;
import com.example.onlinequiz.Services.SliderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

public class SliderControllerTests {



    @Mock
    private SliderServiceImpl sliderService;

    @InjectMocks
    private SliderController sliderController;
    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        // Các cài đặt khác cho phần chuẩn bị kiểm thử
    }
    @Test
    public void testUpdateSliderData_ValidSliderId_ReturnsUpdatedSlider() {
        Long sliderId = 1L;
        String title = "New Title";
        String note = "New Note";
        boolean status = true;

        Sliders mockSlider = new Sliders();
        mockSlider.setSliderID(sliderId);
        mockSlider.setTitle(title);
        mockSlider.setNote(note);
        mockSlider.setStatus(status);
        System.out.println(mockSlider.getSliderID());
        ResponseEntity<Sliders> result =ResponseEntity.ok(mockSlider);
        when(sliderService.findSlider(anyLong())).thenReturn(mockSlider);
        when(sliderService.save(mockSlider)).thenReturn(mockSlider);

        ResponseEntity<Sliders> response = sliderController.updateSliderData(sliderId, title, note, status);
//        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(result, response);
    }

    @Test
    public void testUpdateSliderData_InvalidSliderId_ReturnsNotFound() {
        Long sliderId = 1L;
        String title = "New Title";
        String note = "New Note";
        boolean status = true;

        when(sliderService.findSlider(anyLong())).thenReturn(null);

        ResponseEntity<Sliders> response = sliderController.updateSliderData(sliderId, title, note, status);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testUpdateSliderData_ValidSliderId_ReturnsInternalServerError() {
        Long sliderId = 1L;
        String title = "New Title";
        String note = "New Note";
        boolean status = true;

        Sliders mockSlider = new Sliders();
        mockSlider.setSliderID(sliderId);
        mockSlider.setTitle(title);
        mockSlider.setNote(note);
        mockSlider.setStatus(status);

        when(sliderService.findSlider(anyLong())).thenReturn(mockSlider);
        when(sliderService.save(mockSlider)).thenThrow(new RuntimeException());

        ResponseEntity<Sliders> response = sliderController.updateSliderData(sliderId, title, note, status);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }

    @Test
    public void testUpdateSliderData_EmptyTitle_ReturnsUpdatedSlider() {
        Long sliderId = 1L;
        String title = "";
        String note = "New Note";
        boolean status = true;

        Sliders mockSlider = new Sliders();
        mockSlider.setSliderID(sliderId);
        mockSlider.setTitle(title);
        mockSlider.setNote(note);
        mockSlider.setStatus(status);

        ResponseEntity<Sliders> result = ResponseEntity.ok(mockSlider);
        when(sliderService.findSlider(anyLong())).thenReturn(mockSlider);
        when(sliderService.save(mockSlider)).thenReturn(mockSlider);

        ResponseEntity<Sliders> response = sliderController.updateSliderData(sliderId, title, note, status);
        assertEquals(result, response);
    }

    @Test
    public void testUpdateSliderData_EmptyNote_ReturnsUpdatedSlider() {
        Long sliderId = 1L;
        String title = "New Title";
        String note = "";
        boolean status = true;

        Sliders mockSlider = new Sliders();
        mockSlider.setSliderID(sliderId);
        mockSlider.setTitle(title);
        mockSlider.setNote(note);
        mockSlider.setStatus(status);

        ResponseEntity<Sliders> result = ResponseEntity.ok(mockSlider);
        when(sliderService.findSlider(anyLong())).thenReturn(mockSlider);
        when(sliderService.save(mockSlider)).thenReturn(mockSlider);

        ResponseEntity<Sliders> response = sliderController.updateSliderData(sliderId, title, note, status);
        assertEquals(result, response);
    }

    @Test
    public void testUpdateSliderData_InvalidStatus_ReturnsUpdatedSliderWithDefaultStatus() {
        Long sliderId = 1L;
        String title = "New Title";
        String note = "New Note";
        boolean status = false;

        Sliders mockSlider = new Sliders();
        mockSlider.setSliderID(sliderId);
        mockSlider.setTitle(title);
        mockSlider.setNote(note);
        mockSlider.setStatus(status);

        ResponseEntity<Sliders> result = ResponseEntity.ok(mockSlider);
        when(sliderService.findSlider(anyLong())).thenReturn(mockSlider);
        when(sliderService.save(mockSlider)).thenReturn(mockSlider);

        ResponseEntity<Sliders> response = sliderController.updateSliderData(sliderId, title, note, status);
        assertEquals(result, response);
    }

    @Test
    public void testUpdateSliderData_NullSlider_ReturnsNotFound() {
        Long sliderId = 1L;
        String title = "New Title";
        String note = "New Note";
        boolean status = true;

        when(sliderService.findSlider(anyLong())).thenReturn(null);

        ResponseEntity<Sliders> response = sliderController.updateSliderData(sliderId, title, note, status);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testUpdateSliderData_EmptyTitleAndNote_ReturnsUpdatedSliderWithDefaultValues() {
        Long sliderId = 1L;
        String title = "";
        String note = "";
        boolean status = true;

        Sliders mockSlider = new Sliders();
        mockSlider.setSliderID(sliderId);
        mockSlider.setTitle("Default Title");
        mockSlider.setNote("Default Note");
        mockSlider.setStatus(status);

        ResponseEntity<Sliders> result = ResponseEntity.ok(mockSlider);
        when(sliderService.findSlider(anyLong())).thenReturn(mockSlider);
        when(sliderService.save(mockSlider)).thenReturn(mockSlider);

        ResponseEntity<Sliders> response = sliderController.updateSliderData(sliderId, title, note, status);
        assertEquals(result, response);
    }

    @Test
    public void testUpdateSliderData_NullSliderService_ReturnsInternalServerError() {
        Long sliderId = 1L;
        String title = "New Title";
        String note = "New Note";
        boolean status = true;

        when(sliderService.findSlider(anyLong())).thenReturn(new Sliders());
        when(sliderService.save(new Sliders())).thenThrow(new RuntimeException());

        ResponseEntity<Sliders> response = sliderController.updateSliderData(sliderId, title, note, status);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
    }
}




