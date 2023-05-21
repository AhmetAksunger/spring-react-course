package com.hoexify.ws.business;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.hoexify.ws.dto.CreateHoaxRequest;
import com.hoexify.ws.dto.GetHoaxesResponse;
import com.hoexify.ws.dto.HoaxResponse;
import com.hoexify.ws.entity.Hoax;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.error.NotFoundException;
import com.hoexify.ws.mapper.ModelMapperService;
import com.hoexify.ws.repository.HoaxRepository;
import com.hoexify.ws.repository.UserRepository;

@Service
public class HoaxManager implements HoaxService{

	@Autowired
	private HoaxRepository hoaxRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapperService mapperService;
	
	
	@Override
	public HoaxResponse create(CreateHoaxRequest createHoaxRequest, User user) {
		Hoax hoax = new Hoax();
		hoax.setContent(createHoaxRequest.getContent());
		hoax.setTimeStamp(new Date());
		hoax.setUser(user);
		hoax = hoaxRepository.save(hoax);
		HoaxResponse response = mapperService.forResponse().map(hoax, HoaxResponse.class);
		return response;
	}

	@Override
	public Page<GetHoaxesResponse> getHoaxes(Pageable page) {

		Page<Hoax> hoaxes = hoaxRepository.findAllByOrderByTimeStampDesc(page);
		
	    return hoaxes.map(hoaxe -> mapperService.forResponse().map(hoaxe, GetHoaxesResponse.class));
	}

	@Override
	public Page<GetHoaxesResponse> getUserHoaxes(Pageable page, String username) {
		
		if(!userRepository.existsByUsername(username)) {
			throw new NotFoundException();
		}
		
		Page<Hoax> hoaxes = hoaxRepository.findAllByUserUsernameOrderByTimeStampDesc(username, page);
		return hoaxes.map(hoaxe -> mapperService.forResponse().map(hoaxe, GetHoaxesResponse.class));
	}

	@Override
	public Page<GetHoaxesResponse> getOldHoaxes(Pageable page,long id, String direction) {

		if(direction.equals("before")) {
			Page<Hoax> hoaxes = hoaxRepository.findByIdLessThanEqualOrderByTimeStampDesc(id, page);
			return hoaxes.map(hoaxe -> mapperService.forResponse().map(hoaxe, GetHoaxesResponse.class));	
		}
		
		throw new NotFoundException();
	}

	@Override
	public Page<GetHoaxesResponse> getUserOldHoaxes(Pageable page, long id, String username, String direction) {
		
		if(direction.equals("before")) {
			Page<Hoax> hoaxes = hoaxRepository.findByIdLessThanEqualAndUserUsernameOrderByTimeStampDesc(id,username,page);
			return hoaxes.map(hoaxe -> mapperService.forResponse().map(hoaxe, GetHoaxesResponse.class));	
		}
		
		throw new NotFoundException();
	}
	
	@Override
	public Map<String, Long> getNewHoaxesCount(long id){
		long newHoaxesCount = hoaxRepository.countByIdGreaterThan(id);
		
		Map<String, Long> response = new HashMap<>();
		response.put("count", newHoaxesCount);
		return response;
	}

}
