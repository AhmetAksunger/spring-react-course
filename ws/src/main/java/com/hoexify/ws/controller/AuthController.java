package com.hoexify.ws.controller;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.hoexify.ws.entity.User;
import com.hoexify.ws.error.ApiErrorResponse;
import com.hoexify.ws.repository.UserRepository;

@RestController
public class AuthController {

	@Autowired
	private UserRepository userRepository;
	
	private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@PostMapping("/api/1.0/auth")
	public ResponseEntity<?> authentication(@RequestHeader(name = "Authorization", required = false) String authorization) {
		if(authorization == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
		}
		
		String base64encoded = authorization.split("Basic ")[1]; //dXNlcjpwYXNzd29yZA==
		String decoded = new String(Base64.getDecoder().decode(base64encoded)); //user:password
		String[] parts = decoded.split(":");
		String username = parts[0];
		String password = parts[1];
		
		if(!userRepository.existsByUsername(username)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
		}
		
		User user = userRepository.findByUsername(username);
		
		String hashedPassword = user.getPassword();
		if(!passwordEncoder.matches(password, hashedPassword)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
		}
		
		Map<String, String> responseBody = new HashMap<>();
		
		responseBody.put("username", user.getUsername());
		responseBody.put("displayName", user.getDisplayName());
		responseBody.put("image", user.getImage());
		return ResponseEntity.ok(responseBody);

	}
}
