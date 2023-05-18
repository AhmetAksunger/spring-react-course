package com.hoexify.ws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoexify.ws.business.HoaxService;
import com.hoexify.ws.dto.CreateHoaxRequest;
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
}
