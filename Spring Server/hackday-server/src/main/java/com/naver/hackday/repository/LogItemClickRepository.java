package com.naver.hackday.repository;

import com.naver.hackday.domain.LogItemClick;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogItemClickRepository extends JpaRepository<LogItemClick, Integer> {
}
