package com.gatech.team41.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AggregatorRepository {
    public AggregatorRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getManufacturerProductReportItems(String subTask) {
        return Report1.getManufacturerProductReportItems(jdbcTemplate, subTask);
    }
    public List<Map<String, Object>> getManufacturerProductReportDetailItems(String subTask, String manufacturerName) {
        return Report1Detail.getManufacturerProductReportDetailItems(jdbcTemplate, subTask, manufacturerName);
    }
    public List<Map<String, Object>> getCategoryItems(String subTask) {
        return Report2.getCategoryItems(jdbcTemplate, subTask);

    }
    public List<Map<String, Object>> getDataForReport3(String subTask) {
        return Report3.getDataForReport(jdbcTemplate, subTask);
    }
    public List<Map<String, Object>> getDataForReport4(String subTask) {
        return Report4.getDataForReport(jdbcTemplate, subTask);
    }
    public List<Map<String, Object>> getDataForReport5(String subTask) {
        return Report5.getDataForReport(jdbcTemplate, subTask);
    }
    public List<Map<String, Object>> getDataForReport6(String subTask, String year, String month ) {
        return Report6.getDataForReport(jdbcTemplate, subTask, year, month);
    }
    public List<Map<String, Object>> getDataForReport7(String subTask) {
        return Report7.getDataForReport(jdbcTemplate, subTask);
    }
    public List<Map<String, Object>> getDataForReport8(String subTask) {
        return Report8.getDataForReport(jdbcTemplate, subTask);
    }
    public List<Map<String, Object>> getGrandShowcaseStoreCategoryComparisonItems(String subTask) {
        return Report9.getGrandShowcaseStoreCategoryComparisonItems(jdbcTemplate, subTask);
    }
    public List<Map<String, Object>> getDataForStatistics(String subTask, String uid) {
        return Statistics.getDataForReport(jdbcTemplate, subTask, uid);
    }
    public List<Map<String, Object>> getDataForCityState(String subTask, String cityName, String stateName) {
        return CityStateInfo.getDataForReport(jdbcTemplate, subTask, cityName, stateName);
    }
    public List<Map<String, Object>> editCityState(String subTask, String cityName, String stateName, String population) {
        return CityStateInfo.editDataForReport(jdbcTemplate, subTask, cityName, stateName, population);
    }
}
