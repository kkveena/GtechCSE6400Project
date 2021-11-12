package com.gatech.team41.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class LoginRepository {
    public LoginRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final JdbcTemplate jdbcTemplate;
    public List<Map<String, Object>> getDataForLogin(String uid, String pwd) {
        return Login.getLogin(jdbcTemplate, uid, pwd);
    }
}
