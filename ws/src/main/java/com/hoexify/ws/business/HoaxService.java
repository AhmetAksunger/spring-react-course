package com.hoexify.ws.business;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hoexify.ws.dto.CreateHoaxRequest;
import com.hoexify.ws.dto.GetHoaxesResponse;
import com.hoexify.ws.dto.HoaxResponse;
import com.hoexify.ws.entity.User;

public interface HoaxService {

	public HoaxResponse create(CreateHoaxRequest createHoaxRequest, User user);

	public Page<GetHoaxesResponse> getHoaxes(Pageable page);

	public Page<GetHoaxesResponse> getUserHoaxes(Pageable page, String username);
	
}
