package com.example.onlinequiz.Payload.Response;

import lombok.Data;

@Data
public class TransactionResponse {
    private String status, message, data;
}
