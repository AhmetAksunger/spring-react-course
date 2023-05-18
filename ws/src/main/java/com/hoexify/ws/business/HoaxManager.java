package com.hoexify.ws.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hoexify.ws.dto.CreateHoaxRequest;
import com.hoexify.ws.dto.HoaxResponse;
import com.hoexify.ws.entity.Hoax;
import com.hoexify.ws.mapper.ModelMapperService;
import com.hoexify.ws.repository.HoaxRepository;

@Service
public class HoaxManager implements HoaxService{

	@Autowired
	private HoaxRepository hoaxRepository;
	
	@Autowired
	private ModelMapperService mapperService;
	
	@Override
	public HoaxResponse create(CreateHoaxRequest createHoaxRequest) {
		Hoax hoax = new Hoax();
		hoax.setContent(createHoaxRequest.getContent());
		hoax.setTimeStamp(System.currentTimeMillis());
		hoax = hoaxRepository.save(hoax);
		HoaxResponse response = mapperService.forResponse().map(hoax, HoaxResponse.class);
		return response;
	}

}
