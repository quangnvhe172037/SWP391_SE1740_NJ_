package com.example.onlinequiz.Payload.Response;

import lombok.Data;

@Data
public class TransactionResponse {
    private int price;
    private String data, message;
}
