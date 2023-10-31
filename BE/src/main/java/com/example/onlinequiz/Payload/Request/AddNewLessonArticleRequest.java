package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddNewLessonArticleRequest {
    private String lessonName;
    private Integer lessonOrder;
    private String article;
}
