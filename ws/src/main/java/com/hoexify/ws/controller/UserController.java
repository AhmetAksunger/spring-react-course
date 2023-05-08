package com.hoexify.ws.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.hoexify.ws.business.UserService;
import com.hoexify.ws.dto.GetUsersResponse;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.error.ApiErrorResponse;
import com.hoexify.ws.repository.UserRepository;
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
	public List<GetUsersResponse> getUsers(){
		return userService.getUsers();
	}
}
