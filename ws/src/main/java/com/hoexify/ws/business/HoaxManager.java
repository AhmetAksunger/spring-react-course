package com.hoexify.ws.business;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hoexify.ws.dto.CreateHoaxRequest;
import com.hoexify.ws.dto.GetHoaxesResponse;
import com.hoexify.ws.dto.GetUsersResponse;
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
		hoax.setTimeStamp(new Date());
		hoax = hoaxRepository.save(hoax);
		HoaxResponse response = mapperService.forResponse().map(hoax, HoaxResponse.class);
		return response;
	}

	@Override
	public Page<GetHoaxesResponse> getHoaxes(Pageable page) {

		Page<Hoax> hoaxes = hoaxRepository.findAllByOrderByTimeStampDesc(page);
		
	    return hoaxes.map(hoaxe -> mapperService.forResponse().map(hoaxe, GetHoaxesResponse.class));
	}

}
