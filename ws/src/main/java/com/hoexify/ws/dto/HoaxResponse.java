package com.hoexify.ws.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HoaxResponse {

	private String content;
	
	private long timeStamp;
	
}
