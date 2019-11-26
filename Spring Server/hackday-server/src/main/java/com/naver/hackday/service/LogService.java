package com.naver.hackday.service;

import com.naver.hackday.domain.Log;
import com.naver.hackday.domain.LogItemClick;
import com.naver.hackday.domain.LogItemView;
import com.naver.hackday.domain.StatClick;
import com.naver.hackday.model.ActionType;
import com.naver.hackday.model.DefaultRes;
import com.naver.hackday.model.LogRes;
import com.naver.hackday.repository.LogItemClickRepository;
import com.naver.hackday.repository.LogItemViewRepository;
import com.naver.hackday.repository.LogRepository;
import com.naver.hackday.repository.StatClickRepository;
import com.naver.hackday.utils.ResponseMessage;
import com.naver.hackday.utils.StatusCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Slf4j
@Service
public class LogService {
    private final LogRepository logRepository;
    private final LogItemViewRepository logItemViewRepository;
    private final LogItemClickRepository logItemClickRepository;
    private final StatClickRepository statClickRepository;
    private final JwtService jwtService;

    public LogService(final LogRepository logRepository,
                      final LogItemViewRepository logItemViewRepository,
                      final LogItemClickRepository logItemClickRepository,
                      final StatClickRepository statClickRepository,
                      final JwtService jwtService) {
        this.logRepository = logRepository;
        this.logItemViewRepository = logItemViewRepository;
        this.logItemClickRepository = logItemClickRepository;
        this.statClickRepository = statClickRepository;
        this.jwtService = jwtService;
    }

    /**
     * 로그 저장
     *
     * @param log 로그 데이터
     * @return DefaultRes
     */
    public DefaultRes saveLog(final Log log) {
        try {
            JwtService.TokenRes tokenRes = new JwtService.TokenRes();

            if(logRepository.findAllByOrderByLogIdxDesc().isPresent()){
                int prevLogIdx = logRepository.findAllByOrderByLogIdxDesc().get().get(0).getLogIdx();
                Date prevTimestamp = logRepository.findAllByOrderByLogIdxDesc().get().get(0).getTimestamp();
                String prevToken = logRepository.findAllByOrderByLogIdxDesc().get().get(0).getToken();


                if(log.getActionType().equals(ActionType.APPEND) && log.getNumOfAppendTotal() == 0) { // 최초 접속 로그일 때
                    log.setLogIdx(++prevLogIdx);
                    log.setDuration(0);
                    tokenRes =
                            new JwtService.TokenRes(jwtService.create(log.getLogIdx()));
                    log.setToken(tokenRes.getToken());
                }
                else{ // 최초 접속 로그가 아닐 때
                    log.setLogIdx(prevLogIdx);
                    log.setToken(prevToken);
                    log.setDuration((int)((log.getTimestamp().getTime() - prevTimestamp.getTime()) / 1000));
                }
            }
            else{
                tokenRes =
                        new JwtService.TokenRes(jwtService.create(log.getLogIdx()));
                log.setToken(tokenRes.getToken());
            }

            int logIdx = logRepository.save(log).getLogIdx();

            return DefaultRes.res(StatusCode.CREATED, ResponseMessage.CREATED_USER, new LogRes(tokenRes.getToken(), logIdx));
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.FAIL_CREATE_USER);
        }
    }

    /**
     * 로그 조회
     * @return DefaultRes
     */
    public DefaultRes findAllLogs() {
        try {
            return DefaultRes.res(StatusCode.OK, ResponseMessage.CREATED_USER,
                    logRepository.findAllByOrderByIdxDesc());
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.FAIL_CREATE_USER);
        }
    }

    /**
     * 로그 아이템 뷰 저장
     *
     * @param logItemViewList 로그 데이터
     * @return DefaultRes
     */
    public DefaultRes saveLogItemView(final List<LogItemView> logItemViewList) {
        try {
            logItemViewRepository.saveAll(logItemViewList);
            return DefaultRes.res(StatusCode.CREATED, ResponseMessage.CREATED_USER);
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.FAIL_CREATE_USER);
        }
    }

    /**
     * 로그 아이템 뷰 저장
     *
     * @param logItemClick 로그 데이터
     * @return DefaultRes
     */
    public DefaultRes saveLogItemClick(final LogItemClick logItemClick) {
        try {
            logItemClickRepository.save(logItemClick);
            return DefaultRes.res(StatusCode.CREATED, ResponseMessage.CREATED_USER);
        } catch (Exception e) {
            System.out.println(e);
            return DefaultRes.res(StatusCode.DB_ERROR, ResponseMessage.FAIL_CREATE_USER);
        }
    }
}