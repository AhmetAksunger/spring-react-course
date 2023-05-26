package com.hoexify.ws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoexify.ws.dto.UserLoginResponse;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.mapper.ModelMapperService;
import com.hoexify.ws.shared.CurrentUser;

@RestController
public class AuthController {
		
	@Autowired
	private ModelMapperService mapperService;
	
	@PostMapping("/api/1.0/auth")
	public ResponseEntity<?> authentication(@CurrentUser User user) {
		
		var response = mapperService.forResponse().map(user, UserLoginResponse.class);
		return ResponseEntity.ok(response);

	}
}
