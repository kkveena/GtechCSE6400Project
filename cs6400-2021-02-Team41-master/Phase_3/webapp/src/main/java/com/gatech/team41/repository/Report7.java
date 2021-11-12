package com.gatech.team41.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class Report7 {
    private static final Logger logger = LoggerFactory.getLogger(Report7.class);
    private static final String REVENUE_FOR_EACH_CITY_SQL = "SELECT c.city_name AS cityName, " +
            "EXTRACT(YEAR FROM S.date_of_sales) AS yos, " +
            "SUM(S.total_sales) AS totalSales " +
            "FROM Sales S " +
            "LEFT OUTER JOIN Store on Store.store_number = S.store_number " +
            "LEFT OUTER JOIN City C on C.city_name = Store.city_name and C.state_name = Store.state_name " +
            "GROUP BY yos, C.city_name, c.population " +
            "ORDER BY yos, c.population";
    private static final String REVENUE_FOR_EACH_POPULATION_CATEGORY_SQL = "SELECT c.city_name AS cityName, " +
            "EXTRACT(YEAR FROM S.date_of_sales) AS yos, " +
            "SUM(S.total_sales) AS totalSales " +
            "FROM Sales S " +
            "LEFT OUTER JOIN Store on Store.store_number = S.store_number " +
            "LEFT OUTER JOIN City C on C.city_name = Store.city_name and C.state_name = Store.state_name " +
            "WHERE <category_input> " +
            "GROUP BY yos, C.city_name, c.population " +
            "ORDER BY yos, c.population";
    private static final String SMALL_POPULATION_CATEGORY_SQL_FRAGMENT = "C.population < 3700000";
    private static final String MEDIUM_POPULATION_CATEGORY_SQL_FRAGMENT = "C.population >= 3700000 AND C.population < 6700000";
    private static final String LARGE_POPULATION_CATEGORY_SQL_FRAGMENT = "C.population >= 6700000 AND C.population < 9000000";
    private static final String EXTRA_LARGE_POPULATION_CATEGORY_SQL_FRAGMENT = "C.population >= 9000000";

    public static List<Map<String, Object>> getDataForReport(JdbcTemplate jdbcTemplate, String subTask) {
        String sql = REVENUE_FOR_EACH_CITY_SQL;
        if (subTask != null) {
            if (subTask != null && subTask.equals("s")) {
                sql = Report7.REVENUE_FOR_EACH_POPULATION_CATEGORY_SQL.replace("<category_input>", Report7.SMALL_POPULATION_CATEGORY_SQL_FRAGMENT);
            } else if (subTask != null && subTask.equals("m")) {
                sql = Report7.REVENUE_FOR_EACH_POPULATION_CATEGORY_SQL.replace("<category_input>", Report7.MEDIUM_POPULATION_CATEGORY_SQL_FRAGMENT);
            } else if (subTask != null && subTask.equals("l")) {
                sql = Report7.REVENUE_FOR_EACH_POPULATION_CATEGORY_SQL.replace("<category_input>", Report7.LARGE_POPULATION_CATEGORY_SQL_FRAGMENT);
            } else if (subTask != null && subTask.equals("x")) {
                sql = Report7.REVENUE_FOR_EACH_POPULATION_CATEGORY_SQL.replace("<category_input>", Report7.EXTRA_LARGE_POPULATION_CATEGORY_SQL_FRAGMENT);
            }
        }
        logger.info(String.format("SQL:%s", sql));
        return jdbcTemplate.queryForList(sql);
    }
}
