package com.gatech.team41.repository;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;

public class Report6 {
    public static List<Map<String, Object>> getDataForReport(JdbcTemplate jdbcTemplate, String subTask , String year, String month ) {
        String sql =  ""
        		+ "select   a.category_name, ANY_VALUE(a.state_name)state_name, max( max_quantity_sold ) as max_quantity_sold  \r\n" +
        		"from \r\n" + 
        		"	(select c.category_name, st.state_name, sum(sa.quantity) as max_quantity_sold\r\n" + 
        		"	from Store st, Sales sa, CategoryProductXref x, Category c \r\n" + 
        		"	where st.store_number = sa.store_number\r\n" + 
        		"	and sa.pid = x.pid\r\n" + 
        		"	and x.category_id = c.category_id\r\n" + 
        		"	and month(sa.date_of_sales ) = " + month + " \r\n" + 		//input value2  - 12
        		"	and year(sa.date_of_sales ) = " + year + " \r\n" +		//input value1  - 2005
        		"group by c.category_name,st.state_name  ) a\r\n" + 
        		"group by a.category_name\r\n" +
				"order by a.category_name\r\n";
        
        System.out.println("I am in report6 [year:"+ year + ", month:" + month +"]");
        return jdbcTemplate.queryForList(sql);
    }
}
