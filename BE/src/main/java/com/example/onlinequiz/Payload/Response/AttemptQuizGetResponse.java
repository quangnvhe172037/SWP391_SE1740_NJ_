package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
public class AttemptQuizGetResponse {
    private Long resultId;
    private String quizName;
    private List<QuizSentenceUserResponse> listSentence;
    private Integer passRate;
    private Integer durationTime;
    private Date dateEnd;

}
