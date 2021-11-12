package com.gatech.team41.repository;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Map;
public class Report4 {
    public static final String Store_Revenue_Year_Store = "SELECT st.store_number, st.street_address, st.city_name, st.state_name,\n"+
            "EXTRACT(YEAR FROM gd.calender_date) AS year,\n"+
            "SUM(case when dpr.discount_price IS NULL THEN sa.quantity*p.retail_price ELSE sa.quantity*dpr.discount_price END) AS total_revenue\n"+
            "FROM `Store` AS st JOIN `Sales` AS sa ON st.store_number = sa.store_number\n"+
            "JOIN `discountpriceproductxref` dpp ON sa.pID = dpp.pID\n"+
            "JOIN Product p ON sa.pID = p.pID\n"+
            "JOIN `SalesDate` sd ON sa.date_of_sales = sd.calender_date\n"+
            "JOIN `GenericDate` gd ON sd.calender_date = gd.calender_date\n"+
            "JOIN `DiscountPrice` dpr ON dpp.discountPriceID = dpr.discountPriceID\n"+
            "# WHERE st.state_name= '$StateSelected'\n"+
            "GROUP BY st.store_number, year\n"+
            "ORDER BY year ASC, total_revenue DESC;";

    public static List<Map<String, Object>> getDataForReport(JdbcTemplate jdbcTemplate, String stubTask) {
        String sql = Report4.Store_Revenue_Year_Store;
        if(stubTask.equals("1")){
            sql = Store_Revenue_Year_Store;
        }
        return jdbcTemplate.queryForList(sql);
    }
}
