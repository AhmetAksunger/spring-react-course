package com.hoexify.ws.error;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiErrorResponse {

	private int status;
	
	private String message;
	
	private String path;
	
	private long timeStamp = System.currentTimeMillis();
	
	private Map<String, String> validationErrors;

	public ApiErrorResponse(int status, String message, String path) {
		this.status = status;
		this.message = message;
		this.path = path;
	}
}
