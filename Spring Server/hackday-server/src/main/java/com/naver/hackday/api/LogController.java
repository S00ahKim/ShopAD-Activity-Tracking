package com.naver.hackday.api;

import com.naver.hackday.domain.Log;
import com.naver.hackday.domain.LogItemClick;
import com.naver.hackday.domain.LogItemView;
import com.naver.hackday.model.Activity;
import com.naver.hackday.model.ActivityLog;
import com.naver.hackday.service.LogService;
import lombok.extern.slf4j.Slf4j;
import org.joda.time.Duration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import static com.naver.hackday.model.DefaultRes.FAIL_DEFAULT_RES;

@Slf4j
@RestController
public class LogController {
    private final LogService logService;

    public LogController(final LogService logService) {
        this.logService = logService;
    }

    /**
     * 로그 저장
     * 
     * @return ResponseEntity
     */
    @PostMapping("/log")
    public ResponseEntity saveLog(@RequestBody final Log log) {
        try {
            return new ResponseEntity<>(logService.saveLog(log),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 로그 아이템 뷰 저장
     *
     * @return ResponseEntity
     */
    @PostMapping(value = "/log/itemView")
    public ResponseEntity saveLogItemView(@RequestBody List<LogItemView> logItemViewList) {
        try {
            return new ResponseEntity<>(logService.saveLogItemView(logItemViewList),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 로그 아이템 클릭 저장
     *
     * @return ResponseEntity
     */
    @PostMapping(value = "/log/itemClick")
    public ResponseEntity saveLogItemView(@RequestBody LogItemClick logItemClick) {
        try {
            return new ResponseEntity<>(logService.saveLogItemClick(logItemClick),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 로그 전체 조회
     *
     * @return ResponseEntity
     */
    @GetMapping("/log")
    public ResponseEntity getAllLogs() {
        try {
            return new ResponseEntity<>(logService.findAllLogs(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(FAIL_DEFAULT_RES, HttpStatus.NOT_FOUND);
        }
    }

    @ResponseBody
    @GetMapping("activity")
    public List<Activity> getActivity(@RequestParam(required = false) String userId) {
        List<Activity> activities = new ArrayList<>();
        List<Log> logs = (List<Log>) logService.findAllLogs().getData();

        List<ActivityLog> activityLogs = new ArrayList<>();
        for (int i = 0; i < logs.size(); i++) {
            Log log = logs.get(i);
            ActivityLog activityLog = new ActivityLog();
            activityLog.setId(String.valueOf(log.getLogIdx()));
            activityLog.setAction(log.getActionType().name());
            activityLog.setValue(log.getValue());
            activityLog.setTimestamp(log.getTimestamp());
            activityLog.setToken(log.getToken());

            // 로그 activity 별로 분기
            if(i != 0) {
                Log beforeLog = logs.get(i-1);

                /*
                    이전과 다른 activity 로그가 들어오면, 지금까지 쌓인 activity 로그를 리스트화시키고 새로운 리스트로 쌓는다.
                 */
                if(isAnotherActivity(log, beforeLog)) {
                    Activity activity = new Activity();
                    activity.setUserId(String.valueOf(beforeLog.getUserIdx()));
                    activity.setActivityLogs(activityLogs);
                    activities.add(activity);

                    activityLogs = new ArrayList<>();
                }
            }

            activityLogs.add(activityLog);

            if(i == (logs.size()-1)) {
                Activity activity = new Activity();
                activity.setUserId(String.valueOf(log.getUserIdx()));
                activity.setActivityLogs(activityLogs);
                activities.add(activity);
            }
        }


        return activities;
    }


    private boolean isAnotherActivity(Log log, Log beforeLog) {
        // 1. 시간 검사
        Duration duration = new Duration(log.getTimestamp().getTime(), beforeLog.getTimestamp().getTime());
        if(duration.getStandardMinutes() >= 5) {
            return true;
        }

        // 2. token 검사
        if(!log.getToken().equals(beforeLog.getToken())) {
            return true;
        }

        return false;
    }
}
