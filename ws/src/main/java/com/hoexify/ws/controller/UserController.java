package com.hoexify.ws.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hoexify.ws.business.UserService;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.error.ApiErrorResponse;
import com.hoexify.ws.shared.GenericResponse;

@RestController
@RequestMapping("/api/1.0")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/users")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> createUser(@RequestBody User user) {
		
		ApiErrorResponse error = new ApiErrorResponse(HttpStatus.BAD_REQUEST.value(), "Validation error", "/api/1.0/users");
		Map<String,String> validationErrors = new HashMap<>();
		
		if(user.getUsername() == null || user.getUsername().isBlank()) {
			validationErrors.put("username", "Username cannot be empty");
		}
		if(user.getDisplayName() == null || user.getDisplayName().isBlank()) {
			validationErrors.put("displayName", "Display name cannot be empty");
		}
		
		if(validationErrors.size() > 0) {
			error.setValidationErrors(validationErrors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
		}
		userService.save(user);
		
		return new ResponseEntity<>(new GenericResponse("user created"),HttpStatus.CREATED);
	}
	
}
