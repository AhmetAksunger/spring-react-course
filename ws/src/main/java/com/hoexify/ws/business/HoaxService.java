package com.hoexify.ws.business;

import com.hoexify.ws.dto.CreateHoaxRequest;
import com.hoexify.ws.dto.HoaxResponse;

public interface HoaxService {

	public HoaxResponse create(CreateHoaxRequest createHoaxRequest);
	
}
