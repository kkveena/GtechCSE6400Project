package com.gatech.team41.controllers;

import com.gatech.team41.service.AggregatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class CommonController {

	public CommonController(AggregatorService aggregatorService) {
		this.aggregatorService = aggregatorService;
	}
	private final AggregatorService aggregatorService;

	@GetMapping(value = "/report1",produces = "application/json")

	public ResponseEntity<List<Map<String, Object>>> getManufacturerProductReport(
			@RequestParam(value = "subTask", required = false) String subTask
	){
		List<Map<String, Object>> items = aggregatorService.getManufacturerProductReport(subTask);
		return ResponseEntity.ok(items);
	}

	@GetMapping(value = "/report1details",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getManufacturerProductReportDetails(
			@RequestParam(value = "subTask", required = false) String subTask,
			@RequestParam(value="manufacturerName", required=false) String manufacturerName
	){
		List<Map<String, Object>> items = aggregatorService.getManufacturerProductReportDetail(subTask, manufacturerName );
		return ResponseEntity.ok(items);
	}


	@GetMapping(value = "/report2",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getCategoryReport(
			@RequestParam(value = "subTask", required = false) String subTask
	) {
		List<Map<String, Object>> items = aggregatorService.getCategoryReport(subTask);
		return ResponseEntity.ok(items);
	}

	@GetMapping(value = "/report3",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getDataForReport3(
			@RequestParam(value = "subTask", required = false) String subTask
	){
		List<Map<String, Object>> items = aggregatorService.getDataForReport3(subTask);
		return ResponseEntity.ok(items);
	}
	@GetMapping(value = "/report4",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getDataForReport4(
			@RequestParam(value = "subTask", required = false) String subTask
	){
		List<Map<String, Object>> items = aggregatorService.getDataForReport4(subTask);
		return ResponseEntity.ok(items);
	}
	@GetMapping(value = "/report5",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getDataForReport5(
			@RequestParam(value = "subTask", required = false) String subTask
	){
		List<Map<String, Object>> items = aggregatorService.getDataForReport5(subTask);
		return ResponseEntity.ok(items);
	}
	@GetMapping(value = "/report6",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getDataForReport6(
			@RequestParam(value = "subTask", required = false) String subTask,
			@RequestParam(value = "year", required = true) String year,
			@RequestParam(value = "month", required = true) String month
	){
		List<Map<String, Object>> items = aggregatorService.getDataForReport6(subTask, year, month);
		return ResponseEntity.ok(items);
	}
	@GetMapping(value = "/report7",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getDataForReport7(
			@RequestParam(value = "subTask", required = false) String subTask
	){
		List<Map<String, Object>> items = aggregatorService.getDataForReport7(subTask);
		return ResponseEntity.ok(items);
	}

	@GetMapping(value = "/report8",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getDataForReport8(
			@RequestParam(value = "subTask", required = false) String subTask
	){
		List<Map<String, Object>> items = aggregatorService.getDataForReport8(subTask);
		return ResponseEntity.ok(items);
	}

	@GetMapping(value = "/report9",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getGrandShowcaseStoreCategoryComparisonReport(
			@RequestParam(value = "subTask", required = false) String subTask
	){
		List<Map<String, Object>> items = aggregatorService.getGrandShowcaseStoreCategoryComparisonReport(subTask);
		return ResponseEntity.ok(items);
	}

	@GetMapping(value = "/loggedInInfo",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getLoggedInInfo(){
		ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		HttpSession session = attr.getRequest().getSession(true);
		List<Map<String, Object>> items = (List<Map<String, Object>>) session.getAttribute("loggedIn");
		return ResponseEntity.ok(items);
	}

	@GetMapping(value = "/statistics",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getDataForStatistics(
			@RequestParam(value = "subTask", required = false) String subTask,
			@RequestParam(value = "uid", required = false) String uid
	){
		List<Map<String, Object>> items = aggregatorService.getDataForStatistics(subTask, uid);
		return ResponseEntity.ok(items);
	}

	@GetMapping(value = "/citystate",produces = "application/json")
	public ResponseEntity<List<Map<String, Object>>> getDataForStatistics(
			@RequestParam(value = "subTask", required = false) String subTask,
			@RequestParam(value = "city", required = false) String city,
			@RequestParam(value = "state", required = false) String state,
			@RequestParam(value = "pop", required = false) String pop
	){

		if(subTask.equals("getPop")){
			return ResponseEntity.ok(aggregatorService.getDataForCityState(subTask, city, state));
		}

		if(subTask.equals("editPop")){
			return ResponseEntity.ok(aggregatorService.editCityState(subTask, city, state, pop));
		}
		return ResponseEntity.ok(new ArrayList<>());
	}
}
