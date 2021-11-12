package com.gatech.team41.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class Login {
    private static final Logger logger = LoggerFactory.getLogger(Login.class);
    public static final String Login_Row = "SELECT uId AS uId, " +
            "corpUID AS corpUID, " +
            "marketingUID AS marketingUID, " +
            "storeMUID AS storeMUID " +
            "FROM User " +
            "LEFT OUTER JOIN CorporateUser CU on User.uID = CU.corpUID " +
            "LEFT OUTER JOIN MarketingUser MU on User.uID = MU.marketingUID " +
            "LEFT OUTER JOIN StoreManager SM on User.uID = SM.storeMUID " +
            "WHERE uId='%s' AND password='%s'";

    public static List<Map<String, Object>> getLogin(JdbcTemplate jdbcTemplate, String uId, String pwd) {
        String sql = String.format(Login.Login_Row, uId, pwd) ;
        logger.info(String.format("SQL:%s", sql));
        return jdbcTemplate.queryForList(sql);
    }
}
