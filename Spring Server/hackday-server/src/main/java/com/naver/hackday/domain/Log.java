package com.naver.hackday.domain;

import com.naver.hackday.model.ActionType;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "log")
public class Log {
    private int logIdx;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idx;

    private int logSeqIdx;
    private int userIdx;
    private int renderDataIdx;
    private int numOfAppend;
    private int numOfAppendTotal;
    private Date timestamp;
    private int duration;

    private ActionType actionType; // INITIAL, APPEND, HEADER_CLICK, ITEM_CLICK
    private String value;

    private String categoryName;
    private String token;
}
