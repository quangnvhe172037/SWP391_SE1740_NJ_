package com.example.onlinequiz.Payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MessageResponse {
    private String message;

    public MessageResponse(String message){
        this.message = message;
    }
}
