package com.naver.hackday.model;

import lombok.Data;

import java.util.List;

@Data
public class Activity {
    private String userId;
    private List<ActivityLog> activityLogs;
}
