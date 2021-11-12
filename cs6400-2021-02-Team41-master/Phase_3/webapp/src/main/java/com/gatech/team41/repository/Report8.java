package com.gatech.team41.repository;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;
import java.util.Map;

public class Report8 {

    private static final String Subtask =
            "SELECT\n" +
            "  SUM(is_showcasestore=True) AS SHOWCASE_STORE,\n" +
            "  SUM(is_showcasestore=False) AS REGULAR_STORE\n" +
            "FROM Store;";

    private static final String SQL =
            "SELECT\n" +
            "  SubQuery.YEAR,\n" +
            "  SubQuery.IS_SHOWCASE_STORE,\n" +
            "  MIN(SubQuery.TOTAL_SALE) as MIN_SALES,\n" +
            "  MAX(SubQuery.TOTAL_SALE) as MAX_SALES,\n" +
            "  AVG(SubQuery.TOTAL_SALE) as AVG_SALES,\n" +
            "  SUM(SubQuery.TOTAL_SALE) as SUM_OF_SALES\n" +
            "FROM\n" +
            "  (SELECT\n" +
            "  LatestTotalSaleOfYear.STORE_NUMBER,\n" +
            "  Store.is_showcasestore as IS_SHOWCASE_STORE,\n" +
            "  LatestTotalSaleOfYear.YEAR,\n" +
            "  LatestTotalSaleOfYear.LATEST_DAY_OF_YEAR,\n" +
            "  LatestTotalSaleOfYear.TOTAL_SALE\n" +
            "FROM\n" +
            "  Store JOIN (\n" +
            "    SELECT\n" +
            "      store_number as STORE_NUMBER,\n" +
            "      EXTRACT(YEAR FROM date_of_sales) as YEAR,\n" +
            "      MAX(date_of_sales) AS LATEST_DAY_OF_YEAR,\n" +
            "      MAX(total_sales) AS TOTAL_SALE\n" +
            "    FROM SALES\n" +
            "    GROUP BY YEAR, STORE_NUMBER\n" +
            "  ) LatestTotalSaleOfYear\n" +
            "  on Store.store_number = LatestTotalSaleOfYear.store_number\n" +
            "  ORDER BY LatestTotalSaleOfYear.YEAR ASC) AS SubQuery\n" +
            "GROUP BY SubQuery.YEAR, SubQuery.IS_SHOWCASE_STORE\n" +
            "ORDER BY SubQuery.YEAR ASC;";

    public static List<Map<String, Object>> getDataForReport(JdbcTemplate jdbcTemplate, String subTask) {
        String sql = SQL;
        if(subTask.equals("1")){
            sql = Subtask;
        }
        return jdbcTemplate.queryForList(sql);
    }
}
