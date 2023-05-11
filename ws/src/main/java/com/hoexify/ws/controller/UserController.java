package com.hoexify.ws.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hoexify.ws.business.UserService;
import com.hoexify.ws.dto.GetUsersResponse;
import com.hoexify.ws.dto.UserUpdateRequest;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.error.ApiErrorResponse;
import com.hoexify.ws.shared.CurrentUser;
import com.hoexify.ws.shared.GenericResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class UserController {

	
	@Autowired
	private UserService userService;

	@PostMapping("/users")
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse createUser(@Valid @RequestBody User user) {
		
		userService.save(user);
		
		return new GenericResponse("user created");
	}
	
	@GetMapping("/users")
	public Page<GetUsersResponse> getUsers(Pageable page, @CurrentUser User user){
		return userService.getUsers(page, user);
	}
	
	@GetMapping("/users/{username}")
	public GetUsersResponse getUser(@PathVariable String username) {
		return userService.getByUsername(username);
	}
	
	@PutMapping("/users/{username}")
	public ResponseEntity<?> update(@RequestBody UserUpdateRequest userUpdateRequest, @PathVariable String username, @CurrentUser User user) {
		if(!user.getUsername().equals(username)) {
			ApiErrorResponse error = new ApiErrorResponse(403, "Forbidden", "/api/1.0/users/" + username);
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
		}
		return ResponseEntity.ok(userService.update(userUpdateRequest, username));
	}
}
