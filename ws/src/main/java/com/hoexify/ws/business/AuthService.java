package com.hoexify.ws.business;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hoexify.ws.dto.AuthResponse;
import com.hoexify.ws.dto.CredentialsRequest;
import com.hoexify.ws.dto.UserLoginResponse;
import com.hoexify.ws.entity.Token;
import com.hoexify.ws.entity.User;
import com.hoexify.ws.error.AuthenticationException;
import com.hoexify.ws.mapper.ModelMapperService;
import com.hoexify.ws.repository.TokenRepository;
import com.hoexify.ws.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private ModelMapperService mapperService;
	
	@Autowired
	private TokenRepository tokenRepository;
	
	public AuthResponse authenticate(CredentialsRequest credentials) {
		
		User user = userRepository.findByUsername(credentials.getUsername());	
		if(user == null) {
			throw new AuthenticationException();
		}
		
		boolean matches = passwordEncoder.matches(credentials.getPassword(), user.getPassword());
		if(matches) {
						
			String token = generateRandomToken();
			Token tokenEntity = new Token();
			tokenEntity.setToken(token);
			tokenEntity.setUser(user);
			tokenRepository.save(tokenEntity);
			
			AuthResponse authResponse = new AuthResponse();
			authResponse.setUser(mapperService.forResponse().map(user, UserLoginResponse.class));
			authResponse.setToken(token);
			return authResponse;
		}else {
			throw new AuthenticationException();
		}
		
	}

	@Transactional
	public UserDetails getUserDetails(String token) {
		
		Optional<Token> optionalToken = tokenRepository.findById(token);
		
		if(!optionalToken.isPresent()) {
			return null;
		}
		return optionalToken.get().getUser();
	}
	
	public String generateRandomToken() {
		return UUID.randomUUID().toString().replaceAll("-", "");
	}

	public void clearToken(String token) {
		tokenRepository.deleteById(token);
	}

}
