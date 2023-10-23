package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
public class SubjectDetailResponse {
//    Thông tin khóa học
    private Long subjectId;
    private String subjectName;
    private String description;
    private String img;
    private String createDate;
    // Thông tin về giá cả
    private Long preId;
    private Long price;

    // Thông tin thanh toán
    private Long billId;
    private int status;
    private String purchaseDate;

    public SubjectDetailResponse(Long subjectId, String subjectName, String description, String img, String createDate, Long preId, Long price) {
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.description = description;
        this.img = img;
        this.createDate = createDate;
        this.preId = preId;
        this.price = price;
    }
}
