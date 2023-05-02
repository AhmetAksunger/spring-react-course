package com.hoexify.ws.error;

import java.util.Map;

import lombok.Data;

@Data
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
