package com.example.onlinequiz.Payload.Response;

import lombok.Data;

@Data
public class PaymentResponse {
    private String status;
    private String message;
    private String URL;
}
