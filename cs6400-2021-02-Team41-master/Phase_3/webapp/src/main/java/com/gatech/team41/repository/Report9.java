package com.gatech.team41.repository;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class Report9 {
    public static final String Grand_Showcase_Store_Category_Comparison = "SELECT P.product_name AS productName, " +
            "P.pid AS productID, SUM(Sales.quantity) AS allSales," +
            "SUM(CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN " +
            "0 END ) AS showcaseStoresSales, " +
            "SUM(Sales.quantity - CASE WHEN S.is_showcasestore = 1 THEN " +
            "Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END) AS excessSalesByWillmartStores " +
            "FROM Sales JOIN Product P on P.pID = Sales.pid " +
            "JOIN Store S on S.store_number = Sales.store_number GROUP BY P.pid " +
            "ORDER BY excessSalesByWillmartStores DESC, P.pID ASC";
    public static final String Grand_Showcase_Store_Category_Comparison_SubTask0 = "SELECT P.product_name AS productName, " +
            "P.pid AS productID, SUM(Sales.quantity) AS allSales," +
            "SUM(CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN " +
            "0 END ) AS showcaseStoresSales, " +
            "SUM(Sales.quantity - CASE WHEN S.is_showcasestore = 1 THEN " +
            "Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END) AS excessSalesByWillmartStores " +
            "FROM Sales JOIN Product P on P.pID = Sales.pid " +
            "JOIN Store S on S.store_number = Sales.store_number GROUP BY P.pid " +
            "ORDER BY excessSalesByWillmartStores DESC, P.pID ASC " +
            "LIMIT 5";
    public static final String Grand_Showcase_Store_Category_Comparison_SubTask1 = "SELECT P.product_name AS productName, " +
            "P.pid AS productID, SUM(Sales.quantity) AS allSales," +
            "SUM(CASE WHEN S.is_showcasestore = 1 THEN Sales.quantity WHEN S.is_showcasestore = 0 THEN " +
            "0 END ) AS showcaseStoresSales, " +
            "SUM(Sales.quantity - CASE WHEN S.is_showcasestore = 1 THEN " +
            "Sales.quantity WHEN S.is_showcasestore = 0 THEN 0 END) AS excessSalesByWillmartStores " +
            "FROM Sales JOIN Product P on P.pID = Sales.pid " +
            "JOIN Store S on S.store_number = Sales.store_number GROUP BY P.pid " +
            "ORDER BY excessSalesByWillmartStores DESC, P.pID DESC " +
            "LIMIT 5";


    public static List<Map<String, Object>> getGrandShowcaseStoreCategoryComparisonItems(JdbcTemplate jdbcTemplate, String subTask) {
        String sql = Report9.Grand_Showcase_Store_Category_Comparison;
        if (subTask != null && subTask.equals("0")) {
            sql = Report9.Grand_Showcase_Store_Category_Comparison_SubTask0;
        } else if (subTask != null &&  subTask.equals("1")){
            sql = Report9.Grand_Showcase_Store_Category_Comparison_SubTask1;
        }
        return jdbcTemplate.queryForList(sql);
    }
}
