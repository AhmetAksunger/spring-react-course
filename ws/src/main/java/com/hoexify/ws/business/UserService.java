package com.hoexify.ws.business;

import java.util.List;

import com.hoexify.ws.dto.GetUsersResponse;
import com.hoexify.ws.entity.User;

public interface UserService {

	void save (User user);
	
	List<GetUsersResponse> getUsers();
}
