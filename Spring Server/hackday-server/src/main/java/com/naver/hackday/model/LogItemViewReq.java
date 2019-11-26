package com.naver.hackday.model;

import com.naver.hackday.domain.LogItemView;
import lombok.Data;

import java.util.List;

@Data
public class LogItemViewReq {
    private List<LogItemView> logItemViewList;
}
