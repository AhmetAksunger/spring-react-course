package com.hoexify.ws.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hoexify.ws.business.HoaxService;
import com.hoexify.ws.dto.CreateHoaxRequest;
import com.hoexify.ws.dto.GetHoaxesResponse;
import com.hoexify.ws.dto.HoaxResponse;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.shared.CurrentUser;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class HoaxController {

	@Autowired
	private HoaxService hoaxService;
	
	
	@PostMapping("/hoaxes")
	public HoaxResponse createHoax(@Valid @RequestBody CreateHoaxRequest createHoaxRequest, @CurrentUser User user) {
		return hoaxService.create(createHoaxRequest, user);
	}
	
	@GetMapping("/hoaxes")
	public Page<GetHoaxesResponse> getHoaxes(Pageable page){
	
		return hoaxService.getHoaxes(page);
	}
	
	@GetMapping("/users/{username}/hoaxes")
	public Page<GetHoaxesResponse> getUserHoaxes(Pageable page, @PathVariable String username){
		return hoaxService.getUserHoaxes(page,username);
	}
	
	@GetMapping("/hoaxes/{id}")
	public Page<GetHoaxesResponse> getOldHoaxes(Pageable page,@PathVariable long id, @RequestParam(required = false, defaultValue = "before") String direction){
		
		return hoaxService.getOldHoaxes(page,id,direction);
	}
	
	@GetMapping("/hoaxes/count/{id}")
	public ResponseEntity<?> getNewHoaxesCount(@PathVariable long id){
		
		return ResponseEntity.ok(hoaxService.getNewHoaxesCount(id));
	}
	
	@GetMapping("/users/{username}/hoaxes/{id}")
	public Page<GetHoaxesResponse> getUserOldHoaxes(Pageable page,@PathVariable long id, @PathVariable String username ,@RequestParam(required = true) String direction){
		
		return hoaxService.getUserOldHoaxes(page,id,username,direction);
	}
	
	@DeleteMapping("/hoaxes/{id}")
	void deleteHoax(@PathVariable long id, @CurrentUser User loggedInUser) {
		hoaxService.delete(id, loggedInUser);
	}
}
