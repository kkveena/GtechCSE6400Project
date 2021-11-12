package com.gatech.team41.repository;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Map;
public class Report3 {

    public static final String Actual_Predicted_Couches_Sofas = "SELECT p.pID, p.product_name, p.retail_price,\n"+
            "SUM(sa.quantity) AS total_items,\n"+
            "SUM(case when sa.date_of_sales IS NOT NULL THEN sa.quantity else 0 end) AS discount_items,\n"+
            "SUM(case when dpr.discount_price IS NULL THEN sa.quantity*p.retail_price ELSE\n"+
            "sa.quantity*dpr.discount_price END) AS total_revenue,\n"+
            "SUM(case when sa.date_of_sales IS NOT NULL THEN sa.quantity*.75*p.retail_price ELSE\n"+
            "sa.quantity*p.retail_price END) AS predicted_revenue,\n"+
            "SUM(case when dpr.discount_price IS NULL THEN sa.quantity*p.retail_price ELSE\n"+
            "sa.quantity*dpr.discount_price END) -SUM(case when sa.date_of_sales IS NOT NULL THEN\n"+
            "sa.quantity*.75*p.retail_price ELSE sa.quantity*p.retail_price END) AS diff_revenue\n"+
            "FROM `Product` p JOIN`DiscountPriceProductxref` dp ON p.pID = dp.pID JOIN\n"+
            "`CategoryProductXref` ptc ON p.pID = ptc.pID\n"+
            "JOIN `Category` c ON ptc.category_id = c.category_id\n"+
            "JOIN `DiscountPriceProductxref` dpp ON p.pid = dpp.pid\n"+
            "JOIN `DiscountPrice` dpr ON dpp.discountPriceID = dpr.discountPriceID\n"+
            "JOIN `Sales` sa ON ptc.pID = sa.pID\n"+
            "JOIN `SalesDate` sd ON sa.date_of_sales = sd.calender_date\n"+
            "JOIN `GenericDate` gd ON sd.calender_date = gd.calender_date\n"+
            "WHERE c.category_name = 'Couches and Sofas'\n"+
            "GROUP BY 1, 2, 3\n"+
            "HAVING ABS(diff_revenue) > 5000\n"+
            "ORDER BY diff_revenue DESC;";

    public static List<Map<String, Object>> getDataForReport(JdbcTemplate jdbcTemplate, String subTask) {
        String sql = Report3.Actual_Predicted_Couches_Sofas;
        if(subTask.equals("1")){
            sql = Actual_Predicted_Couches_Sofas;
        }
        return jdbcTemplate.queryForList(sql);
    }
}
