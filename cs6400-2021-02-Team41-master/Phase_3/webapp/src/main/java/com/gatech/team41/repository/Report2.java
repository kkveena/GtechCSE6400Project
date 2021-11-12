package com.gatech.team41.repository;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class Report2 {

    private static final String CATEGORY_SQL =
            "SELECT trim(c.category_name) AS category_name, COUNT(p.pID) AS total_products , " +
                    "AVG(p.retail_price) AS avg_retail_price, MAX(p.retail_price) AS max_retail_price, " +
                    "MIN(p.retail_price) AS min_retail_price " +
                    "FROM Category AS c LEFT JOIN CategoryProductXref AS ptc ON c.category_id = ptc.category_id " +
                    "LEFT JOIN Product AS p ON ptc.pID = p.pID " +
                    "GROUP BY c.category_name " +
                    "ORDER BY c.category_name "

            ;
    public static List<Map<String, Object>> getCategoryItems(JdbcTemplate jdbcTemplate, String subTask) {
        String sql = Report2.CATEGORY_SQL;

        if ( subTask != null && subTask.equals("0")) {
            sql = Report2.CATEGORY_SQL;
        }


        return jdbcTemplate.queryForList(sql);
    }
}
