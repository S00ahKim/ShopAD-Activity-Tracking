package com.naver.hackday.service;

import com.naver.hackday.domain.StatClick;
import com.naver.hackday.model.Click;
import com.naver.hackday.model.DefaultRes;
import com.naver.hackday.repository.StatClickRepository;
import com.naver.hackday.utils.ResponseMessage;
import com.naver.hackday.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
public class StatClickService {
    private final StatClickRepository statClickRepository;

    public StatClickService(final StatClickRepository statClickRepository) {
        this.statClickRepository = statClickRepository;
    }

    /**
     * 로그 조회
     * @return DefaultRes
     */
    public DefaultRes findAllStatClick() {
        try {
            List<StatClick> statClickList = statClickRepository.findAll();
            List<Click> clickList = new ArrayList<>();
            List<String> categoryName =
                    Arrays.asList(new String[]{ "HOT", "아우터", "상의", "하의",
                            "원피스", "신발", "액세서리", "가방", "기타"});
            for(int i = 0; i < categoryName.size(); i++){
                Click c = new Click();
                c.setX(categoryName.get(i));
                clickList.add(c);
            }
            for(int j = 0; j < statClickList.size(); j++){
                for(int k = 0; k < clickList.size(); k++){
                    if(statClickList.get(j).getCategoryName()
                            .equals(clickList.get(k).getX())){
                        Click c = new Click();
                        c.setX(clickList.get(k).getX());
                        c.setY(clickList.get(k).getY()+ 1);
                        clickList.set(k,c);
                    }
                }
            }

            return DefaultRes.res(StatusCode.OK, ResponseMessage.CREATED_USER, clickList);
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.FAIL_CREATE_USER);
        }
    }
}
