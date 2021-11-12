package com.gatech.team41.service;

import com.gatech.team41.repository.AggregatorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AggregatorService {
    public AggregatorService(AggregatorRepository aggregatorRepository) {
        this.aggregatorRepository = aggregatorRepository;
    }

    private final AggregatorRepository aggregatorRepository;


    public List<Map<String, Object>> getManufacturerProductReport(String subTask) {
        return aggregatorRepository.getManufacturerProductReportItems(subTask);
    }
    public List<Map<String, Object>> getManufacturerProductReportDetail(String subTask, String manufacturerName) {
        return aggregatorRepository.getManufacturerProductReportDetailItems(subTask, manufacturerName);
    }
    public List<Map<String, Object>> getCategoryReport(String subTask) {
        return aggregatorRepository.getCategoryItems(subTask);

    }
    public List<Map<String, Object>> getDataForReport3(String subTask) {
        return aggregatorRepository.getDataForReport3(subTask);
    }
    public List<Map<String, Object>> getDataForReport4(String subTask) {
        return aggregatorRepository.getDataForReport4(subTask);
    }
    public List<Map<String, Object>> getDataForReport5(String subTask) {
        return aggregatorRepository.getDataForReport5(subTask);
    }
    public List<Map<String, Object>> getDataForReport6(String subTask, String year, String month ) {
        return aggregatorRepository.getDataForReport6(subTask, year, month );
    }
    public List<Map<String, Object>> getDataForReport7(String subTask) {
        return aggregatorRepository.getDataForReport7(subTask);
    }
    public List<Map<String, Object>> getDataForReport8(String subTask) {
        return aggregatorRepository.getDataForReport8(subTask);
    }
    public List<Map<String, Object>> getGrandShowcaseStoreCategoryComparisonReport(String subTask) {
        return aggregatorRepository.getGrandShowcaseStoreCategoryComparisonItems(subTask);
    }
    public List<Map<String, Object>> getDataForStatistics(String subTask, String uid) {
        return aggregatorRepository.getDataForStatistics(subTask, uid);
    }
    public List<Map<String, Object>> getDataForCityState(String subTask, String city, String state) {
        return aggregatorRepository.getDataForCityState(subTask, city, state);
    }
    public List<Map<String, Object>> editCityState(String subTask, String city, String state, String population) {
        return aggregatorRepository.editCityState(subTask, city, state, population);
    }
}
