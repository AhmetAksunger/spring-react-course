package com.hoexify.ws.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetHoaxesResponse {

	private int id;
	
	private String content;
	
	private Date timeStamp;
		
	private GetUsersResponse user;

	private FileAttachmentResponse fileAttachment;

}
