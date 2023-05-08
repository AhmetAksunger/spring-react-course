package com.hoexify.ws.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetUsersResponse {

	private String username;
	
	private String displayName;
	
	private String image;
	
}
