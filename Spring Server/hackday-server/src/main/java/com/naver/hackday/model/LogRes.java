package com.naver.hackday.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LogRes {
    private String token;
    private int logIdx;
}
