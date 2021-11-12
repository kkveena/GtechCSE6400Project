package com.gatech.team41.repository;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;


public class Report1Detail {
    private static final String PRODUCT_DETAIL_SQL_SUBTASK0 =
            "SELECT m.manufacturer_name, COUNT(p.pID) as total_products, AVG(p.retail_price) as average_retail_price, " +
                    "MAX(p.retail_price) as maximum_non_discounted_retail_price, MIN(p.retail_price) as minimum_non_discounted_retail_price "+
                    "FROM Manufacturer as m JOIN Product as p ON " +
                    "m.manufacturer_id = p.manufacturer_id " +
                    "and trim(m.manufacturer_name) = '%s' " +
                    "GROUP BY m.manufacturer_name"
            ;

    private static final String PRODUCT_DETAIL_SQL_SUBTASK1 =
            "SELECT   p.pID  as product_id, p.product_name as product_name, group_concat(c.category_name) as categories, p.retail_price as retail_price " +
                    "FROM Product AS p JOIN `CategoryProductXref` AS pt ON p.pID = pt.pID " +
                    "JOIN Category as c on c.category_id = pt.category_id " +
                    "JOIN Manufacturer as m ON m.manufacturer_id = p.manufacturer_id and trim(m.manufacturer_name) = '%s' " +
                    "GROUP BY p.pID " +
                    "ORDER BY p.retail_price DESC "
            ;


    public static List<Map<String, Object>> getManufacturerProductReportDetailItems(JdbcTemplate jdbcTemplate, String subTask, String manufacturerName) {
        String sql = Report1Detail.PRODUCT_DETAIL_SQL_SUBTASK0 ;
        if (subTask.equals("0")) {
            sql = String.format(Report1Detail.PRODUCT_DETAIL_SQL_SUBTASK0, manufacturerName);
        } else if (subTask.equals("1")) {
            sql = String.format(Report1Detail.PRODUCT_DETAIL_SQL_SUBTASK1, manufacturerName);
        }

        return jdbcTemplate.queryForList(sql);
    }
}
