package com.naver.hackday.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "stat_click")
public class StatClick {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int statClickIdx;

    private String categoryName;
    private int logIdx;
}
