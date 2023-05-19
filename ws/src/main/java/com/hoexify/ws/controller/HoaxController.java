package com.hoexify.ws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoexify.ws.business.HoaxService;
import com.hoexify.ws.dto.CreateHoaxRequest;
import com.hoexify.ws.dto.GetHoaxesResponse;
import com.hoexify.ws.dto.HoaxResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0/hoaxes")
public class HoaxController {

	@Autowired
	private HoaxService hoaxService;
	
	@PostMapping()
	public HoaxResponse createHoax(@Valid @RequestBody CreateHoaxRequest createHoaxRequest) {
		return hoaxService.create(createHoaxRequest);
	}
	
	@GetMapping()
	public Page<GetHoaxesResponse> getHoaxes(Pageable page){
	
		return hoaxService.getHoaxes(page);
	}
}
