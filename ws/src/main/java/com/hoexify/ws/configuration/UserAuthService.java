package com.hoexify.ws.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hoexify.ws.repository.UserRepository;

@Service
public class UserAuthService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		var user = userRepository.findByUsername(username);
		
		if(user == null) {
			throw new UsernameNotFoundException("user not found");
		}
		return new MyUserDetails(user);
	}

}
