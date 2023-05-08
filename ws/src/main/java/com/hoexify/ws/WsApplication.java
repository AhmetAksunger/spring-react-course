package com.hoexify.ws;

import org.modelmapper.ModelMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.hoexify.ws.business.UserService;
import com.hoexify.ws.entity.User;

@SpringBootApplication()
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

	@Bean
	CommandLineRunner createInitialUsers(UserService userService) {
		return new CommandLineRunner() {
			
			@Override
			public void run(String... args) throws Exception {
				
				for(int i = 1; i<=25; i++) {
				
					User user = new User();
					user.setUsername("user" + i);
					user.setDisplayName("display" + i);
					user.setPassword("P4ssword");
					userService.save(user);
					
				}
				
			}
		};
	}
	

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}
	
}
