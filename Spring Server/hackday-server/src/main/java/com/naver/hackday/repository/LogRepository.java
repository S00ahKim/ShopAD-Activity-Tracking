package com.naver.hackday.repository;

import com.naver.hackday.domain.Log;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LogRepository extends JpaRepository<Log, Integer> {
    Optional<List<Log>> findAllByOrderByLogIdxDesc();
    List<Log> findAllByOrderByIdxDesc();
}