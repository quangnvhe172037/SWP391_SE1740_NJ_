package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubjectTopicResponse {
    private Long topicID;
    private String topicName;
    //private boolean status;

}
