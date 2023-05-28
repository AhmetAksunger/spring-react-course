package com.hoexify.ws.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.hoexify.ws.business.AuthService;
import com.hoexify.ws.dto.AuthResponse;
import com.hoexify.ws.dto.CredentialsRequest;

@RestController
public class AuthController {
		
	@Autowired
	private AuthService authService;
	
	
	@PostMapping("/api/1.0/auth")
	public AuthResponse authentication(@RequestBody CredentialsRequest credentials) {
				
		return authService.authenticate(credentials);

	}
}
