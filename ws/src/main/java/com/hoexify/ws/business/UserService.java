package com.hoexify.ws.business;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hoexify.ws.dto.GetUsersResponse;
import com.hoexify.ws.dto.UserUpdateRequest;
import com.hoexify.ws.entity.User;

public interface UserService {

	void save (User user);
	
	Page<GetUsersResponse> getUsers(Pageable page, User user);

	GetUsersResponse getByUsername(String username);
	
	GetUsersResponse update(UserUpdateRequest updateRequest, String username);

	void deleteUser(String username, User loggedInUser);
	
}
