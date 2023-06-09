package com.hoexify.ws.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateHoaxRequest {

	@Size(min = 1, max = 1000)
	private String content;
	
	private long attachmentId;
}
