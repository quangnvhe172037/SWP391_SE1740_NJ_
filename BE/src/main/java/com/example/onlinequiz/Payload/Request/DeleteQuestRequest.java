package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class DeleteQuestRequest {
    private Long quesId, subjectId;
}
