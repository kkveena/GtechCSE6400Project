package com.gatech.team41.repository;

import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CityStateInfo {
    private static final String getCityStatePopulation(String cityName, String stateName) {
        return String.format("SELECT population\n" +
                "FROM city\n" +
                "WHERE city_name=\"%s\" AND state_name=\"%s\";", cityName, stateName);
    }

    private static final String editCityStatePopulation(String cityName, String stateName, String population) {
        return String.format("UPDATE city \n" +
                "SET \n" +
                "    population = \"%s\"\n" +
                "WHERE\n" +
                "    city_name=\"%s\" AND state_name=\"%s\";", population, cityName, stateName);
    }

    public static List<Map<String, Object>> getDataForReport(JdbcTemplate jdbcTemplate, String subTask, String cityName, String stateName) {
        String sql = "";
        if(subTask.equals("getPop")){
            sql = getCityStatePopulation(cityName, stateName);
        }
        return jdbcTemplate.queryForList(sql);
    }
    public static List<Map<String, Object>> editDataForReport(JdbcTemplate jdbcTemplate, String subTask, String cityName, String stateName, String population) {
        HashMap<String, Object> resultMap = new HashMap<>();
        ArrayList<Map<String, Object>> result = new ArrayList<>();
        if (subTask.equals("editPop")) {
            Integer rowsAffected = jdbcTemplate.update(editCityStatePopulation(cityName, stateName, population));
            resultMap.put("rowsAffected", rowsAffected);
            result.add(resultMap);
            return result;
        }
        return result;
    }
}
