package com.hoexify.ws.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoexify.ws.dto.GetUsersResponse;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.error.NotFoundException;
import com.hoexify.ws.mapper.ModelMapperService;
import com.hoexify.ws.repository.UserRepository;

@Service
public class UserManager implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ModelMapperService mapperService;
	
	@Override
	public void save(User user) {
		
		String encryptedPassword = passwordEncoder.encode(user.getPassword());
		user.setPassword(encryptedPassword);
		userRepository.save(user);
		
	}

	@Override
	public Page<GetUsersResponse> getUsers(Pageable page, User user) {
	    Page<User> users;
		
		if (user == null) {
	    	users = userRepository.findAll(page);	
	    }
	    else {
	    	users = userRepository.findByUsernameNot(user.getUsername(),page);
	    }
	    return users.map(userInList -> mapperService.forResponse().map(userInList, GetUsersResponse.class));
	}

	@Override
	public GetUsersResponse getByUsername(String username) {
		User user = userRepository.findByUsername(username);
		if(user == null) {
			throw new NotFoundException();
		}
		
		GetUsersResponse response = mapperService.forResponse().map(user, GetUsersResponse.class);
		return response;
	}

	
	
}
