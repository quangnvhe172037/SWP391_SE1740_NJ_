package com.example.onlinequiz.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PostRequest {
    public Long id;
    public String title, briefInfor, image, firstName, lastName, dateCreate;
    public boolean status;
}
