package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class CourseCheckoutResponse {
    private Long subjectId;
    private String subjectName;
    private String subjectImage;
    private Long preId;
    private Long price;
}
