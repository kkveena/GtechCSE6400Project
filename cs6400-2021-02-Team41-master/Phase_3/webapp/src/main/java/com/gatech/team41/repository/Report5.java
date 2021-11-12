package com.gatech.team41.repository;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

public class Report5 {
	private static final String SQL =  
			" select YEAR(s.date_of_sales) as yr,\r\n" + 
			" sum(s.quantity) as yearly_total_quantity,\r\n" + 
			" (sum(s.quantity)/365) as average_yearly_quantity,\r\n" + 
			" sum( case \r\n" + 
			"	when c.category_name like \"%Outdoor%Furniture%\" \r\n" + 
			"		and MONTH(s.date_of_sales) = 2 \r\n" + 
			"		and DAY(s.date_of_sales) = 2 \r\n" + 
			"		then s.quantity\r\n" + 
			"        else 0 \r\n" + 
			"	end )  as groundhog_day_quantity \r\n" + 
			" from Sales s, Category c, CategoryProductXref x\r\n" + 
			" where s.pid = x.pid\r\n" + 
			" and x.category_id = c.category_id\r\n" + 
			" and c.category_name like \"%Outdoor%Furniture%\"    # There was no outdoor furniture in the same...so changed to fix. TODO\r\n" + 
			" group by YEAR(s.date_of_sales)\r\n" ;


    
	
    public static List<Map<String, Object>> getDataForReport(JdbcTemplate jdbcTemplate, String subTask) {
    	System.out.println("I am in the com.gatech.team41.repository.Report5");
        String sql = SQL;
        return jdbcTemplate.queryForList(sql);
    }
}
