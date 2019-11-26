package com.naver.hackday.api;

import com.naver.hackday.service.LogService;
import com.naver.hackday.service.StatClickService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.naver.hackday.model.DefaultRes.FAIL_DEFAULT_RES;

@Slf4j
@RestController
@RequestMapping("stat/click")
public class StatClickController {
    private final StatClickService statClickService;

    public StatClickController(final StatClickService statClickService) {
        this.statClickService = statClickService;
    }

    /**
     * 클릭 통계 전체 조회
     *
     * @return ResponseEntity
     */
    @GetMapping("")
    public ResponseEntity getAllStatClick() {
        try {
            return new ResponseEntity<>(statClickService.findAllStatClick(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.NOT_FOUND);
        }
    }
}