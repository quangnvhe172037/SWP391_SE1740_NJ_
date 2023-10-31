package com.example.onlinequiz.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor

public class DashboardResponse {
    private Long totalUser;
    private Long newUser;
    private Long totalSubject;
    private List<Long> salesStatistic;
    private List<Long> orderStatistic;

}
