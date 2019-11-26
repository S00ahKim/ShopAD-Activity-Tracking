package com.naver.hackday.domain;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "log_item_view")
public class LogItemView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int logItemViewIdx;

    private String productIdx;
    private String productName;

    private String channelIdx;
    private String channelName;

    private String categoryIdx;

    private String imageUrl;
    private String url;

    private int logIdx;

}
