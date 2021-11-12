package com.gatech.team41.repository;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class Statistics {

    private static final String ManufacturerCount =
        "SELECT COUNT(manufacturer_id) as COUNT\n" +
                "FROM manufacturer;";

    private static final String ProductCount =
            "SELECT COUNT(pID) as COUNT\n" +
                    "FROM product;";

    private static final String SpecialSavingsDate =
            "SELECT COUNT(*) as COUNT\n" +
                    "FROM salesdate\n" +
                    "WHERE special_savings_date IS NOT NULL;";

    private static final String getViewableStores(String uid) {
        return String.format("SELECT *\n" +
                "FROM storeuserxref NATURAL JOIN store\n" +
                "WHERE uID=\"%s\";", uid);
    }

    public static List<Map<String, Object>> getDataForReport(JdbcTemplate jdbcTemplate, String subTask, String uid) {
        String sql = ManufacturerCount;
        if(subTask.equals("manufacturer")){
            sql = ManufacturerCount;
        }
        if(subTask.equals("product")){
            sql = ProductCount;
        }
        if(subTask.equals("special")){
            sql = SpecialSavingsDate;
        }
        if(subTask.equals("viewableStores")){
            sql = getViewableStores(uid);
        }
        return jdbcTemplate.queryForList(sql);
    }
}
