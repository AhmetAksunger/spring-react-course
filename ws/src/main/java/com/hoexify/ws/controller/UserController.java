package com.hoexify.ws.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hoexify.ws.entity.User;

@RestController
@RequestMapping("/api/1.0")
public class UserController {

	
	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	@PostMapping("/users")
	public void createUser(@RequestBody User user) {
		log.info(user.toString());
	}
	
}
