package com.gatech.team41.repository;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class Report1 {

    private static final String PRODUCT_SUMMARY_SQL =
            "SELECT trim(m.manufacturer_name) as manufacturer_name, COUNT(p.pID) as total_products, round(AVG(p.retail_price),2) as average_retail_price, " +
                    "MAX(p.retail_price) as maximum_non_discounted_retail_price, MIN(p.retail_price) as minimum_non_discounted_retail_price "+
                    "FROM Manufacturer as m JOIN Product as p ON " +
                    "m.manufacturer_id = p.manufacturer_id " +
                    "GROUP BY m.manufacturer_name " +
                    "ORDER BY AVG(p.retail_price) DESC LIMIT 100"
            ;
    public static List<Map<String, Object>> getManufacturerProductReportItems(JdbcTemplate jdbcTemplate, String subTask) {
        String sql = Report1.PRODUCT_SUMMARY_SQL;
        if ( subTask != null && subTask.equals("0")) {
            sql = Report1.PRODUCT_SUMMARY_SQL;
        }

        return jdbcTemplate.queryForList(sql);
    }
}
