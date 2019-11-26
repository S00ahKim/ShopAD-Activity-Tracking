package com.naver.hackday.model;

import lombok.Data;

import java.util.Date;

@Data
public class ActivityLog {
    private String id;
    private String action;
    private String value;
    private Date timestamp;
    private String token;
}
