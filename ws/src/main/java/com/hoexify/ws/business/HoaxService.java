package com.hoexify.ws.business;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hoexify.ws.dto.CreateHoaxRequest;
import com.hoexify.ws.dto.GetHoaxesResponse;
import com.hoexify.ws.dto.HoaxResponse;

public interface HoaxService {

	public HoaxResponse create(CreateHoaxRequest createHoaxRequest);

	public Page<GetHoaxesResponse> getHoaxes(Pageable page);
	
}
