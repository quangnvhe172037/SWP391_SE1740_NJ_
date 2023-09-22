package com.example.onlinequiz.Controller;

import com.example.onlinequiz.Model.Sliders;
import com.example.onlinequiz.Model.Users;
import com.example.onlinequiz.Services.SliderService;
import jakarta.servlet.annotation.MultipartConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@CrossOrigin(value = "*")
@RequestMapping("/sliders")
@MultipartConfig
public class SliderController {

    @Autowired
    private final SliderService sliderService;

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Sliders>> getAllSlider(){
        List<Sliders> listSliders = sliderService.getSliders();

        return ResponseEntity.ok(listSliders);
    }

//    Lấy dữ liệu của 1 slider
    @GetMapping("/edit/{sliderid}")
    @ResponseBody
    public ResponseEntity<Sliders> getSlider(
            @PathVariable Integer sliderid
    ){
        try {
            Sliders sliderOptional = sliderService.findSlider(sliderid);

            if (sliderOptional != null) {
                Sliders slider = sliderOptional;

                return ResponseEntity.ok(slider);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Thay đổi giá trị của image của slider
    @PutMapping("/edit/image/{sliderId}")
    @ResponseBody
    public ResponseEntity<Sliders> updateSliderImage(
            @PathVariable Integer sliderId,
            @RequestParam(name = "image",required = false) MultipartFile file
    ) {

        try {
            Sliders sliderChange = sliderService.findSlider(sliderId);
            if (sliderChange != null) {
                // Cập nhật dữ liệu của slider từ updatedSliderData
                sliderChange.setImage(sliderService.storeImage(file, sliderId));
                // Lưu slider đã cập nhật vào cơ sở dữ liệu
                sliderService.save(sliderChange);

                return ResponseEntity.ok(sliderChange);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    // Thay đổi dữ liệu của 1 slider
        @PutMapping("/edit/data/{sliderId}")
        @ResponseBody
        public ResponseEntity<Sliders> updateSliderData(
                @PathVariable Integer sliderId,
                @RequestParam(name = "title") String title,
                @RequestParam(name = "note") String note,
                @RequestParam(name = "status") boolean status
        ) {
            System.out.println(title);
            try {
                Sliders sliderChange = sliderService.findSlider(sliderId);

                if (sliderChange != null) {

                    // Cập nhật dữ liệu của slider từ updatedSliderData
                    sliderChange.setStatus(status);
                    sliderChange.setNote(note);
                    sliderChange.setTitle(title);
                    // Lưu slider đã cập nhật vào cơ sở dữ liệu
                    sliderService.save(sliderChange);

                    return ResponseEntity.ok(sliderChange);
                } else {
                    return ResponseEntity.notFound().build();
                }
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        // Thay đổi giá trị status của slider
    @PutMapping("/{sliderid}")
    @ResponseBody
    public ResponseEntity<Sliders> updateSliderStatus(
            @PathVariable Integer sliderid, @RequestBody Map<String, Boolean> statusMap
    ) {
        // Tìm slider theo sliderId trong cơ sở dữ liệu
        // Cập nhật giá trị status của slider bằng updatedSlider.getStatus()
        // Lưu slider đã cập nhật vào cơ sở dữ liệu
        // Trả về ResponseEntity có thể chứa slider đã cập nhật

        try {
            Boolean newStatus = statusMap.get("status");
            Sliders sliderOptional = sliderService.findSlider(sliderid);

            if (sliderOptional != null) {
                Sliders slider = sliderOptional;
                slider.setStatus(newStatus);
                sliderService.save(slider); // Cập nhật trạng thái slider

                return ResponseEntity.ok(slider);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @DeleteMapping ("/delete/{sliderId}")
    @ResponseBody
    public ResponseEntity<String> DeleteSlider(
            @PathVariable Long sliderId
    ){
        System.out.println("delete");

        try {
            System.out.println("test 1");
            sliderService.delete(sliderId);
            System.out.println("test 2");
            return ResponseEntity.ok("Work");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
